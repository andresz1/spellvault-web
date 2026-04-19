CREATE TABLE "hot_spots" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL,
	"x" double precision NOT NULL,
	"y" double precision NOT NULL,
	"created_at" timestamp (3) DEFAULT now(),
	"updated_at" timestamp (3) DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "hot_spots" ADD CONSTRAINT "hot_spots_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;