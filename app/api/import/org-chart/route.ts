import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { organizations, b2bTeams, employees, users } from '@/lib/db/schema';
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
      const [employeeName, employeeEmail, teamName, managerEmail] = row.split(',');

      if (!employeeName || !employeeEmail || !teamName || !managerEmail) {
        continue;
      }

      let [organization] = await db.select().from(organizations).limit(1);
      if (!organization) {
        [organization] = await db.insert(organizations).values({ name: 'Default Organization' }).returning();
      }

      let [manager] = await db.select().from(users).where(eq(users.email, managerEmail));
      if (!manager) {
        [manager] = await db.insert(users).values({ email: managerEmail, name: managerEmail, organizationId: organization.id }).returning();
      }

      let [team] = await db.select().from(b2bTeams).where(eq(b2bTeams.name, teamName));
      if (!team) {
        [team] = await db.insert(b2bTeams).values({ name: teamName, organizationId: organization.id, managerId: manager.id }).returning();
      }

      await db.insert(employees).values({
        name: employeeName,
        email: employeeEmail,
        teamId: team.id,
        organizationId: organization.id,
      }).onConflictDoNothing();
    }

    return NextResponse.json({ message: 'Organizational chart is being processed.' }, { status: 202 });
  } catch (error) {
    console.error('Error processing org chart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
