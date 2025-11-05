import { db } from '@/lib/db/drizzle';
import { researchSessions } from '@/lib/db/schema';

const sessions = await db.select().from(researchSessions);

const issues = sessions.filter(s => !s.threadId);

console.debug('Sessions without threadId:', issues.length);
console.debug('Total sessions:', sessions.length);

if (issues.length > 0) {
  console.debug('Problematic sessions:', issues.map(s => s.id));
}