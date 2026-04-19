CREATE TYPE "public"."type" AS ENUM('image', '360');--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "format" "type" DEFAULT 'image' NOT NULL;