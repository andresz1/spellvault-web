ALTER TABLE "images" ADD COLUMN "is_tour" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "virtual_tour_starting_image_id";