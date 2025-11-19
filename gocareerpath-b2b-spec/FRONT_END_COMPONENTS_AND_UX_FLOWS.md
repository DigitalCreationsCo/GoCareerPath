# Front-End Component List & UX Flows

## 1. Introduction

This document outlines the front-end components and user experience (UX) flows for the GoCareerPath B2B platform. It is intended to guide the design and development of the user interface.

## 2. High-Level UX Flow

1.  **Onboarding:**
    *   An admin user from the customer company signs up and creates an organization.
    *   The admin uploads an organizational chart (CSV) to define teams and employees.
    *   The admin maps existing GoCareerPath consumer reports to the employees.
2.  **Manager Login:**
    *   A manager logs in and is taken to their Team Overview Dashboard.
3.  **Team Analysis:**
    *   The manager views the team's skill heatmap, identifies promotion-ready employees, and spots attrition risks.
4.  **Individual Analysis:**
    *   The manager clicks on an employee to view their detailed Skill Snapshot.
5.  **ROI Analysis:**
    *   The manager navigates to the Training ROI panel to see the impact of recent training initiatives.

## 3. Component Library

The following is a list of the key UI components to be built. A component-based framework like Next.js/React is assumed.

### 3.1. Core Components

*   **`Layout`:** Main application layout with navigation, header, and footer.
*   **`Header`:** Contains the logo, user profile dropdown, and notifications.
*   **`Navigation`:** A sidebar or top bar for navigating between the main sections (Dashboard, Employees, Analytics).
*   **`DataTable`:** A reusable table component for displaying lists of employees, skills, etc. (with sorting and filtering).
*   **`Chart`:** A generic charting component (e.g., using Recharts or a similar library) for visualizations.

### 3.2. Feature Components

#### Onboarding

*   **`OrgChartUploader`:** A component for uploading and parsing the org chart CSV file.
*   **`EmployeeReportMapper`:** An interface for mapping employees to their consumer reports.

#### Dashboard

*   **`TeamOverviewDashboard`:** The main dashboard view for managers.
    *   **`SkillHeatmap`:** A component that displays a heatmap of team skills.
    *   **`PromotionReadinessCard`:** A card that lists employees who are ready for promotion.
    *   **`AttritionRiskCard`:** A card that highlights employees at risk of attrition.

#### Employee Views

*   **`EmployeeSkillSnapshot`:** The detailed view of an employee's profile.
    *   **`SkillList`:** A component to display current skills and skill gaps.
    *   **`CareerRoadmap`:** A component to visualize the employee's career path.
    *   **`ProjectionsDisplay`:** A component to show the AI-driven projections (promotion timeline, etc.).

#### Analytics

*   **`TrainingROIPanel`:** The view for analyzing training ROI.
    *   **`InvestmentTracker`:** A form for logging training investments.
    *   **`ROICalculator`:** A component that displays the calculated ROI.
*   **`TalentBenchStrength`:** A view for visualizing the talent bench for senior roles.

## 4. UX Flow Details

### 4.1. Onboarding Flow

*   **Step 1:** User signs up and creates an organization.
*   **Step 2:** User is prompted to upload an org chart. The `OrgChartUploader` component provides a file dropzone and instructions on the required CSV format.
*   **Step 3:** After the org chart is processed, the user is presented with a list of employees and an interface (`EmployeeReportMapper`) to link each employee to their GoCareerPath report.
*   **Step 4:** Once the mapping is complete, the system starts processing the reports, and the user is navigated to the main dashboard.

### 4.2. Manager's Daily Flow

*   **Step 1:** Manager logs in and lands on the `TeamOverviewDashboard`.
*   **Step 2:** The manager reviews the `SkillHeatmap` to get a quick overview of the team's capabilities.
*   **Step 3:** The manager checks the `PromotionReadinessCard` and `AttritionRiskCard` for any immediate action items.
*   **Step 4:** The manager clicks on an employee from one of the cards or a data table to navigate to the `EmployeeSkillSnapshot` view for a deeper dive.
*   **Step 5:** In the snapshot view, the manager analyzes the employee's skills, gaps, and career roadmap to prepare for a 1-on-1 meeting.
