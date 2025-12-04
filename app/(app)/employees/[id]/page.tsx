import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

type EmployeeSkillProfile = {
  employee_id: string;
  employee_name: string;
  role: string;
  current_skills: { skill_name: string; proficiency: number }[];
  skill_gaps: { skill_name: string; proficiency_needed: number }[];
  career_roadmap: {
    recommended_role: string;
    steps: string[];
  } | null;
};

type EmployeeSnapshot = {
  id: string;
  skillGapScore: number;
  upliftProjection: number;
  automationRisk: number;
  promotionTimeline: number;
  createdAt: string;
};

async function getEmployeeSkillProfile(employeeId: string): Promise<EmployeeSkillProfile> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/employees/${employeeId}/skill-profile`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch employee skill profile');
  }
  return response.json();
}

async function getEmployeeSnapshots(employeeId: string): Promise<EmployeeSnapshot[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/employees/${employeeId}/snapshot`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (!response.ok) {
    return [];
  }
  return response.json();
}

export default async function EmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }
  
  const employeeId = (await params).id;

  if (session.user.role !== 'owner' && session.user.id !== employeeId) {
    redirect('/unauthorized');
  }

  const employee = await getEmployeeSkillProfile(employeeId);
  const snapshots = await getEmployeeSnapshots(employeeId);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">
        Skill Snapshot: {employee.employee_name}
      </h1>
      <p className="mb-4 text-lg">{employee.role}</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Current Skills</h2>
          <ul>
            {employee.current_skills.map((skill) => (
              <li key={skill.skill_name}>
                {skill.skill_name}: {skill.proficiency}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Skill Gaps</h2>
          <ul>
            {employee.skill_gaps.map((skill) => (
              <li key={skill.skill_name}>
                {skill.skill_name} (Needed: {skill.proficiency_needed})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {employee.career_roadmap && (
        <div className="p-4 mt-4 border rounded">
          <h2 className="text-lg font-semibold">Career Roadmap</h2>
          <h3 className="mt-2 font-semibold text-md">
            Next Role: {employee.career_roadmap.recommended_role}
          </h3>
          <ul className="mt-2 list-disc list-inside">
            {employee.career_roadmap.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      {snapshots.length > 0 && (
        <div className="p-4 mt-4 border rounded">
          <h2 className="text-lg font-semibold">Snapshots</h2>
          <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2 lg:grid-cols-3">
            {snapshots.map((snapshot) => (
              <div key={snapshot.id} className="p-4 border rounded">
                <h3 className="font-semibold text-md">
                  Snapshot taken on {new Date(snapshot.createdAt).toLocaleDateString()}
                </h3>
                <p>Skill Gap Score: {snapshot.skillGapScore}</p>
                <p>Uplift Projection: {snapshot.upliftProjection}</p>
                <p>Automation Risk: {snapshot.automationRisk}</p>
                <p>Promotion Timeline: {snapshot.promotionTimeline} months</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
