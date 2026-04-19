CREATE TYPE "public"."edition_status" AS ENUM('PROCESSING', 'SUCCESS', 'ERROR');--> statement-breakpoint
ALTER TABLE "editions" ALTER COLUMN "url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "editions" ADD COLUMN "status" "edition_status" DEFAULT 'SUCCESS' NOT NULL;