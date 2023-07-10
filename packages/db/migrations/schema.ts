import { pgTable, pgEnum, pgSchema, AnyPgColumn, varchar, timestamp, text, integer, foreignKey, jsonb, uniqueIndex, index, serial, primaryKey } from "drizzle-orm/pg-core"

export const collectionType = pgEnum("CollectionType", ['PLAYLIST', 'TV_SHOW', 'MUSIC_ALBUM', 'MUSIC', 'CATEGORY', 'TAG', 'COLLECTION'])
export const role = pgEnum("Role", ['USER', 'ADMIN', 'MODERATOR', 'ANALYTICS_MANAGER'])
export const authMethod = pgEnum("AuthMethod", ['PASSWORD', 'API_KEY', 'OAUTH'])
export const mediaType = pgEnum("MediaType", ['CLIP', 'MOVIE', 'TV_SERIES', 'NEWS_REPORT', 'DOCUMENTARY', 'MUSIC_VIDEO', 'LIVE_STREAM', 'PODCAST', 'AUDIOBOOK', 'VIDEO_GAME', 'SPORTS_EVENT', 'WEBINAR', 'INTERVIEW', 'SHORT_FILM', 'ANIMATION', 'EDUCATIONAL', 'TRAILER', 'TALK_SHOW', 'REALITY_SHOW', 'GAME_SHOW', 'COOKING_SHOW', 'TUTORIAL', 'VLOG', 'MAGAZINE', 'NEWS_ARTICLE', 'BLOG_POST', 'PHOTOGRAPHY', 'ARTWORK'])

import { sql } from "drizzle-orm"

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").notNull(),
});

export const media = pgTable("Media", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	metadata: jsonb("metadata").default({}),
	mediaType: mediaType("mediaType"),
	fileId: text("fileId").references(() => file.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const session = pgTable("Session", {
	id: text("id").primaryKey().notNull(),
	sessionToken: text("sessionToken").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionTokenKey: uniqueIndex("Session_sessionToken_key").on(table.sessionToken),
		userIdIdx: index("Session_userId_idx").on(table.userId),
	}
});

export const verificationToken = pgTable("VerificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		identifierTokenKey: uniqueIndex("VerificationToken_identifier_token_key").on(table.identifier, table.token),
		tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
	}
});

export const source = pgTable("Source", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	url: text("url"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
});

export const file = pgTable("File", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	url: text("url"),
	type: text("type"),
	width: integer("width"),
	height: integer("height"),
	size: integer("size"),
	duration: integer("duration"),
	format: text("format"),
	bitrate: integer("bitrate"),
	metadata: jsonb("metadata"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
});

export const collection = pgTable("Collection", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	releaseDate: timestamp("releaseDate", { precision: 3, mode: 'string' }),
	type: collectionType("type").notNull(),
	metadata: jsonb("metadata"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	nestedCollectionId: text("nestedCollectionId"),
	slug: text("slug").notNull(),
},
(table) => {
	return {
		nestedCollectionIdKey: uniqueIndex("Collection_nestedCollectionId_key").on(table.nestedCollectionId),
		slugKey: uniqueIndex("Collection_slug_key").on(table.slug),
		collectionNestedCollectionIdFkey: foreignKey({
			columns: [table.nestedCollectionId],
			foreignColumns: [table.id]
		}).onUpdate("cascade").onDelete("set null"),
	}
});

export const user = pgTable("User", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	password: text("password"),
	email: text("email"),
	role: role("role").default('USER').notNull(),
	emailVerified: timestamp("emailVerified", { precision: 3, mode: 'string' }),
	image: text("image"),
	preferences: jsonb("preferences").default({}),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
	}
});

export const watchedMedia = pgTable("WatchedMedia", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	mediaId: text("mediaId").notNull().references(() => media.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
});

export const transcript = pgTable("Transcript", {
	id: serial("id").primaryKey().notNull(),
	language: text("language").notNull(),
	fileId: text("fileId").notNull().references(() => file.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	mediaId: text("mediaId").references(() => media.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const mediaCollection = pgTable("MediaCollection", {
	mediaId: text("mediaId").notNull().references(() => media.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	collectionId: text("collectionId").notNull().references(() => collection.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	order: integer("order"),
	metadata: jsonb("metadata"),
},
(table) => {
	return {
		mediaCollectionPkey: primaryKey(table.mediaId, table.collectionId)
	}
});

export const account = pgTable("Account", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		providerProviderAccountIdKey: uniqueIndex("Account_provider_providerAccountId_key").on(table.provider, table.providerAccountId),
		userIdIdx: index("Account_userId_idx").on(table.userId),
	}
});

export const favoriteMedia = pgTable("FavoriteMedia", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	mediaId: text("mediaId").notNull().references(() => media.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
});