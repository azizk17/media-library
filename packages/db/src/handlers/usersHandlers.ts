import { InferModel, eq } from "drizzle-orm";
import { db } from "../";
import { users } from "../schema/users";

export type NewUser = InferModel<typeof users, "insert">; // insert type
type User = InferModel<typeof users, "select">;

export const createUser = async (user: NewUser) => {
  return db.insert(users).values(user).returning();
};
export const gettUser = async (user: User) => {
  return db.select().from(users).where(eq(users.id, user.id));
};
export const getUsers = async () => {
  return db.select().from(users);
};
export const updateUser = async (user: User) => {
  return db.update(users).set(user).where(eq(users.id, user.id)).returning();
};

export const deleteUser = async (user: User) => {
  return db.delete(users).where(eq(users.id, user.id)).returning();
};
