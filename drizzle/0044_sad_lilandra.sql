ALTER TABLE "clips" ADD COLUMN "duration" integer;--> statement-breakpoint
ALTER TABLE "clips" ADD COLUMN "image" varchar(2048);--> statement-breakpoint
ALTER TABLE "clips" ADD COLUMN "type" varchar(2048);--> statement-breakpoint
ALTER TABLE "clips" ADD COLUMN "last_frame_image" varchar(2048);