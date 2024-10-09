import { sql } from 'drizzle-orm';
import { index, pgTableCreator, serial, timestamp, varchar, uuid, integer, uniqueIndex, text } from 'drizzle-orm/pg-core';

const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  firstName: varchar('firstName', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  clerkId: text('clerk_id').notNull().unique(), // Ensure clerkId is unique
  pictureUrl: text('picture_url').notNull(),
  role: varchar('role', { length: 50 }).default('user').notNull(),
}, (table) => ({
  emailIndex: uniqueIndex('emailIndex').on(table.email),
  clerkIdUniqueIndex: uniqueIndex('clerk_id_unique').on(table.clerkId), 
}));

export const posts = createTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  userId: text('user_id').notNull().references(() => users.clerkId), // Foreign key references clerkId in users table
  content: text('content').notNull(),
  pictureUrl: text('picture_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  titleIndex: index('title_idx').on(table.title),
  userIndex: index('user_idx').on(table.userId),
}));

export const comments = createTable('comments', {
  id: serial('id').primaryKey(),
  postId: uuid('postId').notNull().references(() => posts.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  content: varchar('content', { length: 1000 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),  // Track updates
});

export const tags = createTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const postTags = createTable('postTags', {
  postId: uuid('postId').notNull().references(() => posts.id),
  tagId: integer('tagId').notNull().references(() => tags.id),
}, (table) => ({
  postTagIndex: uniqueIndex('post_tag_index').on(table.postId, table.tagId),
}));

export const likes = createTable('likes', {
  postId: uuid('postId').notNull().references(() => posts.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  likeIndex: uniqueIndex('like_index').on(table.postId, table.userId),
}));

export const followers = createTable('followers', {
  followerId: uuid('follower_id').notNull().references(() => users.id),
  followingId: uuid('following_id').notNull().references(() => users.id),
}, (table) => ({
  followIndex: uniqueIndex('follow_index').on(table.followerId, table.followingId),
}));

export const media = createTable('media', {
  id: serial('id').primaryKey(),
  postId: uuid('postId').notNull().references(() => posts.id),
  url: varchar('url', { length: 2048 }).notNull(),
  mediaType: varchar('media_type', { length: 50 }).notNull(),
});
