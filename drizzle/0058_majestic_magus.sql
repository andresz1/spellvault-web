DROP TABLE "credits" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscription_credits" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DROP TYPE "public"."credit_source";