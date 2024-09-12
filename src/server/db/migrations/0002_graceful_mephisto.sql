ALTER TABLE "users" RENAME COLUMN "surname" TO "firstName";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "clerkId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "picture" varchar(2048);--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "age";