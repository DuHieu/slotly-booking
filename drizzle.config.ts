import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  try {
    process.loadEnvFile(".env.local");
  } catch {
    // ignore if .env.local not found
  }
}

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString!,
  },
} satisfies Config;
