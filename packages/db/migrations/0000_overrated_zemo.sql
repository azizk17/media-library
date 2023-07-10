DO $$ BEGIN
 CREATE TYPE "AuthMethod" AS ENUM('PASSWORD', 'API_KEY', 'OAUTH');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "CollectionType" AS ENUM('PLAYLIST', 'TV_SHOW', 'MUSIC_ALBUM', 'MUSIC', 'CATEGORY', 'TAG', 'COLLECTION');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "MediaType" AS ENUM('CLIP', 'MOVIE', 'TV_SERIES', 'NEWS_REPORT', 'DOCUMENTARY', 'MUSIC_VIDEO', 'LIVE_STREAM', 'PODCAST', 'AUDIOBOOK', 'VIDEO_GAME', 'SPORTS_EVENT', 'WEBINAR', 'INTERVIEW', 'SHORT_FILM', 'ANIMATION', 'EDUCATIONAL', 'TRAILER', 'TALK_SHOW', 'REALITY_SHOW', 'GAME_SHOW', 'COOKING_SHOW', 'TUTORIAL', 'VLOG', 'MAGAZINE', 'NEWS_ARTICLE', 'BLOG_POST', 'PHOTOGRAPHY', 'ARTWORK');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Role" AS ENUM('USER', 'ADMIN', 'MODERATOR', 'ANALYTICS_MANAGER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"releaseDate" timestamp(3),
	"type" "CollectionType" NOT NULL,
	"metadata" jsonb,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"nestedCollectionId" integer,
	"slug" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"role" "Role" DEFAULT 'USER' NOT NULL,
	"email_verified" timestamp,
	"image" text,
	"preferences" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collections" ADD CONSTRAINT "collections_nestedCollectionId_collections_id_fk" FOREIGN KEY ("nestedCollectionId") REFERENCES "collections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
