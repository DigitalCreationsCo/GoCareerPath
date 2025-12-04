# LLM Extraction Prompts

## 1. Introduction

This document contains the prompts that will be used to instruct the LLM to extract structured data from raw consumer career reports. The prompts are designed to be clear, specific, and to request the output in a structured JSON format.

## 2. General Instructions for the LLM

The following instructions will be included at the beginning of each prompt to set the context for the LLM:

"You are an expert AI assistant specializing in career development and skills analysis. Your task is to analyze the provided career report and extract the requested information in the specified JSON format. Adhere strictly to the provided skill taxonomy and rating scales."

## 3. Prompt for Skill Extraction

This prompt is used to identify and normalize the employee's skills.

**Prompt:**

```
Given the following career report, identify the employee's skills and their proficiency levels.
Normalize each skill to the provided skill taxonomy. If a skill is not in the taxonomy, categorize it as best as you can.
Provide the output in a JSON array of objects, with each object containing `skill_name` and `proficiency_level` (on a scale of 1-5).

**Skill Taxonomy:**
[
  "TypeScript", "JavaScript", "React", "Node.js", "Python", "Go", "SQL", "NoSQL",
  "GraphQL", "REST APIs", "Docker", "Kubernetes", "AWS", "GCP", "Azure",
  "CI/CD", "System Design", "Project Management", "Communication", "Leadership"
]

**Career Report:**
"""
[Insert raw text of career report here]
"""

**Output JSON:**
```

## 4. Prompt for Projections & Roadmap Extraction

This prompt is used to extract future-looking projections and career roadmap information.

**Prompt:**

```
Based on the career report provided, extract the following information:
- `skill_gap_score`: An integer score from 1-10 representing the overall skill gap for the employee's next likely role.
- `uplift_projection`: A float representing the projected productivity uplift (e.g., 0.15 for 15%) if the skill gaps are addressed.
- `automation_risk`: A float representing the risk of the employee's current role being automated (e.g., 0.2 for 20%).
- `promotion_timeline`: An integer representing the estimated number of months until the employee is ready for promotion.
- `recommended_roles`: A string containing the next one or two recommended roles for the employee.
- `roadmap_steps`: A string containing a brief, actionable list of steps for the employee to reach their next role.

Provide the output in a single JSON object.

**Career Report:**
"""
[Insert raw text of career report here]
"""

**Output JSON:**
```

## 5. Example of a Complete Prompt Request

```json
{
  "model": "gpt-4-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are an expert AI assistant specializing in career development and skills analysis. Your task is to analyze the provided career report and extract the requested information in the specified JSON format. Adhere strictly to the provided skill taxonomy and rating scales."
    },
    {
      "role": "user",
      "content": "Given the following career report, identify the employee's skills and their proficiency levels...\n\n**Career Report:**\n\"\"\"\nAlice is a highly skilled software engineer with deep expertise in front-end technologies. She is a master of React and TypeScript... \n\"\"\"\n\n**Output JSON:**"
    }
  ],
  "response_format": { "type": "json_object" }
}
