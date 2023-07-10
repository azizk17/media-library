import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
  path: "../../.env",
});

export default {
  schema: "./src/schema/*",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.DB_HOST ?? "localhost", // eslint-disable-line
    port: Number(process.env.DB_PORT), // eslint-disable-line
    user: process.env.DB_USER, // eslint-disable-line
    password: process.env.DB_PASSWORD, // eslint-disable-line
    // database: process.env.DB_DATABASE ?? "drizzle",
    database: "drizzle",
  },
} satisfies Config;
