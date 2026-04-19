ALTER TABLE "credits" ADD COLUMN "expired" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "credits" DROP COLUMN "is_expired";