import { DateString, UserMessageArray } from "./clarifyWithUserInstructions";

export const finalReportGenerationPrompt = (
  research_brief: string,
  research_outline: string,
  messages: UserMessageArray,
  findings: string,
  date: DateString
): string => `
You will generate TWO versions of a career report: a PREVIEW (free teaser) and a FULL REPORT (complete analysis).

**CRITICAL: Return as structured JSON with two fields:**
{
  "reportPreview": "...",
  "finalReport": "..."
}

DO NOT wrap the JSON in markdown code fences.
Return ONLY the raw JSON object.

**IMPORTANT INSTRUCTIONS:**
- When referencing preparation timelines, **be generous** — always choose the **upper bound**.  
  Example: if research suggests "3–6 months", write "6 months". If "8–12 months", write "12 months".  
  Never include ranges. Use only the generous single value.
- Focus on **automation-resistant** careers with strong future outlook
- Prioritize **actionable, specific steps** over generic advice
- Include **market trends and future developments** for each path
- Ensure all diagrams render in both browser (markdown) and PDF formats

**Color Palette (Hex) - Use in ALL diagrams:**
- Primary Blue: #4A90E2
- Cyan: #50C8E8
- Green: #5DD39E
- Gold: #FFD700
- Orange: #FF8C42
- Purple: #9B59B6
- Red: #E74C3C
- Gray: #BDC3C7

**Research Context:**
- Research Brief: ${research_brief}  
- Research Outline: ${research_outline}  
- User Messages: ${JSON.stringify(messages)}  
- Compiled Findings: ${findings}  
- Today: ${date}  

---

## 📋 PART 1: REPORT PREVIEW (reportPreview field)

**Purpose:** Free teaser to showcase value and drive purchase

**Structure - EXACTLY THIS:**

# 📌 Your Career Path Report - Preview

## Executive Summary

[Write HALF the executive summary - cut at natural midpoint and add "..."]

**🔒 Unlock the full analysis to see:**
- Complete automation risk assessment with 10-year outlook
- Detailed path-by-path analysis with market trends and future developments
- Skills gap analysis with exact learning roadmaps
- Comprehensive 30-day action sprint with daily tasks
- Salary progression maps with realistic timelines
- Top employers list with hiring strategies
- Networking scripts and offer negotiation tactics

~~~mermaid
flowchart TD
    A["Your Current Profile<br/>Experience: [X years]<br/>Top Skills: [2-3 key skills]"] --> B{"4 Automation-Resistant<br/>Career Paths"}
    
    B -->|"Score: X/10"| C["🥇 PATH #1<br/>$XXX-XXXk range<br/>Automation Risk: LOW"]
    B -->|"Score: X/10"| D["🥈 PATH #2<br/>$XXX-XXXk range<br/>Automation Risk: LOW"]
    B -->|"Score: X/10"| E["🥉 PATH #3<br/>$XXX-XXXk range<br/>Automation Risk: LOW"]
    B -->|"Score: X/10"| F["4️⃣ PATH #4<br/>$XXX-XXXk range<br/>Automation Risk: MEDIUM"]
    
    C -->|"Best Overall Match"| G["✅ TOP RECOMMENDATION<br/>Highest ROI + Future-Proof<br/>Timeline: [X months]"]
    
    style A fill:#BDC3C7,stroke:#7F8C8D,stroke-width:2px,color:#2C3E50
    style B fill:#4A90E2,stroke:#2E5C8A,stroke-width:3px,color:#FFFFFF
    style C fill:#FFD700,stroke:#B8860B,stroke-width:3px,color:#2C3E50
    style D fill:#BDC3C7,stroke:#7F8C8D,stroke-width:2px,color:#2C3E50
    style E fill:#FF8C42,stroke:#C86A2F,stroke-width:2px,color:#FFFFFF
    style F fill:#BDC3C7,stroke:#7F8C8D,stroke-width:2px,color:#2C3E50
    style G fill:#5DD39E,stroke:#3AA76D,stroke-width:3px,color:#FFFFFF
~~~

---

## 🚀 Unlock Your Complete Career Blueprint

**What you'll get in the full report:**

✅ **Deep Analysis of All 4 Automation-Resistant Paths** - Detailed breakdown with 10-year outlook and resilience scoring  
✅ **Future Trends Analysis** - How each career adapts to AI, automation, and emerging technologies  
✅ **Your Personal Skill Transfer Map** - Visual breakdown of exactly how your experience translates  
✅ **Market Intelligence Dashboard** - Growth rates, demand trends, and geographic hotspots  
✅ **Salary Progression Roadmaps** - Realistic 5-10 year earning trajectories with promotion timelines  
✅ **Comprehensive Skills Gap Analysis** - Exact courses, certifications, and learning paths prioritized by impact  
✅ **30-Day Action Sprint** - Week-by-week, day-by-day tasks to launch your transition  
✅ **Entry Strategy Playbook** - Portfolio projects, networking tactics, and application strategies  
✅ **Top Employers Database** - Companies hiring now with insider application tips  
✅ **Negotiation & Outreach Scripts** - Proven templates for emails, networking, and salary talks  
✅ **Head-to-Head Comparison Matrix** - All 4 paths compared across 12 critical factors  
✅ **30+ Verified Sources** - Every claim backed by current labor market data and expert research  

🎯 Make your next career move with confidence - backed by data, not guesswork.

[Purchase Full Report - $29.99] **→ Get instant access to your complete personalized analysis**

---

*Preview generated on ${date}. Full report includes 4,000+ words of analysis with 20+ interactive diagrams.*

---

## 📋 PART 2: FULL REPORT (finalReport field)

Generate a **comprehensive, visual-first career report** with clear actionability.
Maintain a **50/50 text-to-visual balance** where diagrams convey insights text cannot.  
Use **dynamic, informative Mermaid diagrams** with the specified color palette.

**CRITICAL MERMAID SYNTAX:**
- Use ~~~ (triple tildes) instead of backticks for mermaid code blocks
- This ensures JSON serializability AND proper rendering in both browser and PDF
- Keep diagrams clear and not overly complex for PDF compatibility
- Test that all node labels are concise to prevent rendering issues

---

# 🎯 Your Automation-Resistant Career Path Report

## Executive Summary

[Comprehensive 2-3 paragraph summary including:
- User's current background and experience level
- Key skills and transferable strengths
- Career goals and constraints (location, salary, work style)
- Overview of the 4 paths analyzed
- Clear statement of top recommendation with key differentiators
- Brief mention of automation resistance focus]

~~~mermaid
flowchart TD
    A["Your Current Profile<br/>Role: [Specific Role]<br/>Experience: X years<br/>Industry: [Industry]"] --> B{"4 Automation-Resistant<br/>Paths Analyzed"}
    
    B -->|"Score: X/10"| C["🥇 Path #1<br/>[FULL Career Title]<br/>$XXX-XXXk<br/>🛡️ Automation Risk: LOW"]
    B -->|"Score: X/10"| D["🥈 Path #2<br/>[FULL Career Title]<br/>$XXX-XXXk<br/>🛡️ Automation Risk: LOW"]
    B -->|"Score: X/10"| E["🥉 Path #3<br/>[FULL Career Title]<br/>$XXX-XXXk<br/>🛡️ Automation Risk: LOW"]
    B -->|"Score: X/10"| F["4️⃣ Path #4<br/>[FULL Career Title]<br/>$XXX-XXXk<br/>🛡️ Automation Risk: MEDIUM"]
    
    C -->|"Best Overall Match"| G["✅ RECOMMENDED<br/>Highest ROI + Future-Proof<br/>Start: [X months]"]
    
    style A fill:#BDC3C7,stroke:#7F8C8D,stroke-width:2px,color:#2C3E50
    style B fill:#4A90E2,stroke:#2E5C8A,stroke-width:3px,color:#FFFFFF
    style C fill:#FFD700,stroke:#B8860B,stroke-width:3px,color:#2C3E50
    style D fill:#BDC3C7,stroke:#7F8C8D,stroke-width:2px,color:#2C3E50
    style E fill:#FF8C42,stroke:#C86A2F,stroke-width:2px,color:#FFFFFF
    style F fill:#BDC3C7,stroke:#7F8C8D,stroke-width:2px,color:#2C3E50
    style G fill:#5DD39E,stroke:#3AA76D,stroke-width:3px,color:#FFFFFF
~~~

---

## 🏆 Path Rankings Overview

~~~mermaid
flowchart LR
    A1["🥇 #1: [Title]<br/>Match: X/10<br/>Salary: $XXX-XXXk<br/>🛡️ Auto Risk: LOW<br/>Entry: X months<br/>Growth: +X%/yr"]
    A2["🥈 #2: [Title]<br/>Match: X/10<br/>Salary: $XXX-XXXk<br/>🛡️ Auto Risk: LOW<br/>Entry: X months<br/>Growth: +X%/yr"]
    A3["🥉 #3: [Title]<br/>Match: X/10<br/>Salary: $XXX-XXXk<br/>🛡️ Auto Risk: LOW<br/>Entry: X months<br/>Growth: +X%/yr"]
    A4["4️⃣ #4: [Title]<br/>Match: X/10<br/>Salary: $XXX-XXXk<br/>🛡️ Auto Risk: MED<br/>Entry: X months<br/>Growth: +X%/yr"]
    
    A1 -.->|"Winner because"| B["Highest skill match<br/>Best salary/effort ratio<br/>Strong future-proofing<br/>Clearest entry path"]
    
    style A1 fill:#FFD700,stroke:#B8860B,stroke-width:3px,color:#2C3E50
    style A2 fill:#BDC3C7,stroke:#7F8C8D,stroke-width:2px,color:#2C3E50
    style A3 fill:#FF8C42,stroke:#C86A2F,stroke-width:2px,color:#FFFFFF
    style A4 fill:#BDC3C7,stroke:#7F8C8D,stroke-width:2px,color:#2C3E50
    style B fill:#5DD39E,stroke:#3AA76D,stroke-width:2px,color:#FFFFFF
~~~

---

## 🥇 Rank #1: [Career Title]

### Role Overview  
[2 paragraphs:
1. Core responsibilities, typical work environment, day-to-day activities
2. Why this role matters in the current/future economy, impact potential]

### 🤖 Automation Resistance Analysis

| Factor | Assessment | Details |
|--------|------------|---------|
| **AI Displacement Risk** | LOW | [Specific reasoning with data] |
| **10-Year Outlook** | STRONG | [Growth projections with sources] |
| **Human-Centric Elements** | HIGH | [Which aspects require human judgment] |
| **Adaptability Score** | X/10 | [How role evolves with technology] |
| **Skill Durability** | X/10 | [How transferable/future-proof skills are] |

**Future Trends Impact:**
- [Trend 1]: [How it affects this role positively/negatively]
- [Trend 2]: [Specific opportunities emerging]
- [Trend 3]: [How role adapts and remains relevant]

~~~mermaid
flowchart TD
    A["🤖 Automation Threats"] --> B{"Role Resilience<br/>Factors"}
    C["📈 Future Trends"] --> B
    
    B --> D["✅ High Human Judgment<br/>Complex decision-making<br/>required"]
    B --> E["✅ Evolving Skill Set<br/>Role adapts with<br/>technology"]
    B --> F["✅ Relationship-Driven<br/>Trust & collaboration<br/>essential"]
    
    D --> G["🛡️ LOW AUTOMATION RISK<br/>Role remains valuable<br/>through 2035+"]
    E --> G
    F --> G
    
    style A fill:#E74C3C,stroke:#C0392B,stroke-width:2px,color:#FFFFFF
    style C fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#FFFFFF
    style B fill:#9B59B6,stroke:#6C3483,stroke-width:2px,color:#FFFFFF
    style D fill:#5DD39E,stroke:#3AA76D,stroke-width:2px,color:#FFFFFF
    style E fill:#5DD39E,stroke:#3AA76D,stroke-width:2px,color:#FFFFFF
    style F fill:#5DD39E,stroke:#3AA76D,stroke-width:2px,color:#FFFFFF
    style G fill:#FFD700,stroke:#B8860B,stroke-width:3px,color:#2C3E50
~~~

### Your Fit Analysis

~~~mermaid
mindmap
  root(("💼 YOU TO ROLE<br/>Match: XX%"))
    ✅ Current Skills
      [Skill 1]: Direct transfer
      [Skill 2]: 90% applicable
      [Skill 3]: Strong foundation
      [Skill 4]: Proven experience
    🔄 Experience Leverage
      [Current role]: Maps XX% directly
      [Past project/role]: Highly relevant
      [Industry knowledge]: Competitive edge
      [Years experience]: Meets requirements
    🎯 Goal Alignment
      Meets [specific goal 1]
      Satisfies [specific goal 2]
      Timeline: Realistic
      Growth: Clear path visible
    ⚡ Unique Advantage
      Your edge: [Specific differentiator]
      Rare combo: [Skill A] + [Skill B]
      Market gap: [What makes you stand out]
~~~

**Skill Transfer Breakdown:**

| Your Current Skill | How It Transfers | Proficiency Level | Value to Role |
|-------------------|------------------|-------------------|---------------|
| [Skill 1] | [Specific application in new role] | ✅ Ready | High |
| [Skill 2] | [How it applies] | 🔄 Minor adaptation | High |
| [Skill 3] | [How it applies] | ✅ Ready | Medium |
| [Skill 4] | [How it applies] | 🔄 Minor adaptation | Medium |

### Market & Salary Intelligence

| Metric | Data | Source |
|--------|------|--------|
| **Job Growth (5yr)** | +X% vs X% industry avg | [1] |
| **Current Openings** | X,XXX active postings | [2] |
| **Geographic Hotspots** | [City 1], [City 2], [City 3] | [2] |
| **Entry Salary** | $XX,XXX to $XX,XXX | [3] |
| **Mid-Level (3-5yr)** | $XXX,XXX to $XXX,XXX | [3] |
| **Senior (5-8yr)** | $XXX,XXX to $XXX,XXX | [3] |
| **Top 10% Earners** | $XXX,XXX+ | [3] |
| **Remote Availability** | XX% of postings | [4] |
| **Industry Concentration** | [Top 3 hiring industries] | [5] |

**Market Trends (Next 5 Years):**
- [Trend 1]: [Impact on demand/salary]
- [Trend 2]: [Emerging opportunities]
- [Trend 3]: [Geographic shifts or remote work trends]

### Salary Progression Path

~~~mermaid
flowchart LR
    A["🌱 ENTRY<br/>$XXk-XXk<br/>Years 0-2<br/>Learning & proving value"] 
    B["📈 MID-LEVEL<br/>$XXXk-XXXk<br/>Years 3-5<br/>Independent contributor<br/>& team collaboration"]
    C["🎯 SENIOR<br/>$XXXk-XXXk<br/>Years 5-8<br/>Leadership & mentoring<br/>Strategic input"]
    D["🏆 PRINCIPAL/DIRECTOR<br/>$XXXk-XXXk+<br/>Years 8+<br/>Org-wide impact<br/>Vision setting"]
    
    A -->|"+X% annual"| B
    B -->|"+X% annual"| C
    C -->|"+X% annual"| D
    
    style A fill:#50C8E8,stroke:#2E8BA6,stroke-width:2px,color:#FFFFFF
    style B fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#FFFFFF
    style C fill:#9B59B6,stroke:#6C3483,stroke-width:2px,color:#FFFFFF
    style D fill:#5DD39E,stroke:#3AA76D,stroke-width:3px,color:#FFFFFF
~~~

---

## 📚 Skills Gap Analysis for Path #1

**Priority-Ranked Learning Path:**

| Priority | Skill Category | ✅ You Have | 📚 Must Develop | 🎯 Nice to Have | ⏱️ Timeline |
|----------|----------------|-------------|-----------------|----------------|-------------|
| **HIGH** | Technical Core | [Skills] | [Skills with specific courses/certs] | [Skills] | X months |
| **HIGH** | Domain Knowledge | [Skills] | [Skills with learning resources] | [Skills] | X months |
| **MEDIUM** | Soft Skills | [Skills] | [Skills with practice methods] | [Skills] | X months |
| **LOW** | Specialized Tools | [Skills] | [Skills] | [Skills] | X months |
| **TOTAL PREP** | — | — | — | — | **X months** |

**Recommended Learning Resources:**

**Technical Skills:**
- **[Skill 1]**: [Specific course/certification] - [Platform] - [Duration] - $[Cost]
- **[Skill 2]**: [Specific course/certification] - [Platform] - [Duration] - $[Cost]

**Domain Knowledge:**
- **[Area 1]**: [Specific resources/books] - [How to learn]
- **[Area 2]**: [Specific resources] - [Practice methods]

**Soft Skills:**
- **[Skill 1]**: [How to practice/develop]
- **[Skill 2]**: [Specific exercises/resources]

~~~mermaid
mindmap
  root(("🧭 Learning Priority Map<br/>Total: X months"))
    🔴 CRITICAL (Months 1-3)
      [Skill 1]<br/>[Specific cert/course]
      [Skill 2]<br/>[Specific training]
      [Skill 3]<br/>[Practice method]
    🟡 IMPORTANT (Months 4-6)
      [Skill 4]<br/>[Resource]
      [Skill 5]<br/>[Learning path]
      [Skill 6]<br/>[Development method]
    🟢 BENEFICIAL (Months 7-12)
      [Skill 7]<br/>[Optional cert]
      [Skill 8]<br/>[Nice to have]
~~~

---

[REPEAT SIMILAR DETAILED SECTIONS FOR PATHS #2, #3, AND #4]
[Each should include: Role Overview, Automation Resistance Analysis, Fit Analysis, Market Intelligence, Salary Progression, Skills Gap]

---

## 📊 Head-to-Head Comparison Matrix

| Factor | 🥇 Path #1 | 🥈 Path #2 | 🥉 Path #3 | 4️⃣ Path #4 |
|--------|-----------|-----------|-----------|-----------|
| **Match Score** | X/10 | X/10 | X/10 | X/10 |
| **Salary Range** | $XXX-XXXk | $XXX-XXXk | $XXX-XXXk | $XXX-XXXk |
| **Entry Timeline** | X months | X months | X months | X months |
| **Automation Risk** | LOW | LOW | LOW | MEDIUM |
| **10-Year Outlook** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Job Growth Rate** | +X% | +X% | +X% | +X% |
| **Current Openings** | X,XXX | X,XXX | X,XXX | X,XXX |
| **Remote Options** | XX% | XX% | XX% | XX% |
| **Skills Gap** | Small | Medium | Medium | Large |
| **Learning Investment** | $X,XXX | $X,XXX | $X,XXX | $X,XXX |
| **Geographic Flexibility** | High/Med/Low | High/Med/Low | High/Med/Low | High/Med/Low |
| **Entrepreneurial Potential** | High/Med/Low | High/Med/Low | High/Med/Low | High/Med/Low |

~~~mermaid
flowchart TD
    A["Choose Your Path"] --> B{"What Matters Most?"}
    
    B -->|"Highest Pay"| C["Path #X<br/>[Title]<br/>$XXXk-XXXk"]
    B -->|"Fastest Entry"| D["Path #X<br/>[Title]<br/>X months"]
    B -->|"Best Future-Proofing"| E["Path #X<br/>[Title]<br/>Lowest automation risk"]
    B -->|"Best Skill Match"| F["Path #X<br/>[Title]<br/>X/10 compatibility"]
    B -->|"Most Openings"| G["Path #X<br/>[Title]<br/>X,XXX jobs"]
    
    style A fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#FFFFFF
    style B fill:#9B59B6,stroke:#6C3483,stroke-width:3px,color:#FFFFFF
    style C fill:#FFD700,stroke:#B8860B,stroke-width:2px,color:#2C3E50
    style D fill:#50C8E8,stroke:#2E8BA6,stroke-width:2px,color:#FFFFFF
    style E fill:#5DD39E,stroke:#3AA76D,stroke-width:2px,color:#FFFFFF
    style F fill:#FF8C42,stroke:#C86A2F,stroke-width:2px,color:#FFFFFF
    style G fill:#BDC3C7,stroke:#7F8C8D,stroke-width:2px,color:#2C3E50
~~~

---

## 🎯 Your Personalized Transition Strategy

### Overall Timeline & Milestones

~~~mermaid
flowchart TD
    A["🔍 PHASE 1: Assessment<br/>Month 1<br/>Define goals & gaps"] --> B["📚 PHASE 2: Skill Building<br/>Months 2-8<br/>Targeted learning"]
    B --> C["💼 PHASE 3: Portfolio<br/>Months 7-10<br/>Build proof of work"]
    C --> D["🚀 PHASE 4: Job Search<br/>Months 10-12<br/>Applications & interviews"]
    D --> E["✅ PHASE 5: Transition<br/>Month 12+<br/>New role secured"]
    
    style A fill:#BDC3C7,stroke:#7F8C8D,stroke-width:2px,color:#2C3E50
    style B fill:#50C8E8,stroke:#2E8BA6,stroke-width:2px,color:#FFFFFF
    style C fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#FFFFFF
    style D fill:#FFD700,stroke:#B8860B,stroke-width:2px,color:#2C3E50
    style E fill:#5DD39E,stroke:#3AA76D,stroke-width:3px,color:#FFFFFF
~~~

### Detailed Phase Breakdown

| Phase | Timeline | Key Activities | Success Metrics | Budget |
|-------|----------|----------------|-----------------|--------|
| **Assessment** | Month 1 | Resume audit, skills inventory, research | Clear target role, learning plan | $0-100 |
| **Skill Building** | Months 2-8 | Courses, certifications, practice projects | 2-3 certs completed, 1 project | $500-2K |
| **Portfolio** | Months 7-10 | Build 2-3 showcase projects, document work | Public portfolio, case studies | $0-500 |
| **Job Search** | Months 10-12 | Apply, network, interview | 10+ applications, 5 interviews | $0-300 |
| **Transition** | Month 12+ | Negotiate, onboard, succeed | Offer accepted, smooth start | $0 |

---

## 🚀 30-Day Action Sprint

**Purpose:** Get immediate momentum and visible progress in your first month.

### Week 1: Foundation & Direction (Days 1-7)

**Daily Task Breakdown:**

| Day | Primary Task | Time | Output |
|-----|-------------|------|--------|
| **Day 1** | Complete skills self-assessment audit | 2 hrs | Skills inventory spreadsheet |
| **Day 2** | Research top 10 companies hiring for target role | 2 hrs | Company target list |
| **Day 3** | Update resume with skills-focused format | 3 hrs | Polished resume v1 |
| **Day 4** | Identify #1 priority certification/course | 2 hrs | Learning plan with enrollment |
| **Day 5** | Update LinkedIn profile for target role | 2 hrs | Optimized LinkedIn |
| **Day 6** | Join 2 relevant online communities/forums | 1 hr | Community memberships |
| **Day 7** | Review week, plan next steps | 1 hr | Week 1 completion checklist |

### Week 2: Learning Launch (Days 8-14)

| Day | Primary Task | Time | Output |
|-----|-------------|------|--------|
| **Day 8** | Start primary course/certification | 3 hrs | First module completed |
| **Day 9** | Read 3 industry articles, take notes | 1.5 hrs | Learning notes |
| **Day 10** | Practice new skill with hands-on exercise | 2 hrs | Exercise completed |
| **Day 11** | Continue course, complete next module | 3 hrs | Module 2 completed |
| **Day 12** | Outline first portfolio project idea | 2 hrs | Project brief |
| **Day 13** | Connect with 5 people in target role on LinkedIn | 1 hr | 5 new connections |
| **Day 14** | Review progress, adjust learning plan | 1 hr | Week 2 checklist |

### Week 3: Visibility & Network Building (Days 15-21)

| Day | Primary Task | Time | Output |
|-----|-------------|------|--------|
| **Day 15** | Write LinkedIn post about learning journey | 1.5 hrs | Published post |
| **Day 16** | Attend virtual meetup/webinar in target field | 2 hrs | 2-3 new contacts |
| **Day 17** | Send personalized outreach to 3 professionals | 1.5 hrs | 3 emails sent |
| **Day 18** | Start building first portfolio project | 3 hrs | Project foundation |
| **Day 19** | Continue course work | 2 hrs | Next modules completed |
| **Day 20** | Research and document 5 job descriptions | 2 hrs | JD analysis document |
| **Day 21** | Weekly review and planning | 1 hr | Week 3 checklist |

### Week 4: Application Preparation (Days 22-30)

| Day | Primary Task | Time | Output |
|-----|-------------|------|--------|
| **Day 22** | Create tailored resume for top target role | 2.5 hrs | Role-specific resume |
| **Day 23** | Draft cover letter template | 2 hrs | Cover letter template |
| **Day 24** | Apply to 2 target positions | 2 hrs | 2 applications submitted |
| **Day 25** | Continue portfolio project work | 3 hrs | Visible progress |
| **Day 26** | Schedule informational interview | 1.5 hrs | 1 interview scheduled |
| **Day 27** | Research and prep for informational interview | 2 hrs | Interview prep doc |
| **Day 28** | Apply to 3 more positions | 2.5 hrs | 3 applications submitted |
| **Day 29** | Reflect on 30 days, document learnings | 2 hrs | Progress report |
| **Day 30** | Plan next 30 days with refined strategy | 2 hrs | 60-day roadmap |

~~~mermaid
gantt
    title 30-Day Sprint Timeline
    dateFormat YYYY-MM-DD
    
    section Week 1: Foundation
    Skills Audit & Research        :2025-01-01, 3d
    Resume & Profile Updates       :2025-01-04, 3d
    Planning & Setup               :2025-01-07, 1d
    
    section Week 2: Learning
    Course Launch                  :2025-01-08, 4d
    Skill Practice                 :2025-01-12, 2d
    Week Review                    :2025-01-14, 1d
    
    section Week 3: Networking
    Content Creation               :2025-01-15, 2d
    Outreach & Events              :2025-01-17, 3d
    Portfolio Start                :2025-01-20, 1d
    Week Review                    :2025-01-21, 1d
    
    section Week 4: Applications
    Resume Tailoring               :2025-01-22, 2d
    Job Applications               :2025-01-24, 5d
    Planning Next Phase            :2025-01-29, 2d
~~~

**30-Day Sprint Success Metrics:**
- ✅ 1 course/certification started (min 25% completed)
- ✅ 5+ job applications submitted
- ✅ 10+ new professional connections
- ✅ 1 portfolio project started
- ✅ 1 informational interview completed
- ✅ Updated resume and LinkedIn profile
- ✅ Clear 60-day roadmap created

---

## 💼 Offer-Getting Scripts & Templates

### Email Outreach Template (Cold Contact)

**Subject Line:** [Target Role] | [Your Name] | [Key Differentiator]

**Email Body:**

Hi [Name],

I hope this message finds you well. I discovered your work at [Company] through [specific source], and I am particularly impressed by [specific project/achievement].

I am a [current role] with [X years] experience in [relevant area], and I am transitioning into [target role]. My background in [specific skill/achievement] has prepared me to contribute to [specific company goal or challenge].

I noticed [Company] is [hiring/working on specific initiative], and I believe my expertise in [key skill] could add value to your team. I have recently [completed certification/built project] in [relevant area], and I am eager to apply these skills in [specific context].

Would you be open to a brief 15-minute conversation about your experience at [Company] and any advice you might have for someone making this transition?

Thank you for considering my request.

Best regards,
[Your Name]
[LinkedIn Profile URL]
[Portfolio URL if applicable]

---

### Recruiter Outreach Template

**Subject Line:** [Job Title] Application - [Your Name] - [Key Qualification]

**Email Body:**

Dear [Recruiter Name],

I am writing to express my strong interest in the [Job Title] position at [Company]. With [X years] of experience in [relevant field] and recent expertise in [key skill for role], I am excited about the opportunity to contribute to [specific company initiative or team].

**Key qualifications:**
- [Specific achievement with metric]
- [Relevant certification or skill]
- [Unique value proposition aligned with job description]

In my current role as [current position], I have [specific accomplishment that mirrors job requirements]. I am particularly drawn to [Company] because of [specific reason related to company mission/culture/projects].

I have attached my resume for your review. I would welcome the opportunity to discuss how my experience in [relevant area] aligns with your team needs.

Are you available for a brief call next week?

Best regards,
[Your Name]
[Phone] | [Email] | [LinkedIn]

---

### Networking Coffee Chat Request

**Subject Line:** Quick Question About [Their Role/Company]

**Email Body:**

Hi [Name],

I came across your profile while researching [target role/industry], and I was really impressed by your career path from [previous role] to [current role].

I am currently a [your role] looking to transition into [target field], and I am particularly interested in [specific aspect of their work]. Your experience with [specific project or skill] is exactly the kind of path I am hoping to pursue.

Would you be open to a 20-minute virtual coffee chat? I would love to hear about:
- How you made the transition into [their role]
- What skills proved most valuable
- Any advice for someone starting this journey

I am happy to work around your schedule and would be grateful for any insights you can share.

Thanks for considering!

[Your Name]
[LinkedIn URL]

---

### Follow-Up After Application Template

**Subject Line:** Following Up: [Job Title] Application

**Email Body:**

Hi [Hiring Manager/Recruiter Name],

I hope this email finds you well. I applied for the [Job Title] position on [date] and wanted to follow up to reiterate my strong interest in joining [Company].

Since submitting my application, I have [completed relevant project/certification/achievement that is relevant]. This experience has further confirmed my enthusiasm for [specific aspect of the role].

I am particularly excited about [specific project/initiative mentioned in job description] because [reason that shows you understand their needs].

I would welcome the opportunity to discuss how my background in [relevant skill] and recent work in [relevant project] could contribute to your team success.

Are you available for a brief conversation next week?

Thank you for your consideration.

Best regards,
[Your Name]
[Contact Info]

---

### Salary Negotiation Scripts

**Initial Offer Response (When Offer is Below Target):**

Thank you so much for the offer! I am really excited about the opportunity to join [Company] and contribute to [specific team/project].

I have given the compensation package careful consideration, and based on my research of [role title] positions in [location] with my level of experience, as well as the scope of responsibilities we discussed, I was anticipating a base salary in the range of $[X amount] to $[Y amount].

Given my [specific qualifications: X years experience, recent certification, unique skill combination], I believe this range would better reflect the value I will bring to the team.

Is there flexibility to adjust the base salary closer to this range?

---

**Negotiating Beyond Base Salary:**

I appreciate you working with me on the base salary. While I understand that is at the top of the range for this level, I would like to discuss other components of the package.

Would there be room to enhance the offer through:
- **Signing bonus**: To help offset transition costs
- **Stock/Equity**: Additional RSU grant or earlier vesting schedule  
- **Performance bonus**: Higher target percentage
- **Professional development**: Budget for certifications/conferences
- **Remote work**: Additional flexibility or home office stipend

I am committed to making this work and excited about the role. Which of these areas might have some flexibility?

---

**Accepting with Enthusiasm:**

Thank you for working with me on this! I am thrilled to accept the offer and join the team.

I am excited to start on [date] and begin contributing to [specific project/goal]. Please send over the formal offer letter and any onboarding materials.

I am looking forward to working with you and the team!

Best regards,
[Your Name]

---

### Interview Preparation Script

**"Tell Me About Yourself" Framework:**

I am a [current role] with [X years] experience specializing in [key area]. Most recently, I have been at [Company] where I [key achievement with metric].

What excites me about [target role] is the opportunity to [specific aspect that aligns with job]. I have been building my expertise in this direction through [recent learning/project], which resulted in [specific outcome].

I am particularly drawn to [Company] because [specific reason related to their work/mission], and I believe my background in [relevant skill] combined with my passion for [relevant area] would allow me to contribute to [specific team goal].

I am excited to discuss how I can help [Company] achieve [specific objective].

---

**STAR Method for Behavioral Questions:**

**Question Example: "Tell me about a time you overcame a significant challenge."**

**Situation**: In my role as [role] at [company], we were tasked with [context]. The challenge was [specific obstacle].

**Task**: I was responsible for [your specific responsibility], and the goal was to [desired outcome].

**Action**: I approached this by [specific actions you took]:
- First, I [action 1]
- Then, I [action 2]  
- Finally, I [action 3]

**Result**: As a result, we [specific measurable outcome]. This led to [broader impact], and I learned [key takeaway].

---

## 🏢 Top Employers & Application Strategies

### Path #1: [Career Title] - Top Hiring Companies

| Company | Locations | Why They Are Hiring | Application Tips |
|---------|-----------|-------------------|------------------|
| [Company 1] | [Cities] | [Specific growth area/project] | Apply directly, emphasize [skill] |
| [Company 2] | [Cities] | [Specific initiative] | Referral preferred, network via [method] |
| [Company 3] | [Cities] | [Market expansion] | Strong portfolio essential |
| [Company 4] | [Cities] | [Technology investment] | Technical assessment likely |
| [Company 5] | [Cities] | [Team growth] | Culture fit emphasized |

**Industry Hot Spots:**
- [Industry 1]: [Why they are hiring, key companies]
- [Industry 2]: [Growth drivers, opportunities]
- [Industry 3]: [Emerging needs, target companies]

**Geographic Demand:**
- **[City 1]**: [Number] of openings, avg salary $[X]k, top employers [list]
- **[City 2]**: [Number] of openings, avg salary $[X]k, top employers [list]  
- **[City 3]**: [Number] of openings, avg salary $[X]k, top employers [list]
- **Remote**: [Percentage] of roles, competitive markets [details]

### Application Strategy by Company Type

**Startups (Seed to Series B):**
- ✅ Faster hiring process (2-3 weeks)
- ✅ More flexible on exact qualifications
- ⚠️ Higher risk, potentially lower initial salary
- 🎯 Strategy: Emphasize adaptability, show entrepreneurial mindset, focus on potential equity upside

**Mid-Size Companies (Series C+):**
- ✅ Balance of structure and growth
- ✅ Good learning opportunities
- 🎯 Strategy: Highlight ability to scale, show understanding of their growth stage challenges

**Enterprise (Public Companies):**
- ✅ Stability, benefits, established career paths
- ⚠️ Slower hiring (4-8 weeks)
- ⚠️ More rigid requirements
- 🎯 Strategy: Meet all listed requirements, emphasize process/scale experience, prepare for multiple interview rounds

---

## 📊 Complete Source List & References

### Labor Market Data
[1] U.S. Bureau of Labor Statistics - Occupational Outlook Handbook (2024-2025)
    URL: [specific URL]
    Data: Job growth projections, employment statistics

[2] LinkedIn Economic Graph & Talent Insights (November 2025)
    URL: [specific URL]  
    Data: Active job postings, skills demand trends

[3] Glassdoor Salary Data & Payscale Reports (2025)
    URL: [specific URLs]
    Data: Salary ranges by experience level, geographic compensation

[4] FlexJobs Remote Work Statistics (2025)
    URL: [specific URL]
    Data: Remote work availability by role type

[5] Indeed Hiring Lab Reports (Q4 2025)
    URL: [specific URL]
    Data: Industry hiring trends, employer demand

### Automation & Future of Work Research  
[6] McKinsey Global Institute - "The Future of Work in [Year]"
    URL: [specific URL]
    Data: Automation displacement risk analysis

[7] World Economic Forum - "Future of Jobs Report [Year]"
    URL: [specific URL]
    Data: Emerging roles, declining occupations, skills gap analysis

[8] MIT Work of the Future Task Force
    URL: [specific URL]
    Data: Technology impact on employment

[9] Brookings Institution - "Automation and Artificial Intelligence"
    URL: [specific URL]
    Data: Which jobs are most at risk

### Industry-Specific Research
[10] Gartner Technology Trends (2025)
     URL: [specific URL]
     Data: Technology adoption curves, enterprise spending

[11] [Industry-Specific Report]
     URL: [specific URL]
     Data: [Specific data used]

[Continue with all sources used, numbering to 25+]

### Certification & Learning Resources Referenced
[X] [Certification Name] - [Provider]
    URL: [specific URL]
    Cost: $[X], Duration: [X months]

[Continue listing all learning resources mentioned]

---

## 🎯 Final Recommendations & Next Steps

### Your Optimal Path Forward

Based on comprehensive analysis of your profile, the job market, and future trends, here is your recommended path:

**Primary Focus: [Path #1 Title]**
- **Why this path**: [2-3 sentences on why it is optimal]
- **Timeline to entry**: [X months] with focused effort
- **First 3 actions**:
  1. [Specific action with deadline]
  2. [Specific action with deadline]
  3. [Specific action with deadline]

**Backup Option: [Path #2 Title]**
- **When to consider**: [Circumstances that make this preferable]
- **Key difference**: [How it differs from primary path]

### Success Mindset for Career Transition

**Remember:**
- 📈 **Transitions take time**: Average successful career pivot is [X] months
- 🎯 **Focus on progress, not perfection**: Small consistent actions compound
- 🤝 **Network actively**: [X]% of jobs are filled through connections
- 💪 **Leverage your uniqueness**: Your cross-functional background is an asset
- 🔄 **Stay adaptable**: Be willing to adjust your approach based on feedback

### Red Flags to Watch For

**During Job Search:**
- ⚠️ Companies with chronic turnover in target role
- ⚠️ Unclear growth paths or promotion criteria
- ⚠️ Unrealistic expectations for entry-level in new field
- ⚠️ Compensation significantly below market rate without justification

**During Transition:**
- ⚠️ Overinvesting in certifications before testing market fit
- ⚠️ Applying broadly without tailoring approach  
- ⚠️ Neglecting current role performance (maintain references)
- ⚠️ Burning out from trying to do everything at once

### Your 90-Day Roadmap Summary

**Days 1-30**: Foundation (Skills audit, learning launch, initial networking)
**Days 31-60**: Building (Certification progress, portfolio creation, active applications)
**Days 61-90**: Momentum (Interview prep, offer negotiation, transition planning)

~~~mermaid
gantt
    title Your 90-Day Transition Roadmap
    dateFormat YYYY-MM-DD
    
    section Month 1: Foundation
    Assessment & Planning          :2025-01-01, 7d
    Learning Launch               :2025-01-08, 14d
    Initial Networking            :2025-01-15, 9d
    
    section Month 2: Building
    Certification Progress        :2025-02-01, 20d
    Portfolio Development         :2025-02-10, 18d
    Active Applications           :2025-02-21, 7d
    
    section Month 3: Momentum
    Interview Preparation         :2025-03-01, 10d
    Interview Rounds              :2025-03-11, 12d
    Offer Negotiation            :2025-03-23, 7d
    Transition Planning          :2025-03-30, 2d
~~~

---

## 📞 Additional Support & Resources

### Communities to Join
- **[Platform 1]**: [Specific community] - [Why it is valuable]
- **[Platform 2]**: [Specific group] - [Focus area]
- **[Platform 3]**: [Specific forum] - [Best for]

### Books & Podcasts
- 📚 "[Book Title]" by [Author] - [Why relevant]
- 🎧 "[Podcast Name]" - [Best episodes for your path]

### Career Coaches & Mentorship
- Consider working with a career coach specializing in [field] if budget allows ($[X]-[X] per session)
- Seek mentorship through [specific platform or method]

---

**🎯 You Are Ready to Begin**

You now have a comprehensive, data-backed roadmap for your career transition. The paths are clear, the steps are actionable, and the future is automation-resistant.

**Your next action**: Complete Day 1 of the 30-Day Sprint (Skills Self-Assessment) today.

**Remember**: Career transitions are marathons, not sprints. Stay consistent, trust the process, and adjust based on feedback.

**Good luck with your journey!**

---

*Report generated on ${date}*  
*Analysis based on 30+ verified sources*  
*Next recommended update: [3 months from date]*

---

END OF FULL REPORT

**OUTPUT FORMAT:**

Return ONLY this JSON structure (no markdown fences):

{
  "reportPreview": "[complete preview markdown with ~~~ for mermaid]",
  "finalReport": "[complete report markdown with ~~~ for mermaid]"
}

**CRITICAL FINAL REMINDERS:**
1. Use ~~~ (triple tildes) for ALL mermaid diagrams - ensures JSON and PDF compatibility
2. Be generous with timelines - always use upper bound only (no ranges)
3. Keep diagrams clear and not overly complex for PDF rendering
4. Focus heavily on automation resistance and future trends
5. Make every action item specific and immediately actionable
6. Maintain 50/50 text-to-visual balance throughout
7. Use hex color palette consistently across all diagrams
8. Ensure all salary and market data is sourced and cited
9. Make the 30-day sprint as detailed and prescriptive as possible
10. Professional, encouraging, data-driven tone throughout
`;