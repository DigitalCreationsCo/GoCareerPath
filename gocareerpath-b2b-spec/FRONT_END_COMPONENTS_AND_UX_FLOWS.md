# Front-End Components & UX Flows

This document outlines the front-end components and user experience flows for the manager-facing application.

## 1. Core Components

*   **`DashboardLayout`:** The main layout for the application, including navigation, header, and footer.
*   **`TeamOverviewDashboard`:** The main dashboard for managers, displaying high-level team analytics.
    *   **`SkillHeatmap`:** A component to visualize the team's skills.
    *   **`PromotionReadinessList`:** A list of employees who are ready for promotion.
    *   **`AttritionRiskList`:** A list of employees at risk of attrition.
*   **`EmployeeSkillSnapshot`:** A detailed view of an individual employee's profile.
    *   **`CurrentSkillsCard`:** Displays the employee's current skills.
    *   **`SkillGapsCard`:** Highlights the skills that need development.
    *   **`CareerRoadmap`:** Shows the employee's personalized career path.
    *   **`ProjectionsCard`:** Displays AI-driven predictions.
    *   **`SnapshotHistory`:** A view to see historical snapshots and track progress over time.
*   **`TrainingROIPanel`:** A component for tracking and visualizing the return on investment for training.
*   **`TalentBenchStrength`:** A view to identify potential successors for key roles.
*   **`OrgChartImporter`:** A UI for uploading and mapping the organizational chart.

## 2. User Experience Flows

### 2.1. Onboarding a New Company

1.  An admin user from the company signs up and creates an organization.
2.  They are prompted to upload an organizational chart (CSV).
3.  The system parses the org chart and creates `employee` and `team` records.
4.  The admin is then guided to map the imported employees to their existing GoCareerPath consumer reports.
5.  Once the mapping is complete, the data processing pipeline is initiated for each employee.

### 2.2. Manager's First-Time Experience

1.  A manager logs in for the first time.
2.  They are presented with the `TeamOverviewDashboard` for their team.
3.  They can see a high-level summary of their team's skills, promotion readiness, and attrition risks.
4.  A tutorial or guided tour can highlight the key features of the dashboard.

### 2.3. Reviewing an Employee's Profile

1.  From the `TeamOverviewDashboard`, a manager clicks on an employee's name.
2.  They are taken to the `EmployeeSkillSnapshot` page for that employee.
3.  They can review the employee's current skills, skill gaps, and career roadmap.
4.  The manager can view the `SnapshotHistory` to see how the employee has progressed over time.

### 2.4. Assessing Training ROI

1.  A manager navigates to the `TrainingROIPanel`.
2.  They can input data about training events (e.g., course name, cost, completion date).
3.  The system correlates this data with changes in the employee's skill snapshots.
4.  The manager can see a calculated ROI and skill uplift attributed to the training.
