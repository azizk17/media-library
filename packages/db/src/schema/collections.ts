import {
  AnyPgColumn,
  foreignKey,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const COLLECTION_TYPE = pgEnum("CollectionType", [
  "PLAYLIST",
  "TV_SHOW",
  "MUSIC_ALBUM",
  "MUSIC",
  "CATEGORY",
  "TAG",
  "COLLECTION",
]);

export const AUTH_METHOD = pgEnum("AuthMethod", [
  "PASSWORD",
  "API_KEY",
  "OAUTH",
]);
export const MEDIA_TYPE = pgEnum("MediaType", [
  "CLIP",
  "MOVIE",
  "TV_SERIES",
  "NEWS_REPORT",
  "DOCUMENTARY",
  "MUSIC_VIDEO",
  "LIVE_STREAM",
  "PODCAST",
  "AUDIOBOOK",
  "VIDEO_GAME",
  "SPORTS_EVENT",
  "WEBINAR",
  "INTERVIEW",
  "SHORT_FILM",
  "ANIMATION",
  "EDUCATIONAL",
  "TRAILER",
  "TALK_SHOW",
  "REALITY_SHOW",
  "GAME_SHOW",
  "COOKING_SHOW",
  "TUTORIAL",
  "VLOG",
  "MAGAZINE",
  "NEWS_ARTICLE",
  "BLOG_POST",
  "PHOTOGRAPHY",
  "ARTWORK",
]);

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  releaseDate: timestamp("releaseDate", { precision: 3, mode: "string" }),
  type: COLLECTION_TYPE("type").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  parentId: integer("parentId").references((): AnyPgColumn => collections.id),
  slug: text("slug").notNull(),
  // },
  // (table) => {
  //   return {
  //     nestedCollectionIdKey: uniqueIndex(
  //       "Collection_nestedCollectionId_key"
  //     ).on(table.nestedCollectionId),
  //     slugKey: uniqueIndex("collection_slug_key").on(table.slug),
  //     collectionNestedCollectionIdFkey: foreignKey({
  //       columns: [table.nestedCollectionId],
  //       foreignColumns: [table.id],
  //     })
  //       .onUpdate("cascade")
  //       .onDelete("set null"),
  //   };
});
