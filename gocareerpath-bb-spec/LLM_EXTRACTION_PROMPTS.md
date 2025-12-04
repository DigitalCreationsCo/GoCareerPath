# LLM Extraction Prompts

This document contains the prompts that will be used to extract structured data from raw GoCareerPath consumer reports.

## Prompt 1: Extract Key Skills

**Objective:** To identify and normalize the key skills of an employee.

**Prompt:**

```
Given the following career report, extract the employee's key skills and classify them into the following categories: [Technical, Leadership, Communication, Problem-Solving, Project Management]. For each skill, provide a proficiency level from 1 to 5, where 1 is a novice and 5 is an expert.

Report:
---
{{report_text}}
---

Output the result as a JSON object with the following structure:
{
  "skills": [
    {
      "skill_name": "string",
      "category": "string",
      "proficiency": "number"
    }
  ]
}
```

## Prompt 2: Generate Skill Snapshot

**Objective:** To generate a quantitative snapshot of the employee's current standing.

**Prompt:**

```
Based on the provided career report, generate a skill snapshot with the following metrics:

*   **skill_gap_score:** An integer from 1 to 100, representing the gap between the employee's current skills and what's needed for their next career step.
*   **uplift_projection:** A decimal value representing the projected productivity uplift (e.g., 0.15 for 15%) if the skill gaps are addressed.
*   **automation_risk:** A decimal value from 0 to 1, indicating the risk of the employee's role being automated.
*   **promotion_timeline:** An integer representing the estimated number of months until the employee is ready for a promotion.

Report:
---
{{report_text}}
---

Output the result as a JSON object:
{
  "skill_gap_score": "number",
  "uplift_projection": "number",
  "automation_risk": "number",
  "promotion_timeline": "number"
}
```

## Prompt 3: Create Career Roadmap

**Objective:** To generate a personalized career roadmap for the employee.

**Prompt:**

```
Analyze the following career report and recommend a next logical role for the employee. Then, outline a series of actionable steps or skills to develop to reach that role.

Report:
---
{{report_text}}
---

Output the result as a JSON object:
{
  "recommended_role": "string",
  "steps": ["string"]
}
