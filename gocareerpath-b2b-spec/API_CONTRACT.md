# API Contract Draft

## 1. Introduction

This document specifies the API contract for the GoCareerPath B2B platform. It defines the available endpoints, request and response formats, and authentication mechanisms. All APIs will follow RESTful principles.

## 2. Authentication

All API endpoints are protected and require a valid JSON Web Token (JWT) to be included in the `Authorization` header of each request.

`Authorization: Bearer <your_jwt>`

## 3. API Endpoints

### 3.1. Teams

#### `GET /teams/:id/snapshot`

Retrieves the latest skill snapshot for a specific team.

*   **URL Params:**
    *   `id` (string, required): The ID of the team.
*   **Success Response (200 OK):**
    ```json
    {
      "team_id": "uuid",
      "team_name": "Engineering",
      "snapshot_date": "timestamp",
      "skill_heatmap": [
        { "skill_name": "TypeScript", "average_proficiency": 4.2 },
        { "skill_name": "React", "average_proficiency": 4.5 },
        { "skill_name": "SQL", "average_proficiency": 3.8 }
      ],
      "promotion_readiness": [
        { "employee_id": "uuid", "employee_name": "Alice", "readiness_score": 0.9 },
        { "employee_id": "uuid", "employee_name": "Bob", "readiness_score": 0.8 }
      ],
      "attrition_risk": [
        { "employee_id": "uuid", "employee_name": "Charlie", "risk_score": 0.75 }
      ]
    }
    ```

### 3.2. Employees

#### `GET /employees/:id/skill-profile`

Retrieves the detailed skill profile for a specific employee.

*   **URL Params:**
    *   `id` (string, required): The ID of the employee.
*   **Success Response (200 OK):**
    ```json
    {
      "employee_id": "uuid",
      "employee_name": "Alice",
      "role": "Senior Software Engineer",
      "current_skills": [
        { "skill_name": "TypeScript", "proficiency": 5 },
        { "skill_name": "React", "proficiency": 5 }
      ],
      "skill_gaps": [
        { "skill_name": "Go", "proficiency_needed": 3 },
        { "skill_name": "GraphQL", "proficiency_needed": 4 }
      ],
      "career_roadmap": {
        "recommended_role": "Staff Engineer",
        "steps": [
          "Master Go and GraphQL",
          "Lead a major project initiative",
          "Mentor junior engineers"
        ]
      }
    }
    ```

#### `GET /employees/:id/projection`

Retrieves the AI-driven projections for a specific employee.

*   **URL Params:**
    *   `id` (string, required): The ID of the employee.
*   **Success Response (200 OK):**
    ```json
    {
      "employee_id": "uuid",
      "promotion_timeline": {
        "value": 6,
        "unit": "months",
        "delta_90_days": -1
      },
      "productivity_uplift": {
        "value": 0.15,
        "unit": "percentage",
        "delta_90_days": 0.02
      },
      "automation_risk": {
        "value": 0.2,
        "unit": "percentage",
        "delta_90_days": 0
      }
    }
    ```

### 3.3. Analytics

#### `GET /analytics/team`

Retrieves team-level analytics data.

*   **Query Params:**
    *   `team_id` (string, required): The ID of the team.
    *   `time_period` (string, optional, default: `90d`): The time period for the analytics (e.g., `30d`, `60d`, `90d`).
*   **Success Response (200 OK):**
    ```json
    {
      "team_id": "uuid",
      "training_roi": {
        "investment": 5000,
        "uplift_value": 7500,
        "roi": 1.5
      },
      "skill_gap_trend": [
        { "date": "YYYY-MM-DD", "average_gap_score": 2.5 },
        { "date": "YYYY-MM-DD", "average_gap_score": 2.2 }
      ]
    }
    ```

#### `GET /analytics/org`

Retrieves organization-level analytics data.

*   **Query Params:**
    *   `org_id` (string, required): The ID of the organization.
    *   `time_period` (string, optional, default: `90d`): The time period for the analytics.
*   **Success Response (200 OK):**
    ```json
    {
      "org_id": "uuid",
      "talent_bench_strength": [
        { "role": "Staff Engineer", "ready_now": 5, "ready_in_6_months": 10 },
        { "role": "Engineering Manager", "ready_now": 2, "ready_in_6_months": 4 }
      ],
      "overall_skill_trends": [
        { "skill_name": "AI/ML", "growth_percentage": 25 },
        { "skill_name": "Cybersecurity", "growth_percentage": 15 }
      ]
    }
    ```

### 3.4. Data Import

#### `POST /import/org-chart`

Uploads an organizational chart in CSV format.

*   **Request Body:** `multipart/form-data` with a single file field named `org_chart`.
*   **Success Response (202 Accepted):**
    ```json
    {
      "message": "Organizational chart is being processed."
    }
    ```
*   **Error Response (400 Bad Request):**
    ```json
    {
      "error": "Invalid file format. Please upload a CSV."
    }
