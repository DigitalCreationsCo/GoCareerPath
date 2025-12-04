import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { eq } from 'drizzle-orm';
import { teams, users, employeeSkills, skills, snapshots } from '@/lib/db/schema';
import { auth } from '@/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
    const session = await auth();
    const teamId = (await params).id;

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const team = await db.query.teams.findFirst({
            where: eq(teams.id, teamId),
            with: {
                users: {
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
        const skillHeatmapAccumulator = team.users
            .flatMap((e) => e.employeeSkills)
            .reduce((acc, es) => {
                const skillName = es.skill?.name;
                if (!skillName) return acc;

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

        const promotionReadiness = team.users
            .filter((e) => e.snapshots && e.snapshots[ 0 ] && e.snapshots[ 0 ].promotionTimeline !== null && e.snapshots[ 0 ].promotionTimeline <= 6)
            .map((e) => ({
                id: e.id,
                name: e.name ?? 'Unknown',
                readiness_score: 1 - (e.snapshots[ 0 ].promotionTimeline! / 12),
            }));

        const attritionRisk = team.users
            .filter((e) => e.snapshots && e.snapshots[ 0 ] && e.snapshots[ 0 ].automationRisk !== null && Number(e.snapshots[ 0 ].automationRisk) > 0.5)
            .map((e) => ({
                id: e.id,
                name: e.name ?? 'Unknown',
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
