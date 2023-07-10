import { Metadata } from "next";
import Image from "next/image";
import { Home, Plus } from "lucide-react";
import { cn } from "ui/lib/utils";
import { Button } from "@/components/button";
import { ScrollArea, ScrollBar } from "@/components/scroll-area";
import { Separator } from "@/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { AlbumArtwork } from "./components/album-artwork";
import { Menu } from "./components/menu";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";
import { Sidebar } from "./components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import { playlists } from "./data/playlists";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
