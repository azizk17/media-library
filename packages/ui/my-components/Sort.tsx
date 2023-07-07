"use client";

import React, { useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  ArrowDownNarrowWide,
  ArrowUpWideNarrow,
  SortDesc,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Toggle } from "@/components/toggle";

export type SortOption = {
  column: string;
  value?: string;
  label?: string;
  toggle?: boolean;
  icon?: React.ReactNode;
};

type SortProps = {
  activeClass?: string;
  queryKey?: string;
  options: SortOption[];
};

///// TODO: Clear button
///// TODO: toggle desc/asc
export function Sort({
  activeClass = "text-primary",
  options,
  queryKey = "orderBy",
}: SortProps) {
  let [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // use callback to avoid re-rendering
  const currentSort = useCallback(() => {
    return searchParams.get(queryKey);
  }, [searchParams, queryKey]);

  const isActive = ({
    column,
    value,
    toggle,
  }: {
    column: string;
    value?: string;
    toggle?: boolean;
  }) => {
    if (!currentSort()) return false;
    if (toggle) {
      return (
        currentSort() === `${column}:asc` || currentSort() === `${column}:desc`
      );
    }

    const columnWithDirection = `${column}:${value}`;
    return currentSort() === columnWithDirection;
  };

  const handleChange = (
    column: string,
    { value, toggle }: { value?: string; toggle?: boolean }
  ) => {
    if (!value && !toggle) return;
    const query = new URLSearchParams(searchParams as any);

    if (!toggle && value) withOnlyValue(column, value);
    else withToggle(column);
  };

  const withToggle = (column: string) => {
    const query = new URLSearchParams(searchParams as any);
    const columnWithDirection = `${column}:asc`;
    // if the column is already sorted, toggle the direction
    if (query.has(queryKey) && columnWithDirection === query.get(queryKey)) {
      query.set(queryKey, `${column}:desc`);
    } else {
      query.set(queryKey, columnWithDirection);
    }
    startTransition(() => {
      router.push(`${pathname}?${query.toString()}`);
    });
  };

  const withOnlyValue = (column: string, value: string) => {
    const query = new URLSearchParams(searchParams as any);
    const columnWithDirection = `${column}:${value}`;
    // if the column is already sorted, do nothing
    if (query.has(queryKey) && columnWithDirection === query.get(queryKey)) {
      return;
    } else {
      query.set(queryKey, columnWithDirection);
    }
    startTransition(() => {
      router.push(`${pathname}?${query.toString()}`);
    });
  };

  // revoke the sort when click on the same sort button
  // !! not sure if this is needed.
  const handleRevoke = (value: string) => {
    if (!value) return;
    const query = new URLSearchParams(searchParams as any);
    if (query.has(queryKey) && value === query.get(queryKey)) {
      query.delete(queryKey);
      startTransition(() => {
        router.push(`${pathname}?${query.toString()}`);
      });
    }
  };

  const handleClear = () => {
    const query = new URLSearchParams(searchParams as any);
    if (query.has(queryKey)) {
      query.delete(queryKey);
      startTransition(() => {
        router.push(`${pathname}?${query.toString()}`);
      });
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={!!currentSort() ? "secondary" : "outline"}
            size="sm"
            className={cn({
              [activeClass]: !!currentSort(),
            })}
          >
            <SortDesc className={cn("w-4 h-4 mr-2")} />
            Sort
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col space-y-3">
            {options.map((option) => (
              <Toggle
                key={option.value || option.column}
                pressed={currentSort() === option.value}
                onPressedChange={() =>
                  handleChange(option.column, {
                    value: option.value,
                    toggle: option.toggle,
                  })
                }
                className={cn("text-sm flex justify-between items-center", {
                  [activeClass]: isActive({
                    column: option.column,
                    value: option.value,
                    toggle: option.toggle,
                  }), ///// TODO: activeClass is not working with Toggle
                })}
              >
                <div>
                  {option.icon} {option.label}{" "}
                </div>
                {option.toggle && (
                  <div className="flex items-center">
                    {currentSort() === `${option.column}:asc` && (
                      <ArrowUpWideNarrow className="w-3 h-3" />
                    )}
                    {currentSort() === `${option.column}:desc` && (
                      <ArrowDownNarrowWide className="w-3 h-3" />
                    )}
                  </div>
                )}
              </Toggle>
            ))}
            <Separator />
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear <XCircle className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* <RadioGroup name=queryKey onValueChange={handleChange}>
            <div className="flex flex-col space-y-2">
              {options.map((option) => (
                <label
                  key={option.value}
                  htmlFor={option.value}
                  className={cn(
                    "[&:has([data-state=checked])>div]:bg-sky-800",
                    {
                      "text-green-600": currentSort() === option.value,
                    }
                  )}
                >
                  <RadioGroupItem
                    value={option.value}
                    className="sr-only"
                    id={option.value}
                    onClick={() => handleRevoke(option.value)}
                  />
                  <div
                    className={cn(
                      "flex items-center justify-start",
                      buttonVariants({ variant: "ghost", size: "sm" })
                    )}
                  >
                    {option.icon}
                    {option.label}
                  </div>
                </label>
              ))}
            </div>
          </RadioGroup> */}
        </PopoverContent>
      </Popover>
    </div>
  );
}
