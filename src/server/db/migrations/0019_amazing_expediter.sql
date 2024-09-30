ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_users_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "user_idx";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "user_id";