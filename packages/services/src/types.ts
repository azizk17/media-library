import { Prisma } from "database";

type PaginationParams = {
  page?: number;
  pageSize?: number;
};

export type GetManyParams<T> = PaginationParams & Partial<T>;

export type GetManyResponse<T> = [data: T[], count: number];

type FindUniqueArgsWithoutWhere<T> = Omit<FindUniqueArgs<T>, "where">;
