ALTER TABLE "hot_spots" ADD COLUMN "target_image_id" integer;--> statement-breakpoint
ALTER TABLE "hot_spots" ADD COLUMN "number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "virtual_tour_starting_image_id" integer;--> statement-breakpoint
ALTER TABLE "hot_spots" ADD CONSTRAINT "hot_spots_target_image_id_images_id_fk" FOREIGN KEY ("target_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;