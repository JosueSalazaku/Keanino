import { sql } from 'drizzle-orm';

export default {
  up: async (db: any) => {
    await db.execute(sql`
      CREATE TYPE "userRole" AS ENUM ('user', 'Admin');
    `);
  },
  down: async (db: any) => {
    await db.execute(sql`
      DROP TYPE "userRole";
    `);
  },
};
