# Data Model & Schema

## 1. Logical Data Model

The data model is designed to support the core requirements of the platform, including employee skill tracking, snapshot generation, and analytics.

*   **Organizations:** Represents a customer company.
*   **Users:** Represents individual users (managers, admins) within an organization.
*   **Teams:** Represents teams within an organization, with a designated manager.
*   **Employees:** Represents the employees of a customer company, whose skills are being tracked.
*   **Skills:** A centralized taxonomy of skills.
*   **EmployeeSkills:** A join table that links employees to skills and stores their proficiency level.
*   **RawReports:** Stores the raw data from GoCareerPath consumer reports.
*   **Snapshots:** Stores the structured, AI-extracted data from the raw reports at a point in time.
*   **Roadmaps:** Stores the career progression plans for employees.
*   **TrainingEvents:** Logs training and development activities for employees.

## 2. PostgreSQL Schema

Below is the SQL schema for the PostgreSQL database.

### `organizations`

```sql
CREATE TABLE "organizations" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" varchar(255) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);
```

### `users`

```sql
CREATE TABLE "users" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" varchar(100),
    "email" varchar(255) NOT NULL,
    "emailVerified" timestamp,
    "image" text,
    "password_hash" text,
    "role" varchar(20) DEFAULT 'member' NOT NULL,
    "organization_id" uuid,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "deleted_at" timestamp,
    CONSTRAINT "users_email_unique" UNIQUE("email"),
    FOREIGN KEY ("organization_id") REFERENCES "organizations"("id")
);
```

### `b2b_teams`

```sql
CREATE TABLE "b2b_teams" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "organization_id" uuid NOT NULL,
    "manager_id" uuid,
    "name" varchar(255) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    FOREIGN KEY ("organization_id") REFERENCES "organizations"("id"),
    FOREIGN KEY ("manager_id") REFERENCES "users"("id")
);
```

### `employees`

```sql
CREATE TABLE "employees" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "organization_id" uuid NOT NULL,
    "team_id" uuid,
    "name" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL UNIQUE,
    "role" varchar(255),
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    FOREIGN KEY ("organization_id") REFERENCES "organizations"("id"),
    FOREIGN KEY ("team_id") REFERENCES "b2b_teams"("id")
);
```

### `skills`

```sql
CREATE TABLE "skills" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" varchar(255) NOT NULL UNIQUE,
    "category" varchar(255),
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);
```

### `employee_skills`

```sql
CREATE TABLE "employee_skills" (
    "employee_id" uuid NOT NULL,
    "skill_id" uuid NOT NULL,
    "proficiency_level" integer,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    PRIMARY KEY ("employee_id", "skill_id"),
    FOREIGN KEY ("employee_id") REFERENCES "employees"("id"),
    FOREIGN KEY ("skill_id") REFERENCES "skills"("id")
);
```

### `raw_reports`

```sql
CREATE TABLE "raw_reports" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "employee_id" uuid NOT NULL,
    "raw_content_text" text,
    "raw_content_json" jsonb,
    "embedding" vector(1536),
    "created_at" timestamp DEFAULT now() NOT NULL,
    FOREIGN KEY ("employee_id") REFERENCES "employees"("id")
);
```

### `snapshots`

```sql
CREATE TABLE "snapshots" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "employee_id" uuid NOT NULL,
    "organization_id" uuid NOT NULL,
    "report_id" uuid NOT NULL,
    "skill_gap_score" integer,
    "uplift_projection" decimal,
    "automation_risk" decimal,
    "promotion_timeline" integer,
    "created_at" timestamp DEFAULT now() NOT NULL,
    FOREIGN KEY ("employee_id") REFERENCES "employees"("id"),
    FOREIGN KEY ("organization_id") REFERENCES "organizations"("id"),
    FOREIGN KEY ("report_id") REFERENCES "raw_reports"("id")
);
```

### `roadmaps`

```sql
CREATE TABLE "roadmaps" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "employee_id" uuid NOT NULL,
    "snapshot_id" uuid NOT NULL,
    "recommended_role" varchar(255),
    "steps" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    FOREIGN KEY ("employee_id") REFERENCES "employees"("id"),
    FOREIGN KEY ("snapshot_id") REFERENCES "snapshots"("id")
);
```

### `training_events`

```sql
CREATE TABLE "training_events" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "employee_id" uuid NOT NULL,
    "name" varchar(255) NOT NULL,
    "completion_date" date,
    "cost" decimal(10, 2),
    "created_at" timestamp DEFAULT now() NOT NULL,
    FOREIGN KEY ("employee_id") REFERENCES "employees"("id")
);
