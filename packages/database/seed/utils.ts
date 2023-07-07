import { Prisma } from "@prisma/client";
import { prisma } from "../index";

export const randomEnum = (enumObj: any) => {
  const enumValues = Object.values(enumObj);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};

// async repeat
export const repeat = async (
  count: number,
  fn: (i: number) => Promise<any>
) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    // @ts-ignore
    arr.push(await fn(i));
  }
  return arr;
};

export const randomRecord = async (model: string, schema = "public") => {
  return await prisma.$queryRawUnsafe(
    `SELECT * FROM ${schema}."${model}" ORDER BY RANDOM() LIMIT 1`
  );
};
