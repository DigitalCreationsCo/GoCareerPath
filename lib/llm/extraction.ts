import 'dotenv/config';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const skillTaxonomy = [
  "TypeScript", "JavaScript", "React", "Node.js", "Python", "Go", "SQL", "NoSQL",
  "GraphQL", "REST APIs", "Docker", "Kubernetes", "AWS", "GCP", "Azure",
  "CI/CD", "System Design", "Project Management", "Communication", "Leadership"
];

export async function extractDataFromReport(report: any): Promise<any> {
  const systemPrompt = `
You are an expert AI assistant specializing in career development and skills analysis.
Your task is to analyze the provided career report and extract the requested information in the specified JSON format.
Adhere strictly to the provided skill taxonomy and rating scales.
`;

  const userPrompt = `
Given the following career report, extract the following information:
- \`skill_gap_score\`: An integer score from 1-10 representing the overall skill gap for the employee's next likely role.
- \`uplift_projection\`: A float representing the projected productivity uplift (e.g., 0.15 for 15%) if the skill gaps are addressed.
- \`automation_risk\`: A float representing the risk of the employee's current role being automated (e.g., 0.2 for 20%).
- \`promotion_timeline\`: An integer representing the estimated number of months until the employee is ready for promotion.
- \`recommended_roles\`: A string containing the next one or two recommended roles for the employee.
- \`roadmap_steps\`: A string containing a brief, actionable list of steps for the employee to reach their next role.
- \`skills\`: An array of objects, with each object containing \`skill_name\` and \`proficiency_level\` (on a scale of 1-5).

**Skill Taxonomy:**
${JSON.stringify(skillTaxonomy)}

**Career Report:**
"""
${JSON.stringify(report.rawContentJson)}
"""

**Output JSON:**
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in LLM response');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error extracting data from report:', error);
    throw error;
  }
}
