ALTER TABLE "assets" DROP CONSTRAINT "assets_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "editions" DROP CONSTRAINT "editions_edition_id_editions_id_fk";
--> statement-breakpoint
ALTER TABLE "editions" DROP CONSTRAINT "editions_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "images" DROP CONSTRAINT "images_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "password_recoveries" DROP CONSTRAINT "password_recoveries_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "editions" ALTER COLUMN "image_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "editions" ADD CONSTRAINT "editions_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_recoveries" ADD CONSTRAINT "password_recoveries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "editions" DROP COLUMN "edition_id";