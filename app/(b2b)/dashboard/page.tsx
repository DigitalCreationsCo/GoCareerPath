import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

type TeamSnapshot = {
  team_id: string;
  team_name: string;
  snapshot_date: string;
  skill_heatmap: { skillName: string; averageProficiency: number }[];
  promotion_readiness: { employeeId: string; employeeName: string; readiness_score: number }[];
  attrition_risk: { employeeId: string; employeeName: string; risk_score: number }[];
};

async function getTeamSnapshot(teamId: string): Promise<TeamSnapshot> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teams/${teamId}/snapshot`, {
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch team snapshot');
  }
  return response.json();
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  // We'll need a way to get the user's team ID. For now, we'll hardcode it.
  const teamId = 'd8a8e8e0-5b7a-4b0e-8b0a-9b0a9b0a9b0a';
  const snapshot = await getTeamSnapshot(teamId);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Team Dashboard: { snapshot.team_name }</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Skill Heatmap</h2>
          <ul>
            { snapshot.skill_heatmap.map((skill) => (
              <li key={ skill.skillName }>
                { skill.skillName }: { skill.averageProficiency.toFixed(1) }
              </li>
            )) }
          </ul>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Promotion Readiness</h2>
          <ul>
            { snapshot.promotion_readiness.map((employee) => (
              <li key={ employee.employeeId }>
                { employee.employeeName }: { (employee.readiness_score * 100).toFixed(0) }%
              </li>
            )) }
          </ul>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Attrition Risk</h2>
          <ul>
            { snapshot.attrition_risk.map((employee) => (
              <li key={ employee.employeeId }>
                { employee.employeeName }: { (employee.risk_score * 100).toFixed(0) }%
              </li>
            )) }
          </ul>
        </div>
      </div>
    </div>
  );
}
