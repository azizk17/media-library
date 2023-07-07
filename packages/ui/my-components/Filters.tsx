"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterIcon, LucideIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { FacedFilter } from "./faced-filter";

export type FilterOption = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

export type FilterProps = {
  title?: string;
  column: string;
  multi?: boolean;
  options: FilterOption[];
};

type Props = {
  activeClass?: string;
  clearFilter?: () => void;
  items: FilterProps[];
};

export function Filters({ items, activeClass = "text-sky-400" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasFilters, setHasFilters] = React.useState(false);

  //--------------------------------------------//
  // filter options
  //--------------------------------------------//

  const hasFilter = React.useMemo(() => {
    const params = new URLSearchParams(searchParams as any);
    const hasFilter = items.some((filter) => {
      const value = params.get(filter.column);
      return !!value;
    });
    return hasFilter;
  }, [searchParams, items]);

  React.useEffect(() => {
    setHasFilters(hasFilter);
  }, [hasFilter]);

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams as any);
    items.map((filter) => {
      params.delete(filter.column);
    });
    router.push(`${pathname}?${params.toString()}`);
    console.log("clear filter");
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={!!hasFilter ? "secondary" : "outline"}
            size="sm"
            className={cn({
              [activeClass]: !!hasFilter,
            })}
          >
            <FilterIcon className={cn("w-4 h-4 mr-2")} />
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent className="min-w-max ">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-dashed"
              onClick={clearFilter}
            >
              Clear
              <XIcon className="w-4 h-4 ml-2" />
            </Button>
            {items.map((filter) => (
              <FacedFilter
                key={filter.column}
                title={filter.title}
                column={filter.column}
                options={filter.options}
                multi={filter.multi}
                activeClass={activeClass}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
