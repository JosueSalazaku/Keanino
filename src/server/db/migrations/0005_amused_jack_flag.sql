ALTER TABLE "post_tags" RENAME TO "postTags";--> statement-breakpoint
ALTER TABLE "comments" RENAME COLUMN "post_id" TO "postId";--> statement-breakpoint
ALTER TABLE "comments" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "likes" RENAME COLUMN "post_id" TO "postId";--> statement-breakpoint
ALTER TABLE "likes" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "media" RENAME COLUMN "post_id" TO "postId";--> statement-breakpoint
ALTER TABLE "postTags" RENAME COLUMN "post_id" TO "postId";--> statement-breakpoint
ALTER TABLE "postTags" RENAME COLUMN "tag_id" TO "tagId";--> statement-breakpoint
ALTER TABLE "posts" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "media" DROP CONSTRAINT "media_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "postTags" DROP CONSTRAINT "post_tags_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "postTags" DROP CONSTRAINT "post_tags_tag_id_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_users_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "like_index";--> statement-breakpoint
DROP INDEX IF EXISTS "post_tag_index";--> statement-breakpoint
DROP INDEX IF EXISTS "user_idx";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media" ADD CONSTRAINT "media_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postTags" ADD CONSTRAINT "postTags_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postTags" ADD CONSTRAINT "postTags_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "like_index" ON "likes" ("postId","userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "post_tag_index" ON "postTags" ("postId","tagId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "posts" ("userId");