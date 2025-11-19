import 'dotenv/config';
import { db } from '../drizzle';
import { sql } from 'drizzle-orm';

async function main() {
  console.log('Creating materialized views...');

  await db.execute(sql`
    CREATE MATERIALIZED VIEW IF NOT EXISTS team_skill_heatmap AS
    SELECT
      t.id AS team_id,
      s.name AS skill_name,
      AVG(es.proficiency_level) AS average_proficiency
    FROM b2b_teams t
    JOIN employees e ON t.id = e.team_id
    JOIN employee_skills es ON e.id = es.employee_id
    JOIN skills s ON es.skill_id = s.id
    GROUP BY t.id, s.name;
  `);

  await db.execute(sql`
    CREATE MATERIALIZED VIEW IF NOT EXISTS promotion_readiness_index AS
    SELECT
      e.id AS employee_id,
      e.name AS employee_name,
      (1 - (s.promotion_timeline / 12.0)) AS readiness_score
    FROM employees e
    JOIN (
      SELECT
        employee_id,
        promotion_timeline,
        ROW_NUMBER() OVER(PARTITION BY employee_id ORDER BY created_at DESC) as rn
      FROM snapshots
    ) s ON e.id = s.employee_id AND s.rn = 1
    WHERE s.promotion_timeline IS NOT NULL AND s.promotion_timeline <= 6;
  `);

  await db.execute(sql`
    CREATE MATERIALIZED VIEW IF NOT EXISTS attrition_risk_index AS
    SELECT
      e.id AS employee_id,
      e.name AS employee_name,
      s.automation_risk AS risk_score
    FROM employees e
    JOIN (
      SELECT
        employee_id,
        automation_risk,
        ROW_NUMBER() OVER(PARTITION BY employee_id ORDER BY created_at DESC) as rn
      FROM snapshots
    ) s ON e.id = s.employee_id AND s.rn = 1
    WHERE s.automation_risk IS NOT NULL AND s.automation_risk > 0.5;
  `);

  console.log('Materialized views created successfully.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to create materialized views:', err);
  process.exit(1);
});
