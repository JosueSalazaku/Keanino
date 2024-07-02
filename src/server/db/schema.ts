import { sql } from 'drizzle-orm';
import { index, pgTableCreator, serial, timestamp, varchar, uuid, integer, uniqueIndex } from 'drizzle-orm/pg-core';

import * as types from '../../types';

const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  surname: varchar('surname', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  age: integer('age').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('user').notNull(),
}, (table) => ({
  emailIndex: uniqueIndex('emailIndex').on(table.email),
}));

export const posts = createTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(), // Changed to uuid
  name: varchar('name', { length: 256 }).notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
  content: varchar('content', { length: 1000 }).notNull(),
  pictureUrl: varchar('picture_url', { length: 2048 }),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  nameIndex: index('name_idx').on(table.name),
  userIndex: index('user_idx').on(table.userId),
}));

export const comments = createTable('comments', {
  id: serial('id').primaryKey(),
  postId: uuid('post_id').notNull().references(() => posts.id), // Ensure this is uuid
  userId: uuid('user_id').notNull().references(() => users.id),
  content: varchar('content', { length: 1000 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const tags = createTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const postTags = createTable('post_tags', {
  postId: uuid('post_id').notNull().references(() => posts.id),
  tagId: integer('tag_id').notNull().references(() => tags.id),
}, (table) => ({
  postTagIndex: uniqueIndex('post_tag_index').on(table.postId, table.tagId),
}));

export const likes = createTable('likes', {
  postId: uuid('post_id').notNull().references(() => posts.id),
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
  postId: uuid('post_id').notNull().references(() => posts.id),
  url: varchar('url', { length: 2048 }).notNull(),
  mediaType: varchar('media_type', { length: 50 }).notNull(),
});
