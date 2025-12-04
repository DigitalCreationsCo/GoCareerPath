import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { rawReports } from '@/lib/db/schema';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { employeeId, reportData }: { employeeId: string; reportData: any} = await req.json();

    if (!employeeId || !reportData) {
      return NextResponse.json({ error: 'Missing employeeId or reportData' }, { status: 400 });
    }

    const [newReport] = await db
      .insert(rawReports)
      .values({
        userId: employeeId,
        rawContentJson: reportData,
      })
      .returning();

    // In a real-world scenario, you would enqueue a job for processing here.
    // For the MVP, we'll keep it simple and process synchronously later.

    return NextResponse.json({ reportId: newReport.id }, { status: 201 });
  } catch (error) {
    console.error('Error ingesting report:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
