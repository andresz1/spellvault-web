CREATE TYPE "public"."user_occupation" AS ENUM('real_estate', 'interior_designer', 'photographer', 'home_owner', 'architect', 'other');--> statement-breakpoint
CREATE TYPE "public"."user_source" AS ENUM('search_engine', 'social_media', 'friend_referral', 'blog_article', 'youtube', 'other');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "occupation" "user_occupation";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_source" "user_source";