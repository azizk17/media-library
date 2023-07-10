/**
 *
 *  This file contains the functions to generate fake data for the database.
 *  The functions are used in the main function in seed/index.ts to seed the database.
 *
 * !! IMPORTANT !!
 * These functions do not include relations to other tables.
 *
 */

import { fa, faker } from "@faker-js/faker";
import { CollectionType, MediaType, Prisma, Role, User } from "@prisma/client";
import { EnforceUniqueError, UniqueEnforcer } from "enforce-unique";
import { countries, languages, videos } from "./data";
import { randomEnum } from "./utils";

const uniqueEmail = new UniqueEnforcer();
const uniqueCollection = new UniqueEnforcer();

export function fakeUser(i: number): Prisma.UserCreateInput {
  // console.log("fakeUser");
  // user without id
  const firstName = faker.person.firstName();
  const email = uniqueEmail.enforce(() => {
    return faker.internet.email({ firstName });
  });
  return {
    name: firstName,
    email: email,
    password: faker.internet.password(),
    role: randomEnum(Role) as Role,
    emailVerified: null,
    image: faker.image.avatar(),
    preferences: "{}",
  };
}

export function fakeCollection(i: number): Prisma.CollectionCreateInput {
  // console.log("fakeCollection");
  // collection without id
  const name = faker.commerce.productAdjective();

  return {
    name,
    description: faker.company.catchPhrase(),
    slug: faker.helpers.slugify(name) + "-" + i,
    type: randomEnum(CollectionType) as CollectionType,
    metadata: {
      thumbnails: [faker.image.urlPicsumPhotos({ width: 200, height: 200 })],
    },
  };
}

export function fakeMedia(i: number): Prisma.MediaCreateInput {
  // console.log("fakeMedia");
  // media without id
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    mediaType: randomEnum(MediaType) as MediaType,
    metadata: {
      thumbnails: [faker.image.urlPicsumPhotos({ width: 200, height: 200 })],
    },
  };
}

export function fakeSource(i: number): Prisma.SourceCreateInput {
  // console.log("fakeSource");
  // source without id
  return {
    name: faker.company.name(),
    url: faker.internet.url(),
  };
}

export function fakeFile(i: number): Prisma.FileCreateInput {
  // console.log("fakeFile");
  // file without id
  return {
    name: faker.system.fileName(),
    url: faker.internet.url(),
    size: faker.number.int({ min: 100, max: 1000000 }),
    type: faker.system.mimeType(),
  };
}

// export function fakeCategory(i: number): Prisma.CategoryCreateInput {
//   return {
//     name: faker.commerce.department() + "_" + i, // keep unique
//   };
// }

// export function fakeGenre(i: number): Prisma.TagCreateInput {
//   return {
//     name: faker.music.genre() + "_" + i, // keep unique
//   };
// }
