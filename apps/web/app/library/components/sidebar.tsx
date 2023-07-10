import React from "react";
import Link from "next/link";
import {
  Bike,
  Book,
  Clipboard,
  Flame,
  Home,
  ListRestart,
  Mic,
  Music2,
  Tv,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/button";
import { ScrollArea } from "@/components/scroll-area";
import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

const nav = [
  {
    name: "Discover",
    section: true,
  },
  {
    name: "Browse",
    href: "#",
    icon: Home,
  },
  {
    name: "Made for you",
    href: "#",
    icon: User,
  },
  {
    name: "Recently played",
    href: "#",
    icon: ListRestart,
  },
  {
    name: "Trending",
    href: "#",
    icon: Flame,
  },
  {
    name: "Library",
    section: true,
  },
  {
    name: "Movies",
    href: "/library/c/movies",
    icon: Clipboard,
  },
  {
    name: "Tv shows",
    href: "#",
    icon: Tv,
  },
  {
    name: "Music",
    href: "#",
    icon: Music2,
  },
  {
    name: "Podcasts",
    href: "#",
    icon: Mic,
  },
  {
    name: "Sports",
    href: "#",
    icon: Bike,
  },
  {
    name: "Audiobooks",
    href: "#",
    icon: Book,
  },
];

export function Sidebar({ className, playlists }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="py-4 space-y-4">
        <div className="px-3 py-2">
          {nav.map((item, index) => (
            <React.Fragment key={index}>
              {item.section ? (
                <h2 className="px-4 py-2 mb-2 text-lg font-semibold tracking-tight">
                  {item.name}
                </h2>
              ) : (
                <div className="space-y-1">
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                        className: "justify-start w-full",
                      })
                    )}
                    href={item.href}
                  >
                    <>
                      {item.icon && <item.icon className="w-4 h-4 mr-2 " />}
                      {item.name}
                    </>
                  </Link>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="py-2">
          <h2 className="relative text-lg font-semibold tracking-tight px-7">
            Playlists
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="p-2 space-y-1">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="justify-start w-full font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-2"
                  >
                    <path d="M21 15V6" />
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M12 12H3" />
                    <path d="M16 6H3" />
                    <path d="M12 18H3" />
                  </svg>
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
