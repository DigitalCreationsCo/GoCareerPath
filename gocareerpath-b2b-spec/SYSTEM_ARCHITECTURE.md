# System Architecture

```mermaid
graph TD
    subgraph "User Facing Layer"
        A[Manager UX - Next.js Frontend]
    end

    subgraph "API Layer"
        B[Next.js API Routes]
        C[Authentication Middleware]
    end

    subgraph "Application Layer"
        D[Snapshot Engine]
        E[Analytics Engine]
        F[Data Processing Pipeline]
    end

    subgraph "Data Layer"
        G[PostgreSQL Database with pgvector]
        H[Raw Report Storage - S3/Blob]
    end

    subgraph "External Services"
        I[LLM Provider - OpenAI]
        J[HRIS Integration - Optional]
    end

    A -->|API Calls| B
    B -->|Authenticated| C
    C -->|Triggers| D
    C -->|Queries| E
    C -->|Initiates| F

    F -->|Stores Raw Data| H
    F -->|Calls| I
    F -->|Writes Structured Data| G

    D -->|Reads/Writes| G
    E -->|Reads/Writes Materialized Views| G

    J -->|Org Chart Data| F
```

## Component Descriptions

*   **Manager UX (Next.js Frontend):** The user interface for managers to interact with the platform. It will be a single-page application built with React and Next.js.
*   **Next.js API Routes:** The backend for the application, handling requests from the frontend, authenticating users, and interacting with the application and data layers.
*   **Authentication Middleware:** Ensures that all API requests are properly authenticated and authorized.
*   **Snapshot Engine:** A service responsible for generating and updating employee skill snapshots based on new data.
*   **Analytics Engine:** A service that computes and materializes team and organizational level analytics.
*   **Data Processing Pipeline:** A set of functions and workers that ingest raw career reports, process them using an LLM, and store the structured data.
*   **PostgreSQL Database:** The primary database for storing all structured data, including user information, skills, snapshots, and analytics. The `pgvector` extension is used for storing and querying embeddings.
*   **Raw Report Storage:** A dedicated storage solution (like Amazon S3 or Azure Blob Storage) for the raw text and JSON of the career reports.
*   **LLM Provider:** An external service (e.g., OpenAI) that is used for extracting structured data from the raw reports.
*   **HRIS Integration:** An optional integration with a company's Human Resource Information System to automate the import of the organizational chart.
