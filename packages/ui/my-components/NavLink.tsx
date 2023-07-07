"use client";

import React from "react";
import Link from "next/link";
import {
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/button";

type Props = {
  href: string;
  children: React.ReactNode;
};

// TODO: disable active link when on the same page
export function NavLink({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = `${pathname}` === href;
  // selectedLayoutSegments.find((layout) => `/${layout}` === href)
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        {
          "bg-primary-foreground text-primary cursor-default  hover:bg-none hover:bg-primary-foreground hover:text-primary font-semibold":
            isActive,
        },
        {
          " text-muted-foreground": !isActive,
        }
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
