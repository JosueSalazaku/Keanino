ALTER TABLE "posts" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "posts" ("user_id");