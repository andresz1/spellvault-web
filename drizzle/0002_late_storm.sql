ALTER TABLE "agents" ALTER COLUMN "telegram_token" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "agents" ADD COLUMN "prompt" varchar(10240);