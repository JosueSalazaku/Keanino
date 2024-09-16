ALTER TABLE "comments" RENAME COLUMN "user_Id" TO "user_id";--> statement-breakpoint
ALTER TABLE "likes" RENAME COLUMN "user_Id" TO "user_id";--> statement-breakpoint
ALTER TABLE "posts" RENAME COLUMN "user_Id" TO "user_id";--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_Id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_Id_users_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "like_index";--> statement-breakpoint
DROP INDEX IF EXISTS "user_idx";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "like_index" ON "likes" ("postId","user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "posts" ("user_id");