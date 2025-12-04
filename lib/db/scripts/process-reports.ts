import 'dotenv/config';
import { db } from '../drizzle';
import { eq, isNull, sql } from 'drizzle-orm';
import { rawReports, snapshots, roadmaps, skills, employeeSkills } from '../schema';
import { extractDataFromReport } from '../../llm/extraction';

async function main() {
    console.log('Starting report processing...');

    const unprocessedReports = await db
        .select()
        .from(rawReports)
        .where(isNull(rawReports.embedding)); // A simple way to find unprocessed reports

    if (unprocessedReports.length === 0) {
        console.log('No new reports to process.');
        process.exit(0);
    }

    for (const report of unprocessedReports) {
        const extractedData = await extractDataFromReport(report);

        await db.transaction(async (tx) => {
            const [ snapshot ] = await tx
                .insert(snapshots)
                .values({
                    userId: report.userId,
                    reportId: report.id,
                    skillGapScore: extractedData.skillGapScore,
                    upliftProjection: extractedData.upliftProjection,
                    automationRisk: extractedData.automationRisk,
                    promotionTimeline: extractedData.promotionTimeline,
                })
                .returning();

            await tx.insert(roadmaps).values({
                userId: report.userId,
                snapshotId: snapshot.id,
                recommendedRole: extractedData.recommendedRole,
                steps: extractedData.steps,
            });

            for (const skill of extractedData.skills) {
                let [ dbSkill ] = await tx.select().from(skills).where(eq(skills.name, skill.skillName));
                if (!dbSkill) {
                    [ dbSkill ] = await tx.insert(skills).values({ name: skill.skillName }).returning();
                }

                await tx.insert(employeeSkills).values({
                    userId: report.userId,
                    skillId: dbSkill.id,
                    proficiencyLevel: skill.proficiencyLevel,
                });
            }

            // Mark the report as processed by setting a dummy embedding
            await tx.update(rawReports).set({ embedding: sql`'[0]'` }).where(eq(rawReports.id, report.id));
        });

        console.log(`Successfully processed report for employee: ${report.userId}`);
    }

    console.log('Report processing finished.');
    process.exit(0);
}

main().catch((err) => {
    console.error('Failed to process reports:', err);
    process.exit(1);
});
