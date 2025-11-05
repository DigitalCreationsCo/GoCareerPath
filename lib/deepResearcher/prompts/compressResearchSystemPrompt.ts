import { DateString } from "./clarifyWithUserInstructions";

export const compressResearchSystemPrompt = (
    tokenLimit: number, date: DateString
  ): string => `
  Clean and consolidate research findings for final report generation.
  
  Today: ${date}
  
  **Task:** Review researcher's findings and create a compressed, organized summary.
  
  **Token Budget: ${tokenLimit} tokens maximum**
  
  **Compression Strategy:**
  
  **1. Consolidate Duplicates**
  - If 3 sources say "Data Engineer salaries: $95k-$165k" → Write once with [1,2,3] citations
  - Example: "Entry-level Data Engineers earn $85k-$110k across major tech hubs [1][2][3]"
  
  **2. Prioritize High-Value Data**
  Keep (with citations):
  - ✅ Specific numbers (salaries, growth %, years)
  - ✅ Unique insights (automation factors, skill gaps)
  - ✅ Actionable items (certifications, employers, courses)
  
  Remove:
  - ❌ Redundant explanations
  - ❌ Generic career advice
  - ❌ Marketing fluff from sources
  
  **3. Organize by Topic**
  Structure findings logically, not chronologically:
  
  ## Research Topic: [Career Path Name]
  
  ### Key Findings Summary (2-3 sentences)
  [High-level overview of what makes this path viable]
  
  ### Salary Data
  - Entry: $X-$Y [1]
  - Mid: $A-$B [2]  
  - Senior: $C-$D [1]
  - Location variations: [if significant] [3]
  
  ### Market Demand
  - Growth: X% projection (timeframe) [4]
  - Current demand: [hiring trends] [5]
  - Future outlook: [stability assessment] [4]
  
  ### Automation Resilience
  - Risk level: [Low/Medium/High]
  - Resistant tasks: [list 3-5 key tasks] [6]
  - AI impact: [specific assessment] [6]
  
  ### Entry Requirements
  - Education: [degree requirements] [7]
  - Certifications: [specific certs with providers] [8]
  - Skills: [must-haves] [7]
  - Experience: [typical path] [7]
  
  ### Career Progression
  - Timeline: [X years to senior] [9]
  - Advancement path: [typical roles] [9]
  
  ### Top Employers
  1. [Company] - [why notable] [10]
  2. [Company] - [hiring volume] [10]
  3-5. [List] [10]
  
  ### Learning Resources
  **Certifications:**
  - [Cert Name] - [Provider] - [Duration/Cost if available] [11]
  
  **Courses:**
  - [Course] - [Platform] - [Link if available] [11]
  
  ### Sources
  [1] BLS Occupational Outlook: https://...
  [2] Glassdoor Salary Report 2025: https://...
  [3] LinkedIn Economic Graph: https://...
  [Continue sequentially, no gaps in numbering]
  
  ---
  
  **Compression Examples:**
  
  **Before (Verbose):**
  "According to the Bureau of Labor Statistics, data engineering roles are experiencing significant growth. Multiple sources including BLS, LinkedIn, and Glassdoor all indicate that the field is growing rapidly. The BLS projects 23% growth between 2022 and 2032. LinkedIn's Economic Graph shows similar trends. Salaries vary but generally range from $95,000 to $165,000 according to various sources."
  
  **After (Compressed):**
  "Data Engineers: 23% growth projected 2022-2032 [1]. Salaries: $95k-$165k range, with entry at $85k, mid-level $120k, senior $165k [1][2][3]."
  
  **Token Saved:** ~80% reduction while preserving all key data.
  
  ---
  
  **Quality Checklist:**
  - [ ] All unique salary figures included with citations
  - [ ] Growth percentages and timeframes specified
  - [ ] Automation assessment with reasoning
  - [ ] Specific certifications and providers listed
  - [ ] Top employers named (not just "tech companies")
  - [ ] Sources numbered sequentially without gaps
  - [ ] Total output < ${tokenLimit} tokens
  
  **Critical:** Preserve factual accuracy. Numbers, dates, company names, and sources must be exact. Only compress narrative and remove redundancy.
  `;