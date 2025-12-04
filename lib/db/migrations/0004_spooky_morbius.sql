ALTER TABLE "employees" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "employees" CASCADE;--> statement-breakpoint
ALTER TABLE "employee_skills" RENAME COLUMN "employee_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "raw_reports" RENAME COLUMN "employee_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "roadmaps" RENAME COLUMN "employee_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "snapshots" RENAME COLUMN "employee_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "training_events" RENAME COLUMN "employee_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "employee_skills" DROP CONSTRAINT "employee_skills_employee_id_employees_id_fk";
--> statement-breakpoint
ALTER TABLE "raw_reports" DROP CONSTRAINT "raw_reports_employee_id_employees_id_fk";
--> statement-breakpoint
ALTER TABLE "roadmaps" DROP CONSTRAINT "roadmaps_employee_id_employees_id_fk";
--> statement-breakpoint
ALTER TABLE "snapshots" DROP CONSTRAINT "snapshots_employee_id_employees_id_fk";
--> statement-breakpoint
ALTER TABLE "training_events" DROP CONSTRAINT "training_events_employee_id_employees_id_fk";
--> statement-breakpoint
ALTER TABLE "employee_skills" DROP CONSTRAINT "employee_skills_employee_id_skill_id_pk";--> statement-breakpoint
ALTER TABLE "employee_skills" ADD CONSTRAINT "employee_skills_user_id_skill_id_pk" PRIMARY KEY("user_id","skill_id");--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "team_id" uuid;--> statement-breakpoint
ALTER TABLE "employee_skills" ADD CONSTRAINT "employee_skills_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "raw_reports" ADD CONSTRAINT "raw_reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roadmaps" ADD CONSTRAINT "roadmaps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snapshots" ADD CONSTRAINT "snapshots_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_events" ADD CONSTRAINT "training_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;