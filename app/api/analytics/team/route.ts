import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  const session = await auth();
  const { searchParams } = new URL(req.url);
  const teamId = searchParams.get('team_id');
  const timePeriod = searchParams.get('time_period') || '90d';

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!teamId) {
    return NextResponse.json({ error: 'Missing team_id' }, { status: 400 });
  }

  try {
    // In a real-world scenario, these queries would be more complex
    // and would likely involve joining with a training_investments table.
    const trainingRoi = {
      investment: 5000,
      uplift_value: 7500,
      roi: 1.5,
    };

    const skillGapTrend = await db.execute(sql`
      SELECT
        date_trunc('day', s.created_at) AS date,
        AVG(s.skill_gap_score) AS average_gap_score
      FROM snapshots s
      JOIN employees e ON s.employee_id = e.id
      WHERE e.team_id = ${teamId}
        AND s.created_at >= NOW() - INTERVAL '90 days'
      GROUP BY 1
      ORDER BY 1;
    `);

    return NextResponse.json({
      team_id: teamId,
      training_roi: trainingRoi,
      skill_gap_trend: skillGapTrend,
    });
  } catch (error) {
    console.error('Error fetching team analytics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
