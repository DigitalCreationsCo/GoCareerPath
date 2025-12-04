import 'dotenv/config';
import { db } from '../drizzle';
import { sql } from 'drizzle-orm';

async function main() {
  console.log('Enabling the pgvector extension...');
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS vector;`);
  console.log('pgvector extension enabled successfully.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to enable pgvector extension:', err);
  process.exit(1);
});
