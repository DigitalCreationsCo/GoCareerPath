import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { eq } from 'drizzle-orm';
import { employees, employeeSkills, skills, roadmaps } from '@/lib/db/schema';
import { auth } from '@/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  const employeeId = params.id;

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const employee = await db.query.employees.findFirst({
      where: eq(employees.id, employeeId),
      with: {
        employeeSkills: {
          with: {
            skill: true,
          },
        },
        roadmaps: {
          orderBy: (roadmaps, { desc }) => [desc(roadmaps.createdAt)],
          limit: 1,
        },
      },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    const currentSkills = employee.employeeSkills.map((es) => ({
      skill_name: es.skill.name,
      proficiency: es.proficiencyLevel,
    }));

    // This is a simplified representation of skill gaps.
    // A real implementation would involve comparing current skills to the skills required for the next role.
    const skillGaps = [
        { skill_name: 'Go', proficiency_needed: 3 },
        { skill_name: 'GraphQL', proficiency_needed: 4 }
    ]

    return NextResponse.json({
      employee_id: employee.id,
      employee_name: employee.name,
      role: employee.role,
      current_skills: currentSkills,
      skill_gaps: skillGaps,
      career_roadmap: employee.roadmaps[0]
        ? {
            recommended_role: employee.roadmaps[0].recommendedRole,
            steps: employee.roadmaps[0].steps?.split('\n'),
          }
        : null,
    });
  } catch (error) {
    console.error('Error fetching employee skill profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
