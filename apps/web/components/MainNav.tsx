"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();
  const chekPath = (path: string) => {
    // check for exact match or if path is a subpath of the current path and trailing slash is ignored
    return pathName === path || pathName.startsWith(path + "/");
  };
  const navItems = [
    {
      name: "Overview",
      href: "/",
    },
    {
      name: "Channels",
      href: "/channels",
    },
    {
      name: "Library",
      href: "/library",
    },
    // {
    //   name: "Products",
    //   href: "/examples/dashboard",
    // },
    {
      name: "Settings",
      href: "/settings",
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className={cn(
            "text-sm font-medium transition-colors text-muted-foreground hover:text-primary ",
            {
              "text-primary": chekPath(item.href),
            }
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
