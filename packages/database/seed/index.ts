import { User } from "@prisma/client";
import { prisma } from "../index";
import { randomRecord, repeat } from "./utils";

const main = async () => {
  console.log("Seeding...");

  // ----------- Users ------------ //
  console.log("Generating fake users...");
  await repeat(10, async (i: number) => {
    await prisma.user.create({
      // data: fakeUser(i),
    });
  });

  // --------
}; //! end of main

main()
  .then(async () => {
    console.log("Seeding done!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
