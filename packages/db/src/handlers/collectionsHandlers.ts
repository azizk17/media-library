import { asc, desc, eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { db } from "..";
import { collections } from "../schema/collections";
import { CollectionInput, GetManyProps } from "../types";

export const CREATE_COLLOCTION_SCHEMA = createInsertSchema(collections, {
  // parentId: z.number().optional(),
});

// set creating roles:
// 1. playlist is not nested

export const createCollection = async (collection: CollectionInput) => {
  // validate the input
  const validation = CREATE_COLLOCTION_SCHEMA.parse(collection);

  return db.insert(collections).values(collection).returning();
};

// get collection with pagination

export const getCollections = async ({ page = 1, limit = 1 }: GetManyProps) => {
  const offset = (page - 1) * limit;
  return db
    .select()
    .from(collections)
    .offset(offset)
    .orderBy(desc(collections.createdAt))
    .limit(limit);
};

export const getCollection = async (id: number) => {
  return db.select().from(collections).where(eq(collections.id, id));
};

export const updateCollection = async (collection: any) => {
  return db
    .update(collections)
    .set(collection)
    .where(eq(collections?.id, collection.id))
    .returning();
};

export const deleteCollection = async (id: number) => {
  return db.delete(collections).where(eq(collections.id, id)).returning();
};
