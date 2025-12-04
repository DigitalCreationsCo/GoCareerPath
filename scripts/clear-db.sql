-- Disable triggers to prevent foreign key checks if needed, but TRUNCATE CASCADE handles it.
-- Truncate all tables.

TRUNCATE TABLE 
  users, 
  teams, 
  chats, 
  messages, 
  waitlist, 
  activity_logs, 
  invitations, 
  reports, 
  research_sessions, 
  team_members, 
  team_managers, 
  account, 
  session, 
  "verificationToken", 
  authenticator, 
  skills, 
  employee_skills, 
  raw_reports, 
  snapshots, 
  roadmaps, 
  training_events
CASCADE;

-- Alternatively, if TRUNCATE is not desired or for SQLite compatibility (using DELETE):
-- DELETE FROM training_events;
-- DELETE FROM roadmaps;
-- DELETE FROM snapshots;
-- DELETE FROM raw_reports;
-- DELETE FROM employee_skills;
-- DELETE FROM skills;
-- DELETE FROM authenticator;
-- DELETE FROM "verificationToken";
-- DELETE FROM session;
-- DELETE FROM account;
-- DELETE FROM team_managers;
-- DELETE FROM team_members;
-- DELETE FROM research_sessions;
-- DELETE FROM reports;
-- DELETE FROM invitations;
-- DELETE FROM activity_logs;
-- DELETE FROM waitlist;
-- DELETE FROM messages;
-- DELETE FROM chats;
-- DELETE FROM users;
-- DELETE FROM teams;
