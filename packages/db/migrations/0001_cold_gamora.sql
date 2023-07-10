ALTER TABLE "collections" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "collections" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "collections" DROP COLUMN IF EXISTS "updatedAt";