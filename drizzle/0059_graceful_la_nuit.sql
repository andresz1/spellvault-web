CREATE TABLE "floor_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"title" varchar(256) NOT NULL,
	"data" jsonb,
	"configuration" jsonb,
	"wall_count" integer,
	"door_count" integer,
	"window_count" integer,
	"opening_count" integer,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3) DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "floor_plans" ADD CONSTRAINT "floor_plans_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;