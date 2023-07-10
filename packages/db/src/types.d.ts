import { InferModel } from "drizzle-orm";
import { collections } from "./schema/collections";

export type Result<T> = {
  data: T;
  error: string;
};
export type GetManyProps = {
  offset?: number; // offset or page
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  filter?: FilterProps;
};
export type FilterProps = {
  [key: string]: string;
};

// ====================================================== //
// ====================================================== //
// ====================================================== //
export type UserInput = InferModel<typeof users, "insert">; // insert type
type User = InferModel<typeof users, "select">;

export type CollectionInput = InferModel<typeof collections, "insert">;
export type Collection = InferModel<typeof collections, "select">;
