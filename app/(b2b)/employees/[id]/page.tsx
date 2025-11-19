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

async function getEmployeeSkillProfile(employeeId: string): Promise<EmployeeSkillProfile> {
  const response = await fetch(`${process.env.BASE_URL}/api/employees/${employeeId}/skill-profile`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch employee skill profile');
  }
  return response.json();
}

export default async function EmployeePage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  const employee = await getEmployeeSkillProfile(params.id);

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
    </div>
  );
}
