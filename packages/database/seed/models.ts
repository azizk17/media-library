import { fa, faker } from "@faker-js/faker";
import { Prisma, Role, User } from "@prisma/client";
import { countries, languages, videos } from "./data";
import { randomEnum } from "./utils";

export function fakeUser(i: number): Prisma.UserCreateInput {
  // console.log("fakeUser");
  // user without id
  return {
    name: faker.person.lastName(),
    email: faker.internet.email({ lastName: faker.person.lastName() }),
    password: faker.internet.password(),
    role: randomEnum(Role) as Role,
    emailVerified: null,
    image: faker.image.avatar(),
    preferences: "{}",
  };
}
