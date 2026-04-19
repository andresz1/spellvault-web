CREATE TYPE "public"."video_status" AS ENUM('PROCESSING', 'SUCCESS', 'ERROR');--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "status" "video_status" DEFAULT 'PROCESSING' NOT NULL;