import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

// this will automatically run needed migrations on the database
(async () => {
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log("Migration complete");
  process.exit(0);
})();
