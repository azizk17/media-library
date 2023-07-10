import { Prisma } from "@prisma/client";
import { prisma } from "../index";

export const randomEnum = (enumObj: any) => {
  const enumValues = Object.values(enumObj);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};

// async repeat, catch errors
//? NOTE:  for convenience and to avoid try/catch blocks in main function, errors are caught here
export const repeat = async (
  count: number,
  fn: (i: number) => Promise<any>
) => {
  const arr = [];

  for (let i = 0; i < count; i++) {
    try {
      // @ts-ignore
      arr.push(await fn(i));
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("Error: ", e.code);
      }
    }
  }
  return arr;
};

export async function randomRecord<T>(
  model: string,
  schema = "public"
): Promise<T | undefined> {
  const q: any = await prisma.$queryRawUnsafe(
    `SELECT * FROM ${schema}."${model}" ORDER BY RANDOM() LIMIT 1`
  );

  if (q.length === 0) {
    return undefined;
    // throw new Error(`No records found for ${model}`);
  }

  return q[0] as T;
}

export function randomBoolean(): boolean {
  return Math.random() < 0.5;
}
