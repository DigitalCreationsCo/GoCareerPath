# Data Processing Pipeline

## 1. Introduction

This document describes the data processing pipeline for the GoCareerPath B2B platform. The pipeline is designed to be a series of sequential, idempotent steps that transform raw career reports into structured, queryable data.

## 2. Pipeline Overview

The pipeline is triggered when a new career report is uploaded. It consists of the following high-level stages:

1.  **Ingestion:** Receive and store the raw report.
2.  **Queuing:** Add a processing job to a queue.
3.  **Extraction:** Use an LLM to extract structured data.
4.  **Normalization & Storage:** Normalize the extracted data and store it in the database.
5.  **Snapshot Generation:** Generate or update the employee's skill snapshot.

## 3. Pipeline Stages in Detail

### Stage 1: Ingestion

*   **Trigger:** An HTTP POST request to the `/import/report` endpoint (or a similar mechanism).
*   **Process:**
    1.  The ingestion service receives the raw report (text and/or JSON).
    2.  The report is associated with an `employee_id`.
    3.  The raw report is saved to the `raw_reports` table, along with the `employee_id`.
    4.  A job is enqueued for processing, containing the `report_id`.
*   **Technology:** Serverless function (e.g., Vercel Function, AWS Lambda).

### Stage 2: Queuing

*   **Purpose:** To decouple the ingestion from the processing and to handle backpressure.
*   **Process:**
    1.  The ingestion service pushes a message to a queue (e.g., SQS, Redis queue).
    2.  The message contains the `report_id` that needs to be processed.
*   **Technology:** A managed queueing service is recommended for reliability.

### Stage 3: Extraction

*   **Trigger:** A worker process polls the queue for new jobs.
*   **Process:**
    1.  The worker retrieves a `report_id` from the queue.
    2.  It fetches the raw report content from the `raw_reports` table.
    3.  It generates a vector embedding of the report content and saves it back to the `raw_reports` table.
    4.  It calls the LLM provider with the prompts defined in `LLM_EXTRACTION_PROMPTS.md`.
    5.  The LLM returns a JSON object containing the extracted skills, projections, and roadmap.
*   **Technology:** A background job runner (e.g., a separate Node.js service, AWS Lambda).

### Stage 4: Normalization & Storage

*   **Process:**
    1.  The worker process takes the JSON output from the LLM.
    2.  **Skills:**
        *   For each extracted skill, it checks if the skill exists in the `skills` taxonomy table. If not, it adds it.
        *   It inserts or updates the `employee_skills` table with the `employee_id`, `skill_id`, and `proficiency_level`.
    3.  **Snapshot & Roadmap:**
        *   It creates a new record in the `snapshots` table with the extracted projections.
        *   It creates a new record in the `roadmaps` table with the recommended role and steps.
*   **Data Integrity:** All database operations within this stage should be performed in a single transaction to ensure atomicity.

### Stage 5: Snapshot Generation & Analytics Update

*   **Trigger:** A successful transaction in Stage 4.
*   **Process:**
    1.  A database trigger or an event-driven mechanism initiates the snapshot engine.
    2.  The snapshot engine calculates the time-series deltas (30/60/90 days) for the employee's projections.
    3.  The relevant materialized views for analytics (e.g., `team_skill_heatmap`) are refreshed to include the new data.
*   **Technology:** PostgreSQL triggers or a pub/sub mechanism.

## 4. Error Handling

*   **Retries:** The worker process should implement a retry mechanism with exponential backoff for transient errors (e.g., LLM API failures).
*   **Dead-Letter Queue:** If a job fails after multiple retries, it should be moved to a dead-letter queue for manual inspection.
*   **Logging:** Comprehensive logging should be implemented at each stage of the pipeline to facilitate debugging.
