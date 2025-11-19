import { relations } from 'drizzle-orm';
import {
  users,
  teams,
  skills,
  employeeSkills,
  rawReports,
  snapshots,
  roadmaps,
  teamManagers,
} from './schema';

export const usersRelations = relations(users, ({ many, one }) => ({
  teamManagers: many(teamManagers),
  team: one(teams, {
    fields: [users.teamId],
    references: [teams.id],
  }),
  employeeSkills: many(employeeSkills),
  rawReports: many(rawReports),
  snapshots: many(snapshots),
  roadmaps: many(roadmaps),
}));

export const teamsRelations = relations(teams, ({ many }) => ({
  teamManagers: many(teamManagers),
  users: many(users),
}));

export const teamManagersRelations = relations(teamManagers, ({ one }) => ({
  team: one(teams, {
    fields: [teamManagers.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [teamManagers.userId],
    references: [users.id],
  }),
}));

export const skillsRelations = relations(skills, ({ many }) => ({
  employeeSkills: many(employeeSkills),
}));

export const employeeSkillsRelations = relations(employeeSkills, ({ one }) => ({
  user: one(users, {
    fields: [employeeSkills.userId],
    references: [users.id],
  }),
  skill: one(skills, {
    fields: [employeeSkills.skillId],
    references: [skills.id],
  }),
}));

export const rawReportsRelations = relations(rawReports, ({ one }) => ({
  user: one(users, {
    fields: [rawReports.userId],
    references: [users.id],
  }),
}));

export const snapshotsRelations = relations(snapshots, ({ one }) => ({
  user: one(users, {
    fields: [snapshots.userId],
    references: [users.id],
  }),
  report: one(rawReports, {
    fields: [snapshots.reportId],
    references: [rawReports.id],
  }),
}));

export const roadmapsRelations = relations(roadmaps, ({ one }) => ({
  user: one(users, {
    fields: [roadmaps.userId],
    references: [users.id],
  }),
  snapshot: one(snapshots, {
    fields: [roadmaps.snapshotId],
    references: [snapshots.id],
  }),
}));
