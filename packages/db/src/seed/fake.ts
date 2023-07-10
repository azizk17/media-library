import { faker } from "@faker-js/faker";
import { UniqueEnforcer } from "enforce-unique";
import { COLLECTION_TYPE } from "../schema/collections";
import { ROLE } from "../schema/users";
import { randEnum } from "./utils";

const uniqueEmail = new UniqueEnforcer();
const uniqueCollection = new UniqueEnforcer();
export function fakeUser(i: number) {
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
    role: randEnum(ROLE) as any,
    emailVerified: null,
    image: faker.image.avatar(),
    preferences: "{}",
  };
}

export function fakeCollection(i: number) {
  // console.log("fakeCollection");
  // collection without id
  const name = faker.commerce.productAdjective();

  return {
    name,
    description: faker.company.catchPhrase(),
    slug: faker.helpers.slugify(name) + "-" + i,
    type: randEnum(COLLECTION_TYPE),

    metadata: {
      thumbnails: [faker.image.urlPicsumPhotos({ width: 200, height: 200 })],
    },
  };
}

// export function fakeMedia(i: number): Prisma.MediaCreateInput {
//   // console.log("fakeMedia");
//   // media without id
//   return {
//     name: faker.commerce.productName(),
//     description: faker.commerce.productDescription(),
//     mediaType: randomEnum(MediaType) as MediaType,
//     metadata: {
//       thumbnails: [faker.image.urlPicsumPhotos({ width: 200, height: 200 })],
//     },
//   };
// }

export function fakeSource(i: number) {
  // console.log("fakeSource");
  // source without id
  return {
    name: faker.company.name(),
    url: faker.internet.url(),
  };
}
