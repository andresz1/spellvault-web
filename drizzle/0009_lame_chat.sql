ALTER TABLE "edited_images" RENAME TO "editions";--> statement-breakpoint
ALTER TABLE "editions" DROP CONSTRAINT "edited_images_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "editions" ADD CONSTRAINT "editions_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;