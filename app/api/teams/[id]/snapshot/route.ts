import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { eq } from 'drizzle-orm';
import { b2bTeams, employees, employeeSkills, skills, snapshots } from '@/lib/db/schema';
import { auth } from '@/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string; }; }) {
    const session = await auth();
    const teamId = (await params).id;

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const team = await db.query.b2bTeams.findFirst({
            where: eq(b2bTeams.id, teamId),
            with: {
                employees: {
                    with: {
                        employeeSkills: {
                            with: {
                                skill: true,
                            },
                        },
                        snapshots: {
                            orderBy: (snapshots, { desc }) => [ desc(snapshots.createdAt) ],
                            limit: 1,
                        },
                    },
                },
            },
        });

        if (!team) {
            return NextResponse.json({ error: 'Team not found' }, { status: 404 });
        }

        // In a real-world scenario, these calculations would be more sophisticated
        // and likely pre-computed in materialized views.
        const skillHeatmapAccumulator = team.employees
            .flatMap((e) => e.employeeSkills)
            .reduce((acc, es) => {
                const skillName = es.skill.name;
                if (!acc[ skillName ]) {
                    acc[ skillName ] = { skillName, totalProficiency: 0, count: 0 };
                }
                acc[ skillName ].totalProficiency += es.proficiencyLevel || 0;
                acc[ skillName ].count++;
                return acc;
            }, {} as Record<string, { skillName: string; totalProficiency: number; count: number; }>);

        const skillHeatmap = Object.values(skillHeatmapAccumulator).map(s => ({
            skillName: s.skillName,
            averageProficiency: s.totalProficiency / s.count,
        }));

        const promotionReadiness = team.employees
            .filter((e) => e.snapshots && e.snapshots[ 0 ] && e.snapshots[ 0 ].promotionTimeline !== null && e.snapshots[ 0 ].promotionTimeline <= 6)
            .map((e) => ({
                employeeId: e.id,
                employeeName: e.name,
                readiness_score: 1 - (e.snapshots[ 0 ].promotionTimeline! / 12),
            }));

        const attritionRisk = team.employees
            .filter((e) => e.snapshots && e.snapshots[ 0 ] && e.snapshots[ 0 ].automationRisk !== null && Number(e.snapshots[ 0 ].automationRisk) > 0.5)
            .map((e) => ({
                employeeId: e.id,
                employeeName: e.name,
                risk_score: Number(e.snapshots[ 0 ].automationRisk),
            }));

        return NextResponse.json({
            team_id: team.id,
            team_name: team.name,
            snapshot_date: new Date().toISOString(),
            skill_heatmap: skillHeatmap,
            promotion_readiness: promotionReadiness,
            attrition_risk: attritionRisk,
        });
    } catch (error) {
        console.error('Error fetching team snapshot:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
