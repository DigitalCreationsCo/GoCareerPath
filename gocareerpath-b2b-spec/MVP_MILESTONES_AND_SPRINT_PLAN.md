# MVP Milestones & Sprint Plan

## 1. Introduction

This document outlines the milestones and a high-level sprint plan for the development of the GoCareerPath B2B platform MVP. The plan is based on two-week sprint cycles.

## 2. High-Level Milestones

*   **Milestone 1: Foundation & Data Pipeline (Sprints 1-2)**
    *   **Goal:** Set up the core infrastructure and build the data processing pipeline.
    *   **Deliverable:** A functioning pipeline that can ingest a career report, process it, and store the structured data in the database.
*   **Milestone 2: Core Features & APIs (Sprints 3-4)**
    *   **Goal:** Develop the backend APIs and the core manager-facing features.
    *   **Deliverable:** A set of working API endpoints and a basic frontend that can display the Team Dashboard and Employee Snapshot.
*   **Milestone 3: Polish & Onboarding (Sprints 5-6)**
    *   **Goal:** Refine the UI/UX, implement the onboarding flow, and prepare for a beta launch.
    *   **Deliverable:** A polished, end-to-end application that is ready for initial customer testing.

## 3. Sprint Plan

### Sprint 1: Infrastructure & Data Model

*   **Goal:** Set up the project, CI/CD, and database schema.
*   **Tasks:**
    *   Initialize Next.js and Node.js projects.
    *   Set up Vercel for deployment.
    *   Provision a PostgreSQL database.
    *   Implement the database schema (all tables).
    *   Set up basic authentication (user registration and login).

### Sprint 2: Data Pipeline

*   **Goal:** Build the end-to-end data processing pipeline.
*   **Tasks:**
    *   Create the data ingestion service.
    *   Set up a job queue.
    *   Implement the report processing worker.
    *   Integrate with the LLM provider for data extraction.
    *   Build the normalization and storage logic.

### Sprint 3: Backend & APIs

*   **Goal:** Develop the core API endpoints.
*   **Tasks:**
    *   Implement the `/teams/:id/snapshot` endpoint.
    *   Implement the `/employees/:id/skill-profile` endpoint.
    *   Implement the `/employees/:id/projection` endpoint.
    *   Write unit and integration tests for the APIs.

### Sprint 4: Frontend - Core Views

*   **Goal:** Build the main dashboard and employee snapshot views.
*   **Tasks:**
    *   Build the main application layout and navigation.
    *   Develop the `TeamOverviewDashboard` component.
    *   Develop the `SkillHeatmap` and other dashboard cards.
    *   Develop the `EmployeeSkillSnapshot` component.
    *   Integrate the frontend views with the APIs.

### Sprint 5: Analytics & Onboarding

*   **Goal:** Implement the analytics and onboarding features.
*   **Tasks:**
    *   Create the materialized views for the analytics engine.
    *   Implement the `/analytics/*` endpoints.
    *   Build the `TrainingROIPanel` and other analytics components.
    *   Develop the `OrgChartUploader` and `EmployeeReportMapper` components for onboarding.

### Sprint 6: Polish, Testing & Deployment

*   **Goal:** Finalize the application and prepare for launch.
*   **Tasks:**
    *   Conduct end-to-end testing.
    *   Perform UI/UX review and make necessary adjustments.
    *   Implement comprehensive error handling and logging.
    *   Prepare deployment scripts and documentation.
    *   Deploy to production for a limited beta release.
