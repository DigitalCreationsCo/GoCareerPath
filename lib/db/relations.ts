import { relations } from 'drizzle-orm';
import {
  users,
  organizations,
  b2bTeams,
  employees,
  skills,
  employeeSkills,
  rawReports,
  snapshots,
  roadmaps,
} from './schema';

export const usersRelations = relations(users, ({ one }) => ({
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
  users: many(users),
  teams: many(b2bTeams),
  employees: many(employees),
}));

export const b2bTeamsRelations = relations(b2bTeams, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [b2bTeams.organizationId],
    references: [organizations.id],
  }),
  manager: one(users, {
    fields: [b2bTeams.managerId],
    references: [users.id],
  }),
  employees: many(employees),
}));

export const employeesRelations = relations(employees, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [employees.organizationId],
    references: [organizations.id],
  }),
  team: one(b2bTeams, {
    fields: [employees.teamId],
    references: [b2bTeams.id],
  }),
  employeeSkills: many(employeeSkills),
  rawReports: many(rawReports),
  snapshots: many(snapshots),
  roadmaps: many(roadmaps),
}));

export const skillsRelations = relations(skills, ({ many }) => ({
  employeeSkills: many(employeeSkills),
}));

export const employeeSkillsRelations = relations(employeeSkills, ({ one }) => ({
  employee: one(employees, {
    fields: [employeeSkills.employeeId],
    references: [employees.id],
  }),
  skill: one(skills, {
    fields: [employeeSkills.skillId],
    references: [skills.id],
  }),
}));

export const rawReportsRelations = relations(rawReports, ({ one }) => ({
  employee: one(employees, {
    fields: [rawReports.employeeId],
    references: [employees.id],
  }),
}));

export const snapshotsRelations = relations(snapshots, ({ one }) => ({
  employee: one(employees, {
    fields: [snapshots.employeeId],
    references: [employees.id],
  }),
  report: one(rawReports, {
    fields: [snapshots.reportId],
    references: [rawReports.id],
  }),
}));

export const roadmapsRelations = relations(roadmaps, ({ one }) => ({
  employee: one(employees, {
    fields: [roadmaps.employeeId],
    references: [employees.id],
  }),
  snapshot: one(snapshots, {
    fields: [roadmaps.snapshotId],
    references: [snapshots.id],
  }),
}));
