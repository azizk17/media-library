"use client";

/**
 * Client Side Pagination
 * This is a pagination component that is prefect when you make pagination logic on client side
 *
 */
import { FC, PropsWithChildren, useCallback } from "react";
import Link, { LinkProps } from "next/link";
///// TODO: page params shouls start from 1 instead of 0

import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

type Props = {
  page?: number;
  total: number;
  pathname?: string;
  pageSize?: number; // take
};

// const cleanPath = asPath.split('#')[0].split('?')[0];

const btnClass =
  "block px-3 py-2 ml-0 rounded-lg leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";

const paginationResultText = (
  page: number,
  total: number,
  itemsOnPage: number
) => {
  const numberOfPages = Math.ceil(total / itemsOnPage),
    start = (page - 1) * itemsOnPage + 1,
    end = Math.min(page * itemsOnPage, total);
  return (
    <div>
      Showing results <span className="font-semibold ">{start}</span> to{" "}
      <span className="font-semibold ">{end}</span> of{" "}
      <span className="font-semibold ">{total}</span>
    </div>
  );
};

export function Pagination({ page = 1, total = 0, pageSize = 10 }: Props) {
  const nextPage = Number(page) + 1;
  const prevPage = Number(page) - 1;
  const pageCount = Math.ceil(total / pageSize);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < pageCount;

  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams as any);
      params.set(name, String(value));

      return params.toString();
    },
    [searchParams]
  );
  // ------------  ------------ //
  // !! dont show pagination if there is only one page
  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between w-full ">
      <div className="flex items-center justify-start space-x-2 ">
        <LinkWrapper
          href={
            hasPreviousPage
              ? pathname + "?" + createQueryString("page", prevPage)
              : {}
          }
        >
          {/* Previous */}
          <PrevIcon />
        </LinkWrapper>
        <PagesNumbers
          pageCount={pageCount}
          page={page}
          pathname={pathname}
          createQueryString={createQueryString}
        />
        <LinkWrapper
          href={
            hasNextPage
              ? pathname + "?" + createQueryString("page", nextPage)
              : {}
          }
        >
          {/* NEXT */}
          <NextIcon />
        </LinkWrapper>
      </div>
      <div>{paginationResultText(page, total, pageSize)}</div>
    </div>
  );
}

const LinkWrapper = ({
  href,
  children,
  ...props
}: PropsWithChildren<LinkProps>) => {
  if (!Object.keys(href).length) {
    return (
      //<button className=" btn btn-sm btn-disabled" {...props}>
      <button disabled className={clsx(btnClass)}>
        {children}
      </button>
    );
  }
  return (
    <Link className={clsx(btnClass)} href={href} {...props}>
      {children}
    </Link>
  );
};
// // const NextPageButton = () => {
// //   return <div>{canGoNext && <button className="btn btn-sm">Next</button>}</div>;
// // };

type PagesNumbersProps = {
  pageCount: number;
  page: number;
  pathname: string;
  createQueryString(name: string, value: string | number): string;
};
const PagesNumbers: FC<PagesNumbersProps> = ({
  pageCount,
  page,
  pathname,
  createQueryString,
}) => {
  return (
    <>
      {[...Array(pageCount)].map((e, i) => (
        <Link
          href={pathname + "?" + createQueryString("page", i + 1)}
          key={i}
          className={clsx(btnClass, {
            "!bg-slate-300 dark:!bg-slate-600 font-semibold": page == i + 1,
          })}
        >
          <button>{i + 1}</button>
        </Link>
      ))}
    </>
  );
};

const PaginatioButton = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx("btn btn-sm", disabled ? "btn-disabled" : "btn-primary")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const PrevIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
      clipRule="evenodd"
    />
  </svg>
);

const NextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
      clipRule="evenodd"
    />
  </svg>
);
