import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, User, AlertCircle } from 'lucide-react';
import { getReports } from '@/lib/db/queries/report';
import Link from 'next/link';

function getRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

export default async function ReportPage() {
  const reports = await getReports();

  return (
    <section className="flex-1 px-4 lg:px-8">
      <h1 className="heading2">
        Reports
      </h1>
      <hr />
      <div className="py-4">
        {reports.length > 0 ? (
          <ul className="space-y-4">
            {reports.map((report) => {
              const metadata = report.metadata as any;
              const bestPath = metadata?.best_path || 'Career Path Analysis';
              const userName = metadata?.user?.name || 'Unknown User';
              const generatedAt = metadata?.generated_at || metadata?.createdAt;

              return (
                <li key={report.id} className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/dashboard/reports/${report.id}`} className="hover:underline">
                      <p className="text-sm font-medium text-foreground">
                        {bestPath}
                      </p>
                    </Link>
                    <p className="text-sm text-gray-500">
                      Generated for {userName} {getRelativeTime(new Date(generatedAt))}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="w-12 h-12 mb-4 text-primary" />
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              No reports yet
            </h3>
            <p className="max-w-sm text-sm text-gray-500">
              When you generate career path reports, they'll appear here for easy access and review.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
