import { sql } from 'drizzle-orm';
import { index, pgTableCreator, serial, timestamp, varchar, uuid, integer, pgEnum, uniqueIndex, } from 'drizzle-orm/pg-core';

import * as types from '../../types';

const UserRole = pgEnum('userRole', ['user', 'Admin']);
const createTable = pgTableCreator((name) => `kelly-blog_${name}`);

export const users = createTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  surname: varchar('surname', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  age: integer('age').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: UserRole('userRole').default('user').notNull(),
}, (table) => ({
  emailIndex: uniqueIndex('emailIndex').on(table.email),
}));

export const posts = createTable('posts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
  content: varchar('content', { length: 1000 }).notNull(), // Defined content as varchar with length 1000
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
}, (table) => ({
  nameIndex: index('name_idx').on(table.name),
  userIndex: index('user_idx').on(table.userId),
}));

