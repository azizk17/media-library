ALTER TABLE "collections" DROP CONSTRAINT "collections_nestedCollectionId_collections_id_fk";
--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "parentId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collections" ADD CONSTRAINT "collections_parentId_collections_id_fk" FOREIGN KEY ("parentId") REFERENCES "collections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "collections" DROP COLUMN IF EXISTS "nestedCollectionId";