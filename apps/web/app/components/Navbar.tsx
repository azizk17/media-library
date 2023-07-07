import Link from "next/link";
import GitHub from "@/icons/GitHub";
import { Twitter, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/button";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => (
  <header className="sticky top-0 z-40 w-full bg-transparent">
    <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
      <div className="flex gap-6 md:gap-10">
        <Link href="/" className="items-center hidden space-x-2 md:flex">
          <Zap className="w-6 h-6" />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        {siteConfig.mainNav?.length ? (
          <nav className="hidden gap-6 md:flex">
            {siteConfig.mainNav?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </div>
      <div className="flex items-center justify-end flex-1 space-x-4">
        <nav className="flex items-center space-x-1">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              <GitHub className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              <Twitter className="w-5 h-5 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </div>
  </header>
);

export default Navbar;
