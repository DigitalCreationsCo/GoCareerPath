import { eq } from 'drizzle-orm';
import { db } from '../drizzle';
import { reports } from '@/lib/db/schema';
import { Report } from '@/lib/types';

export async function getUserReports(userId: string): Promise<Report[]> {
  const userReports = await db
    .select()
    .from(reports)
    .where(eq(reports.userId, userId));

  return userReports as unknown as Report[];
}

export async function getLatestReportForUser(userId: string): Promise<Report | undefined> {
  const userReports = await getUserReports(userId);

  if (userReports.length === 0) {
    return undefined;
  }

  // Sort by generated_at in metadata (descending)
  const sortedReports = userReports.sort((a, b) => {
    const dateA = new Date((a.metadata as any).generated_at || (a.metadata as any).createdAt || 0).getTime();
    const dateB = new Date((b.metadata as any).generated_at || (b.metadata as any).createdAt || 0).getTime();
    return dateB - dateA;
  });

  return sortedReports[0];
}
