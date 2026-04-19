CREATE TYPE "public"."credit_source" AS ENUM('USAGE', 'PURCHASE', 'SUBSCRIPTION', 'TRIAL');--> statement-breakpoint
ALTER TABLE "credits" ALTER COLUMN "source" SET DATA TYPE credit_source;