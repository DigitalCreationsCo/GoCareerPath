# Technical Requirements Document (TRD)

## 1. Introduction

This document outlines the technical requirements for the GoCareerPath B2B Upskilling & Internal Mobility Intelligence Platform. It serves as a guide for the engineering team to build a scalable, secure, and maintainable system.

## 2. Technology Stack

*   **Frontend:** Next.js (React) with TypeScript
*   **Backend:** Node.js with TypeScript (Next.js API Routes or standalone service)
*   **Database:** PostgreSQL with the `pgvector` extension for embeddings.
*   **Data Processing:** A combination of serverless functions (e.g., Vercel Functions, AWS Lambda) and background jobs for ingesting and processing reports.
*   **LLM Provider:** OpenAI (GPT-4 or newer) for data extraction and analysis.
*   **Deployment:** Vercel for the frontend and serverless functions; AWS or similar for database and background workers if needed.

## 3. System Components

### 3.1. Data Pipeline

The data pipeline is responsible for ingesting, processing, and storing data from consumer career reports.

*   **Ingestion:**
    *   An endpoint to receive raw career reports (text + JSON).
    *   Reports will be stored in a raw format in a designated storage location (e.g., `raw_reports` table or S3 bucket).
*   **Processing:**
    *   **Embedding Generation:** Generate vector embeddings for relevant sections of the reports using `pgvector`.
    *   **LLM Extraction:** Use LLM prompts to extract structured data from the reports. The extracted fields include:
        *   `skills` (normalized to a predefined taxonomy)
        *   `skill_gap_score`
        *   `roadmap`
        *   `time_to_mastery`
        *   `uplift_projection`
        *   `automation_risk`
        *   `promotion_timeline`
        *   `recommended_roles`
    *   **Normalization & Storage:** Store the normalized, structured data in the PostgreSQL database across the following tables: `employees`, `skills`, `employee_skills`, `roadmaps`, `snapshots`, `teams`, `org_charts`, `training_events`.

### 3.2. Snapshot Engine

The snapshot engine is responsible for generating and updating skill snapshots for each employee.

*   **Trigger:** A new snapshot will be generated automatically whenever a new career report is ingested for an employee.
*   **Time-Series Deltas:** The system must support calculating deltas between snapshots over 30, 60, and 90-day intervals.
*   **Computed Metrics:** The engine will compute the following metrics:
    *   `skill_gap_delta`
    *   `uplift_delta`
    *   `roadmap_progress_delta`
    *   `promotion_timeline_shift`

### 3.3. Analytics Engine

The analytics engine will provide aggregated insights for teams and the organization.

*   **Materialized Views:** Use materialized views in PostgreSQL to pre-calculate and store analytics data for performance.
*   **Key Metrics:** The engine will generate the following indices and heatmaps:
    *   `team_skill_heatmap`
    *   `promotion_readiness_index`
    *   `attrition_risk_index`
    *   `training_roi`

### 3.4. APIs

A set of RESTful APIs will expose the platform's data and functionality.

*   **Authentication:** All endpoints must be secured and require authentication (e.g., JWT-based).
*   **Endpoints:**
    *   `/teams/:id/snapshot`: Get the latest skill snapshot for a team.
    *   `/employees/:id/skill-profile`: Get the detailed skill profile for an employee.
    *   `/employees/:id/projection`: Get the AI-driven projections for an employee.
    *   `/analytics/team`: Get team-level analytics.
    *   `/analytics/org`: Get organization-level analytics.
    *   `/import/org-chart`: An endpoint to upload the organizational chart (CSV).

## 4. Non-Functional Requirements

*   **Security:**
    *   Data must be encrypted at rest and in transit.
    *   Implement role-based access control (RBAC) to ensure managers can only view data for their direct reports.
    *   Protect against common web vulnerabilities (e.g., SQL injection, XSS).
*   **Scalability:**
    *   The system should be designed to handle a growing number of users, reports, and data points.
    *   Use serverless and managed services where possible to enable auto-scaling.
*   **Performance:**
    *   API response times should be under 200ms for most requests.
    *   The frontend should be responsive and provide a smooth user experience.
    *   Use caching strategies to minimize database load.
*   **Data Integrity:**
    *   Ensure data consistency and accuracy through proper validation and transaction management.
