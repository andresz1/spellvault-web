CREATE TYPE "public"."project_currency" AS ENUM('EUR', 'USD');--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "currency" SET DATA TYPE project_currency;