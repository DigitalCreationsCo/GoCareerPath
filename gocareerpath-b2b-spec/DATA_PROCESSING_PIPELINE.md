# Data Processing Pipeline

This document outlines the steps involved in processing raw career reports and transforming them into structured, actionable data.

## 1. Ingestion

*   **Trigger:** The pipeline is triggered when a new career report is uploaded for an employee. This can be done via an API endpoint or a manual process.
*   **Action:** The raw report (text and/or JSON) is saved to a storage location (e.g., `raw_reports` table or an S3 bucket). A new entry is created in the `raw_reports` table with a reference to the employee.

## 2. Pre-processing & Embedding

*   **Trigger:** A new entry in the `raw_reports` table.
*   **Action:**
    *   The text content of the report is cleaned and prepared for processing.
    *   A vector embedding is generated from the text content using a pre-trained model.
    *   The embedding is stored in the `embedding` column of the `raw_reports` table.

## 3. LLM Extraction

*   **Trigger:** Successful embedding generation.
*   **Action:** A series of calls are made to an LLM provider (e.g., OpenAI) using the prompts defined in `LLM_EXTRACTION_PROMPTS.md`.
    *   **Step 3.1:** Extract key skills and proficiency.
    *   **Step 3.2:** Generate the quantitative skill snapshot.
    *   **Step 3.3:** Create the career roadmap.

## 4. Normalization & Storage

*   **Trigger:** Successful data extraction from the LLM.
*   **Action:** The structured data from the LLM is normalized and stored in the PostgreSQL database.
    *   The extracted skills are stored in the `skills` and `employee_skills` tables.
    *   A new record is created in the `snapshots` table with the extracted snapshot data.
    *   A new record is created in the `roadmaps` table with the career roadmap information.

## 5. Snapshot & Analytics Update

*   **Trigger:** A new snapshot is created.
*   **Action:**
    *   The **Snapshot Engine** calculates any necessary time-series deltas (e.g., `skill_gap_delta`).
    *   The **Analytics Engine** is triggered to update the materialized views (`team_skill_heatmap`, `promotion_readiness_index`, etc.) that are affected by the new data.

## 6. Error Handling

*   Each step of the pipeline will have robust error handling and logging.
*   If a step fails, the process will be retried a configurable number of times.
*   If a report consistently fails to be processed, it will be flagged for manual review.
