# MVP Milestones & Sprint Plan

This document outlines the milestones and a sample sprint plan for building the MVP.

## Milestones

*   **Milestone 1: Core Infrastructure & Data Pipeline (End of Sprint 2)**
    *   Database schema is finalized and implemented.
    *   Data processing pipeline is functional for ingesting and processing reports.
    *   Core API endpoints are in place.
*   **Milestone 2: Manager Dashboard & Employee Snapshot (End of Sprint 4)**
    *   The manager dashboard is implemented with key analytics.
    *   The employee skill snapshot page is fully functional.
    *   Onboarding flow for new companies is complete.
*   **Milestone 3: Advanced Features & Beta Launch (End of Sprint 6)**
    *   Training ROI panel and Talent Bench Strength features are complete.
    *   The platform is ready for a closed beta with a select group of customers.

## Sprint Plan (2-week sprints)

### Sprint 1: Foundation & Setup

*   **Goal:** Set up the project, finalize the tech stack, and implement the core database schema.
*   **Tasks:**
    *   Initialize Next.js project.
    *   Set up PostgreSQL database with `pgvector`.
    *   Implement the initial database schema using Drizzle ORM.
    *   Set up authentication.

### Sprint 2: Data Pipeline

*   **Goal:** Build the data pipeline for ingesting and processing reports.
*   **Tasks:**
    *   Create an API endpoint for report ingestion.
    *   Implement the LLM extraction logic.
    *   Build the normalization and storage steps.
    *   Set up background jobs for the pipeline.

### Sprint 3: Core APIs & Employee Snapshot UI

*   **Goal:** Build the core APIs and the UI for the employee skill snapshot.
*   **Tasks:**
    *   Implement the API endpoints for employees and teams.
    *   Create the front-end components for the `EmployeeSkillSnapshot` page.
    *   Connect the UI to the APIs.

### Sprint 4: Manager Dashboard

*   **Goal:** Build the manager dashboard.
*   **Tasks:**
    *   Implement the analytics engine and materialized views.
    *   Create the UI components for the `TeamOverviewDashboard`.
    *   Integrate the dashboard with the analytics APIs.

### Sprint 5: Onboarding & Training ROI

*   **Goal:** Implement the company onboarding flow and the Training ROI panel.
*   **Tasks:**
    *   Build the UI for org chart uploads.
    *   Implement the logic for mapping employees to reports.
    *   Create the `TrainingROIPanel` component and its corresponding APIs.

### Sprint 6: Talent Bench & Beta Prep

*   **Goal:** Build the Talent Bench Strength feature and prepare for beta launch.
*   **Tasks:**
    *   Implement the `TalentBenchStrength` component.
    *   Conduct end-to-end testing.
    *   Gather feedback from internal stakeholders.
    *   Prepare documentation for beta users.
