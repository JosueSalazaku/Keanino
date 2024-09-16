DROP INDEX IF EXISTS "user_idx";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "user_id";