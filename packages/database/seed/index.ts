import { fa } from "@faker-js/faker";
import { Collection, CollectionType, Media, User } from "@prisma/client";
import { prisma } from "../index";
import { categories } from "./data";
import {
  fakeCollection,
  fakeFile,
  fakeMedia,
  fakeSource,
  fakeUser,
} from "./models";
import { randomBoolean, randomRecord, repeat } from "./utils";

const main = async () => {
  console.log("Seeding...");

  // ----------- Users ------------ //
  console.log("Generating fake users...");
  await repeat(10, async (i: number) => {
    await prisma.user.create({
      data: fakeUser(i),
    });
  });

  // ----------- Categroies ------------ //
  // console.log("Generating fake categories...");
  // await repeat(10, async (i: number) => {
  //   await prisma.category.create({
  //     data: fakeCategory(i),
  //   });
  // });

  // ----------- Geners ------------ //
  // console.log("Generating fake genres...");
  // await repeat(10, async (i: number) => {
  //   await prisma.tag.create({
  //     data: fakeGenre(i),
  //   });
  // });

  // ----------- Categroies ------------ //
  console.log("Generating fake categories...");
  categories.forEach(async (category, i) => {
    await prisma.collection.create({
      data: {
        ...fakeCollection(i),
        name: category.name,
        slug: category.slug,
        type: CollectionType.CATEGORY,
      },
    });
  });

  // ----------- Collections ------------ //
  console.log("Generating fake collections...");
  await repeat(20, async (i: number) => {
    await prisma.collection.create({
      data: {
        ...fakeCollection(i),
        // parent colloction
        Collection: randomBoolean()
          ? {
              connect: {
                id: (await randomRecord<Collection>("Collection"))?.id,
              },
            }
          : undefined,
      },
    });
  });

  // ----------- Sources ------------ //
  console.log("Generating fake sources...");
  await repeat(50, async (i: number) => {
    await prisma.source.create({
      data: fakeSource(i),
    });
  });

  // ----------- Files ------------ //
  console.log("Generating fake files...");
  await repeat(100, async (i: number) => {
    await prisma.file.create({
      data: fakeFile(i),
    });
  });

  // ----------- Media ------------ //
  console.log("Generating fake media...");
  await repeat(1000, async (i: number) => {
    await prisma.media.create({
      data: {
        ...fakeMedia(i),
      },
    });
  });

  // ----------- Media in Collections------------ //
  console.log("Generating fake media in collections...");
  await repeat(1000, async (i: number) => {
    try {
      await prisma.mediaCollection.create({
        data: {
          Collection: {
            connect: { id: (await randomRecord<Collection>("Collection"))?.id },
          },
          Media: { connect: { id: (await randomRecord<Media>("Media"))?.id } },
          order: i,
          metadata: {},
        },
      });
    } catch (e: any) {
      console.log("Error in mediaCollection");
    }
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
