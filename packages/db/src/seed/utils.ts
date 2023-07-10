import { sql } from "drizzle-orm";
import { PgEnum } from "drizzle-orm/pg-core";
import { db } from "..";

// get random record from table
export async function randRecord<T>(table: any) {
  const record = await db
    .select()
    .from(table)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  if (!record[0]) {
    console.log(`No records found in table ${table?.name}`);
    return;
  }
  return record[0] as T;
}

// random form PgEnum
export const randEnum = (pgEnum: PgEnum<[string, ...string[]]>) => {
  const values = pgEnum.enumValues;
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as keyof typeof pgEnum.enumValues;
};

// random element from array
export const randArrElement = (arr: any[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
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
      console.log("Error: ", e);
    }
  }
  return arr;
};

// random boolean
export function randBool(): boolean {
  return Math.random() < 0.5;
}
