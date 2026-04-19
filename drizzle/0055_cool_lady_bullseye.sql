ALTER TYPE "public"."credit_source" ADD VALUE 'REFUND';--> statement-breakpoint
ALTER TABLE "credits" RENAME COLUMN "expires_at" TO "is_expired";