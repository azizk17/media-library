import {
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const ROLE = pgEnum("Role", [
  "USER",
  "ADMIN",
  "MODERATOR",
  "ANALYTICS_MANAGER",
]);

export const users = pgTable("users", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: ROLE("role").default("USER").notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  preferences: jsonb("preferences"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
