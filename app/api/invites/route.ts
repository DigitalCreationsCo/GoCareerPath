import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sendInviteEmail } from '@/lib/email/send-invite-email';

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { emails, organizationName } = body;

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return NextResponse.json({ error: 'Invalid input: emails are required' }, { status: 400 });
        }
        if (!organizationName) {
            return NextResponse.json({ error: 'Invalid input: organizationName is required' }, { status: 400 });
        }

        const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/chat`; // Placeholder link

        const sendPromises = emails.map(email =>
            sendInviteEmail(email, organizationName, inviteLink)
        );

        await Promise.all(sendPromises);

        return NextResponse.json({ message: 'Invitations sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error sending invites:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
    }
}
