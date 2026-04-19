CREATE TYPE "public"."video_format" AS ENUM('portrait', 'landscape', 'square');--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "format" "video_format";