import { DateString, UserMessageArray } from "./clarifyWithUserInstructions";

export const researchOutlineGenerationPrompt = (
    research_brief: string,
    messages: UserMessageArray,
    date: DateString
  ): string => `
  Create a structured research outline for identifying and analyzing 4 optimal career paths.
  
  **Research Brief:**
  ${research_brief}
  
  **Context Messages:**
  ${messages}
  
  Today: ${date}
  
  The output must be a complete, clearly formatted outline with no dialogue or commentary.
  
  ---
  
  **Create a detailed outline with specific search queries:**
  
  ## Research Outline for 4-Path Career Report
  
  ### Phase 1: Career Path Identification (Single Agent)
  **Objective:** Identify 4-6 candidate paths based on user profile
  
  **Research Tasks:**
  1. Search: "[user's skills/industry] automation-resistant high-paying careers 2025"
  2. Search: "[user's location] high-growth jobs [salary range]"
  3. Search: "careers for [key skills] future-proof AI-resistant"
  
  **Deliverable:** List of 4-6 candidate career paths with brief rationale
  
  ---
  
  ### Phase 2: Deep Dive Analysis (4 Parallel Agents, 1 per path)
  
  For each of the top 4 selected paths, delegate comprehensive research:
  
  #### Path [X]: [Career Title]
  
  **2.1 Role Overview**
  - Search: "[career] job description responsibilities day-to-day 2025"
  - Gather: Core duties, work environment, typical projects
  
  **2.2 Market Demand & Growth**
  - Search: "[career] job growth outlook BLS projections"
  - Search: "[career] hiring trends [location] 2025"
  - Gather: Growth percentage, demand indicators, future outlook
  
  **2.3 Salary Analysis**
  - Search: "[career] salary range [location] by experience level"
  - Search: "[career] compensation Glassdoor LinkedIn 2025"
  - Gather: Entry/mid/senior salary ranges with sources
  
  **2.4 Automation Risk Assessment**
  - Search: "[career] AI automation impact future of work"
  - Search: "[career] tasks automatable vs human skills"
  - Gather: Automation risk score, resistant tasks, AI impact analysis
  
  **2.5 Entry Requirements**
  - Search: "[career] education requirements certifications"
  - Search: "[career] skills needed to break in"
  - Gather: Degrees, certifications, experience, skills gap analysis
  
  **2.6 Career Progression**
  - Search: "[career] career path advancement timeline"
  - Gather: Typical 3-5 year progression, promotion timeline
  
  **2.7 Top Employers**
  - Search: "[career] top companies hiring [location]"
  - Search: "[career] best employers job openings"
  - Gather: 5-10 actively hiring companies
  
  **2.8 Learning Resources**
  - Search: "[career] certifications courses training programs"
  - Search: "[career] online learning resources credentials"
  - Gather: Specific courses, certifications, professional development paths
  
  ---
  
  ### Phase 3: Comparative Analysis (Single Agent)
  **Objective:** Rank and compare the 4 paths
  
  **Research Tasks:**
  1. Create comparison matrix (salary, automation risk, entry barrier, work-life balance)
  2. Identify unique advantages of each path
  3. Note trade-offs and compatibility scores
  4. Generate final rankings with justification
  
  **Deliverable:** Comparative analysis with rankings
  
  ---
  
  **Execution Strategy:**
  - **Round 1** (1 agent): Complete Phase 1, identify top 4 paths
  - **Round 2** (4 parallel agents): Each agent handles 1 path's deep dive (Phase 2)
  - **Round 3** (1 agent): Complete Phase 3 comparative analysis
  
  **Use user's language for all output.**
  `;