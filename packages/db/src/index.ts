import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
// @ts-ignore
import postgres from "postgres";

// TODO: use env variables
const sql = postgres({
  host: process.env.DB_HOST ?? "localhost", // eslint-disable-line
  port: Number(process.env.DB_PORT), // eslint-disable-line
  user: "postgres", // eslint-disable-line
  password: "postgres", // eslint-disable-line
  database: "drizzle", // eslint-disable-line
});

export const db: PostgresJsDatabase = drizzle(sql);
