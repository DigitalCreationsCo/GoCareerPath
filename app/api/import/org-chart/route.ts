import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { teams, users, teamManagers } from '@/lib/db/schema';
import { auth } from '@/auth';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('org_chart') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const text = await file.text();
    const rows = text.split('\n').slice(1); // Skip header row

    // This is a simplified implementation for the MVP.
    // A real-world implementation would need more robust error handling and validation.
    for (const row of rows) {
      const [userName, userEmail, teamName, managerEmail] = row.split(',');

      if (!userName || !userEmail || !teamName || !managerEmail) {
        continue;
      }

      let [manager] = await db.select().from(users).where(eq(users.email, managerEmail));
      if (!manager) {
        [manager] = await db.insert(users).values({ email: managerEmail, name: managerEmail }).returning();
      }

      let [team] = await db.select().from(teams).where(eq(teams.name, teamName));
      if (!team) {
        [team] = await db.insert(teams).values({ name: teamName }).returning();
      }

      await db.insert(teamManagers).values({
        userId: manager.id,
        teamId: team.id,
      }).onConflictDoNothing();

      await db.insert(users).values({
        name: userName,
        email: userEmail,
        teamId: team.id,
      }).onConflictDoNothing();
    }

    return NextResponse.json({ message: 'Organizational chart is being processed.' }, { status: 202 });
  } catch (error) {
    console.error('Error processing org chart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
