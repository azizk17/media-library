"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CheckIcon, LucideIcon, SortAsc } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";

interface FilterOption {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface FacedFilterProps {
  column: string;
  options: FilterOption[];
  title?: string;
  multi?: boolean;
  searchPlaceholder?: string;
  activeClass?: string;
}

export function FacedFilter({
  title,
  column,
  options,
  multi = true,
  activeClass = "text-sky-400",
  searchPlaceholder = "Search...",
}: FacedFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValue] = React.useState<string[]>([]);

  // get selected value from query string

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // query string with multi-value toggle
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as any);
      // ------------ clear pagination ------------ //
      // clear pagination when filter is changed to avoid showing empty page

      params.has("page") && params.delete("page");

      // ------------ single value toggle ------------ //

      console.log("name", name, "value", value);
      if (!multi) {
        // Single value toggle
        if (params.has(name)) {
          params.get(name) === value
            ? params.delete(name)
            : params.set(name, value);
        } else {
          params.set(name, value);
        }
        return params.toString();
      }

      // ------------ multi value toggle ------------ //
      if (params.has(name)) {
        //  check if value is already in the list
        const values = params.getAll(name);
        if (values.includes(value)) {
          // Value exists, remove it
          const updatedValues = values.filter((val) => val !== value);
          params.delete(name);
          // Add updated values back
          updatedValues.forEach((val) => params.append(name, val));
        } else if (values.includes("null")) {
          // Null value exists, replace it with the new value
          params.delete(name);
          values.forEach((val) => {
            if (val !== null) {
              params.append(name, val);
            }
          });
          params.append(name, value);
        } else {
          // Value doesn't exist, add it
          params.append(name, value);
        }
      } else {
        params.append(name, value);
      }

      //   params.has(name) ? params.delete(name) : params.set(name, value);
      return params.toString();
    },
    [searchParams, multi]
  );

  const clear = () => {
    const params = new URLSearchParams(searchParams as any);
    params.delete(column);
    // setSelectedValue([]);
    router.push(`${pathname}?${params.toString()}`);
  };
  const handleSelect = (option: string, value: string) => {
    const queryString = createQueryString(option, value);
    router.push(`${pathname}?${queryString}`);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams as any);
    const values = params.getAll(column);
    setSelectedValue(values);
  }, [searchParams, column]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={selectedValues.length > 0 ? "secondary" : "outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {/* {value
            ? options.find((opt) => opt.value === value)?.label
            : "Select one..."} */}
          {/* TODO: display labels not values */}
          {selectedValues.length > 2 && (
            <span className="text-sm text-gray-500">
              {selectedValues.length} selected
            </span>
          )}
          {selectedValues.length > 0 && selectedValues.length <= 2
            ? selectedValues
                .map((val) => options.find((opt) => opt.value === val)?.label)
                .join(", ")
            : title || "Select one..."}

          {/* {selectedValues.length > 0
            ? selectedValues.join(", ")
            : title || "Select one..."} */}

          <SortAsc className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                value={opt.value}
                onSelect={(currentValue) => {
                  //   setValue(currentValue === value ? "" : currentValue);
                  //   console.log("currentValue", currentValue, "opt", opt);
                  setOpen(false);
                  handleSelect(column, currentValue);
                }}
                className={cn(
                  "flex items-center",
                  selectedValues.includes(opt.value) && activeClass
                )}
              >
                {opt.icon && <opt.icon className="w-4 h-4 mr-2" />} {opt.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedValues.includes(opt.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                clear();
              }}
            >
              Clear
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
