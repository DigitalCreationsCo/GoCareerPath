import { DateString, UserMessageArray } from "./clarifyWithUserInstructions";

export const transformMessagesIntoResearchTopicPrompt = (
    messages: UserMessageArray,
    date: DateString
  ): string => `
  Convert your career discussion with the user into a structured research brief for identifying 4 optimal career paths.
  
  **Messages:**
  ${messages}
  
  Today: ${date}
  
  **Output Requirements:**
  Create a second-person research brief specifying:
  
  **User Profile:**
  - Current role, experience, industry
  - Key skills and strengths
  - Location/geography constraints
  - Salary expectations
  
  **Research Goal:**
  Identify and deeply analyze 4 distinct career paths that are:
  1. **High-paying** (meeting or exceeding salary expectations)
  2. **High-value** (in-demand, strong growth outlook)
  3. **Automation-resistant** (low AI/automation displacement risk)
  4. **Compatible** (match user's skills, goals, and constraints)
  
  **Career Priorities:**
  [growth, work-life balance, remote work, creativity, impact, etc.]
  
  **Format Example:**
  "[role] with [X years] in [industry]. Your core skills include [list]. You are seeking career opportunities in [location] paying [$X-$Y]. Your priorities are [list]. I will research 4 distinct career paths that match your profile, rank them by compatibility, and provide deep analysis of each path's market outlook, entry requirements, salary progression, and automation resilience."
  
  **Critical:** 
  - Include all user details explicitly
  - Mark unstated requirements as "open-ended" or "no specific constraint"
  - Emphasize the 4-path deliverable
  - Specify automation-resistance as key criterion
  `;
  