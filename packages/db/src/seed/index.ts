import { createCollection } from "../handlers/collectionsHandlers";
import { createUser } from "../handlers/usersHandlers";
import { COLLECTION_TYPE, collections } from "../schema/collections";
import { Collection } from "../types";
import { categories } from "./data";
import { fakeCollection, fakeUser } from "./fake";
import { randRecord, repeat } from "./utils";

const main = async () => {
  // ---------------- users ------------------ //
  console.log("generating fake users...");
  await repeat(10, async (i) => {
    return await createUser(fakeUser(i));
  });

  // ---------------- collections ------------------ //
  console.log("generating fake collections...");
  await repeat(10, async (i) => {
    return await createCollection(fakeCollection(i) as any);
  });
  // nested collections
  await repeat(10, async (i) => {
    return await createCollection({
      ...(fakeCollection(i) as any),
      parentId: (await randRecord<Collection>(collections))?.id,
    });
  });
  // categories
  await repeat(categories.length, async (i) => {
    const categorie = categories[i];
    return await createCollection({
      ...(fakeCollection(i) as any),
      name: categorie.name,
      // description: categorie.description,
      slug: categorie.slug,
      type: "CATEGORY",
      // metadata: categorie.metadata,
    });
  });

  //
};

(async () => {
  console.log("Seeding database...");
  await main();
  console.log("----- Seeding complete -----");
  process.exit(0);
})();
