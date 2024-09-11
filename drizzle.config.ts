import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  dbCredentials: {
    url: process.env
      .NEXT_PUBLIC_SUPABASE_URL ?? "", // Make sure this environment variable is correctly set
  },
});
