ALTER TABLE "posts" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_user_id_users_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "title" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "content" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "picture" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "picture" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "posts" ("title");--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "post_tags" DROP COLUMN IF EXISTS "user_id";