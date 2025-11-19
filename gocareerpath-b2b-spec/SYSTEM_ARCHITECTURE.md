# System Architecture

## 1. Overview

The GoCareerPath B2B platform is designed as a modern web application with a decoupled frontend and backend, leveraging serverless technologies for scalability and efficiency. The architecture is centered around a data pipeline that processes raw career reports into structured, actionable insights.

## 2. Architecture Diagram

```mermaid
graph TD
    subgraph "Client Layer"
        A[Manager UX <br/> (Next.js Frontend)]
    end

    subgraph "API Layer (Serverless)"
        B[API Gateway <br/> (Vercel)]
        C[Next.js API Routes]
        D[Authentication Service]
    end

    subgraph "Application Layer"
        E[Data Ingestion Service <br/> (Serverless Function)]
        F[Report Processing Service <br/> (Background Job/Queue)]
        G[Snapshot Engine <br/> (Serverless Function)]
        H[Analytics Engine <br/> (Materialized Views)]
    end

    subgraph "Data Layer"
        I[PostgreSQL Database <br/> (with pgvector)]
        J[Raw Report Storage <br/> (S3 or DB Table)]
    end

    subgraph "External Services"
        K[LLM Provider <br/> (e.g., OpenAI)]
        L[HRIS Integration <br/> (Optional)]
    end

    %% Connections
    A -->|HTTPS| B
    B --> C
    C -->|User Auth| D
    C -->|Read/Write| I
    C -->|Trigger| E
    C -->|Read| H

    subgraph "Data Flow"
        direction LR
        M[Org Chart Upload <br/> (CSV)] --> E
        L --> E
        N[Consumer Career Reports] --> E
        E -->|Stores Raw Report| J
        E -->|Enqueues Job| F
        F -->|Fetches Raw Report| J
        F -->|Calls for Extraction| K
        F -->|Writes Structured Data| I
        I -->|Triggers| G
        G -->|Updates Snapshots| I
        H -->|Reads from| I
    end

```

## 3. Component Descriptions

*   **Manager UX (Frontend):** A Next.js application that provides the user interface for managers. It interacts with the backend via the API layer.
*   **API Layer:** A set of serverless functions (Next.js API routes) that handle client requests, authentication, and data retrieval.
*   **Data Ingestion Service:** A serverless function responsible for handling the upload of raw career reports and organizational charts. It stores the raw data and triggers the processing service.
*   **Report Processing Service:** A background job that is triggered by the ingestion service. It fetches raw reports, uses an LLM provider to extract structured data, and stores the normalized data in the PostgreSQL database.
*   **Snapshot Engine:** A service that automatically generates and updates employee skill snapshots whenever new data is available. It also computes time-series deltas.
*   **Analytics Engine:** A set of materialized views in the PostgreSQL database that pre-calculate and store aggregated analytics data for performance.
*   **PostgreSQL Database:** The primary data store for the application, containing all structured data. The `pgvector` extension is used to store and query vector embeddings.
*   **Raw Report Storage:** A dedicated storage solution (either a table in the database or an S3 bucket) for the raw, unprocessed career reports.
*   **LLM Provider:** An external service (e.g., OpenAI) that is used for the AI-powered data extraction from the career reports.
*   **HRIS Integration:** An optional integration with third-party HRIS platforms to automate the import of organizational charts.
