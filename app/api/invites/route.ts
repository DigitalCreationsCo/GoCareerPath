import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { inviteTeamMember } from '@/app/(login)/actions';
import { getUserById } from '@/lib/db/queries/user';
import { User } from '@/lib/types';

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { emails } = body;

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return NextResponse.json({ error: 'Invalid input: emails are required' }, { status: 400 });
        }

        const user = await getUserById(session.user.id);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const invitePromises = emails.map(email => {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('role', 'member');
            return inviteTeamMember(
                {
                    email,
                    role: 'member',
                },
                formData
            );
        });

        await Promise.all(invitePromises);

        return NextResponse.json({ message: 'Invitations sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error sending invites:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
    }
}
