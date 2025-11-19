import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { sql } from 'drizzle-orm';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('org_id');
    const timePeriod = searchParams.get('time_period') || '90d';

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!orgId) {
        return NextResponse.json({ error: 'Missing org_id' }, { status: 400 });
    }

    try {
        // These are simplified queries for the MVP.
        // A real implementation would be more complex.
        const talentBenchStrength = [
            { role: 'Staff Engineer', ready_now: 5, ready_in_6_months: 10 },
            { role: 'Engineering Manager', ready_now: 2, ready_in_6_months: 4 },
        ];

        const overallSkillTrends = await db.execute(sql`
      SELECT
        s.name AS skill_name,
        COUNT(es.skill_id) AS employee_count
      FROM employee_skills es
      JOIN skills s ON es.skill_id = s.id
      JOIN employees e ON es.employee_id = e.id
      WHERE e.organization_id = ${orgId}
      GROUP BY s.name
      ORDER BY 2 DESC
      LIMIT 10;
    `);

        return NextResponse.json({
            org_id: orgId,
            talent_bench_strength: talentBenchStrength,
            overall_skill_trends: overallSkillTrends,
        });
    } catch (error) {
        console.error('Error fetching org analytics:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
