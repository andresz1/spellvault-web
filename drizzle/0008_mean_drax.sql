CREATE TABLE "edited_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL,
	"url" varchar(2048) NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3) DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "edited_images" ADD CONSTRAINT "edited_images_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;