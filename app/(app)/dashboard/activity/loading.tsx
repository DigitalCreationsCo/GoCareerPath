import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ActivityPageSkeleton() {
  return (
    <section className="flex-1 px-4 lg:px-8">
      <h1 className="heading2">
        Activity Log
      </h1>
      <hr />
      <h2>Recent Activity</h2>
    </section>
  );
}
