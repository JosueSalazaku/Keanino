ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "userId" SET DATA TYPE varchar(255);