ALTER TYPE "public"."type" RENAME TO "image_type";--> statement-breakpoint
ALTER TABLE "images" RENAME COLUMN "type" TO "image_type";