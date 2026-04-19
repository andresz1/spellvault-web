ALTER TABLE "editions" ALTER COLUMN "image_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "editions" ADD COLUMN "edition_id" integer;--> statement-breakpoint
ALTER TABLE "editions" ADD CONSTRAINT "editions_edition_id_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."editions"("id") ON DELETE no action ON UPDATE no action;