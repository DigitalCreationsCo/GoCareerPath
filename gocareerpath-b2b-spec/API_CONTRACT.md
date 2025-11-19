# API Contract

This document defines the API contract for the GoCareerPath B2B Platform.

## Authentication

All API requests must be authenticated using a bearer token (JWT) in the `Authorization` header.

`Authorization: Bearer <token>`

## Endpoints

### Teams

#### `GET /teams/:id/snapshot`

Retrieves the latest skill snapshot for a given team.

*   **URL Params:** `id=[string]` (team ID)
*   **Success Response:**
    *   **Code:** 200 OK
    *   **Content:**
        ```json
        {
          "team_id": "uuid",
          "team_name": "string",
          "skill_heatmap": [
            {
              "skill_name": "string",
              "average_proficiency": "number"
            }
          ],
          "promotion_readiness": [
            {
              "employee_id": "uuid",
              "employee_name": "string",
              "readiness_score": "number"
            }
          ],
          "attrition_risk": [
            {
              "employee_id": "uuid",
              "employee_name": "string",
              "risk_score": "number"
            }
          ]
        }
        ```

### Employees

#### `GET /employees/:id/skill-profile`

Retrieves the detailed skill profile for a single employee.

*   **URL Params:** `id=[string]` (employee ID)
*   **Success Response:**
    *   **Code:** 200 OK
    *   **Content:**
        ```json
        {
          "employee_id": "uuid",
          "employee_name": "string",
          "role": "string",
          "current_skills": [
            {
              "skill_name": "string",
              "proficiency": "number"
            }
          ],
          "skill_gaps": [
            {
              "skill_name": "string",
              "proficiency_needed": "number"
            }
          ],
          "career_roadmap": {
            "recommended_role": "string",
            "steps": ["string"]
          }
        }
        ```

#### `GET /employees/:id/projection`

Retrieves the AI-driven projections for an employee.

*   **URL Params:** `id=[string]` (employee ID)
*   **Success Response:**
    *   **Code:** 200 OK
    *   **Content:**
        ```json
        {
          "employee_id": "uuid",
          "uplift_projection": "number",
          "automation_risk": "number",
          "promotion_timeline": "number"
        }
        ```

#### `GET /employees/:id/snapshot`

Retrieves all historical snapshots for an employee.

*   **URL Params:** `id=[string]` (employee ID)
*   **Success Response:**
    *   **Code:** 200 OK
    *   **Content:**
        ```json
        [
          {
            "id": "uuid",
            "skillGapScore": "number",
            "upliftProjection": "number",
            "automationRisk": "number",
            "promotionTimeline": "number",
            "createdAt": "date-time"
          }
        ]
        ```

#### `POST /employees/:id/snapshot`

Creates a new snapshot for an employee.

*   **URL Params:** `id=[string]` (employee ID)
*   **Request Body:**
    ```json
    {
      "teamId": "uuid",
      "reportId": "uuid",
      "skillGapScore": "number",
      "upliftProjection": "number",
      "automationRisk": "number",
      "promotionTimeline": "number"
    }
    ```
*   **Success Response:**
    *   **Code:** 201 Created
    *   **Content:** The newly created snapshot object.

### Analytics

#### `GET /analytics/team`

Retrieves team-level analytics.

*   **Query Params:** `teamId=[string]`
*   **Success Response:**
    *   **Code:** 200 OK
    *   **Content:**
        ```json
        {
          "training_roi": "number",
          "skill_gap_delta": "number"
        }
        ```

### Data Import

#### `POST /import/org-chart`

Uploads an organizational chart.

*   **Request Body:** `multipart/form-data` with a CSV file.
*   **Success Response:**
    *   **Code:** 202 Accepted
    *   **Content:**
        ```json
        {
          "message": "Org chart is being processed."
        }
