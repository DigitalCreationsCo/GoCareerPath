import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { eq } from 'drizzle-orm';
import { employees, snapshots } from '@/lib/db/schema';
import { auth } from '@/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  const employeeId = params.id;

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const employeeSnapshots = await db.query.snapshots.findMany({
      where: eq(snapshots.employeeId, employeeId),
      orderBy: (snapshots, { desc }) => [desc(snapshots.createdAt)],
      limit: 2, // Get the latest two snapshots to calculate deltas
    });

    if (employeeSnapshots.length === 0) {
      return NextResponse.json({ error: 'No projections found for this employee' }, { status: 404 });
    }

    const latestSnapshot = employeeSnapshots[0];
    const previousSnapshot = employeeSnapshots[1];

    const calculateDelta = (current: number | null, previous: number | null) => {
      if (current === null || previous === null) {
        return null;
      }
      return current - previous;
    };

    return NextResponse.json({
      employee_id: employeeId,
      promotion_timeline: {
        value: latestSnapshot.promotionTimeline,
        unit: 'months',
        delta_90_days: calculateDelta(latestSnapshot.promotionTimeline, previousSnapshot?.promotionTimeline),
      },
      productivity_uplift: {
        value: latestSnapshot.upliftProjection,
        unit: 'percentage',
        delta_90_days: calculateDelta(Number(latestSnapshot.upliftProjection), Number(previousSnapshot?.upliftProjection)),
      },
      automation_risk: {
        value: latestSnapshot.automationRisk,
        unit: 'percentage',
        delta_90_days: calculateDelta(Number(latestSnapshot.automationRisk), Number(previousSnapshot?.automationRisk)),
      },
    });
  } catch (error) {
    console.error('Error fetching employee projections:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
