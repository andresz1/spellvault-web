CREATE TABLE "password_recoveries" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" uuid DEFAULT gen_random_uuid(),
	"is_used" boolean DEFAULT false,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3),
	CONSTRAINT "password_recoveries_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "password_recoveries" ADD CONSTRAINT "password_recoveries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;