# GoCareerPath

AI research agent that finds 4 well-paying, automation-complementary roles you can pivot to without resetting your career, and gives step-by-step resources to get there.

---

## Overview

GoCareerPath is a research-first AI agent that scans web search and knowledge sources, compresses findings, and outputs a focused final report listing four practical career pivots tailored to the user's background. It prioritizes roles that are complementary to automation and provides step-by-step learning and job-transition resources.

Core capabilities:

* Multi-provider LLM support via `init_chat_model()` (configurable in LangGraph Studio).
* Structured research pipeline: summarization → research → compression → final report.
* Pluggable search API support (default: Tavily) and full MCP compatibility.
* Deployable as a web app (Vercel) with LangGraph Studio UI for control.

---

## Tech stack

* Node.js, Next.js, React
* LangChain-style orchestration (LangGraph)
* LLM providers: OpenAI (gpt-4.1, gpt-4.1-mini), Anthropic/Gemini, other providers via `init_chat_model()`
* Search: Tavily (default), native web search integrations for Anthropic/OpenAI, MCP servers
* Hosting: Vercel (web app)

---

## How it works (high level)

1. **User input** — background, skills, role preferences.
2. **Search / Research** — research agent queries configured search tools (Tavily, web search, MCP).
3. **Summarization** — summarizer model digests search results (default: `openai:gpt-4.1-mini`).
4. **Research pass** — primary compound research using designated research model (default: `openai:gpt-4.1`).
5. **Compression** — compress findings for concise evidence (default: `openai:gpt-4.1`).
6. **Final report** — structured output: 4 role suggestions + rationale + step-by-step resources (default: `openai:gpt-4.1`).

> Note: models must support structured outputs and tool-calling.

---

## Default model roles

* **Summarization:** `openai:gpt-4.1-mini` — condense search results
* **Research:** `openai:gpt-4.1` — power the search agent and deeper reasoning
* **Compression:** `openai:gpt-4.1` — compress intermediate findings
* **Final Report:** `openai:gpt-4.1` — generate the actionable final report

You can override these with any provider supported by `init_chat_model()` in LangGraph Studio.

---

## Search API & Tooling

* Default: **Tavily** search API
* Native web search adapters for Anthropic and OpenAI
* Full **MCP** compatibility for custom servers and enterprise data sources
* Add new search tools by implementing the search adapter interface used by the research agent

---

## Quickstart (developer)

```bash
# clone
git clone <repo-url>
cd go-career-path

# install
npm install

# env
cp .env.example .env
# set LLM_PROVIDER, LLM_API_KEY, TAVILY_API_KEY, MCP_ENDPOINT, NEXT_PUBLIC_VERCEL_URL, etc.

# dev
npm run dev        # Next.js dev server

# build + start
npm run build
npm run start
```

---

## Configuration (important keys)

* `LLM_PROVIDER` — provider id used by `init_chat_model()`
* `LLM_API_KEY` — API key for chosen provider
* `TAVILY_API_KEY` — Tavily search API key (if using default search)
* `MCP_ENDPOINT` — optional MCP server endpoint for enterprise search
* `NEXT_PUBLIC_SITE_URL` — Vercel/site URL for callbacks
* `RESEARCH_AGENT_CONFIG` — agent-specific timeouts, tool settings, and output schema

Ensure chosen models support:

* Structured output (JSON schema output)
* Tool calling (if using tool-enabled reasoning)

---

## Usage (end-user)

* Via LangGraph Studio UI: configure model, run the research workflow, view the final report.
* Via web app: Input background → run agent → download or view final report with role suggestions and stepwise resources.

---

## Output schema (example)

```json
{
  "report_version": "1.0",
  "candidate_roles": [
    {
      "title": "Role A",
      "monthly_pay_estimate": "range",
      "why_it_fits": "rationale",
      "skills_to_build": ["skill1","skill2"],
      "learning_path": ["link1","link2"],
      "first_step": "actionable step"
    }
  ],
  "confidence_scores": { "Role A": 0.87 },
  "sources": ["url1","url2"],
  "timestamp": "2025-11-03T00:00:00Z"
}
```

Agents should output JSON matching your configured schema.

---

## Best practices & tips

* Use stronger research models (e.g. `gpt-4.1`) for browsing and tool-enabled passes.
* Constrain token budgets for summarization/compression to keep costs predictable.
* Provide the agent with explicit role constraints (seniority, remote/on-site, industry) for targeted outputs.
* Validate final resource links programmatically or via an automated checker before presenting as canonical guidance.

---

## Roadmap

* Fine-tune recommended learning tracks by industry and seniority.
* Add resume/CV tailoring generator tied to selected pivot role.
* Integrate verified course catalog & micro-credential connectors (Coursera, edX, LinkedIn Learning).
* Expand MCP adapters for enterprise/private knowledge graphs.

---

## Contributing

* Fork, branch, and open PRs for feature work.
* Implement new search adapters under `/packages/search-adapters`.
* Add model provider connectors via `init_chat_model()` extensions.
* Follow project linting, testing, and PR guidelines in CONTRIBUTING.md.

---

## License

MIT (or choose your preferred license)

---

## Tags

AI career-pivot LLM research-agent LangGraph Next.js React Node.js Tavily MCP Vercel RAG career-advice automation-resistant

---

## ABOUT (short, for portfolio / GitHub)

GoCareerPath is an AI research agent that identifies four high-value, automation-resistant career pivots tailored to a user's background and provides step-by-step learning and job-transition resources. Built with Next.js, LangGraph integrations, and multi-provider LLM support, it combines web search (Tavily/MCP) and structured LLM reasoning to produce concise, actionable final reports suitable for professionals who want a practical, non-disruptive pivot path.

Best regards,
Bryant Mejia
