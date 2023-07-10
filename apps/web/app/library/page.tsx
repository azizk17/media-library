import React from "react";
import { Plus } from "lucide-react";
import { Button } from "ui/components/button";
import { ScrollArea, ScrollBar } from "ui/components/scroll-area";
import { Separator } from "ui/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import { AlbumArtwork } from "./components/album-artwork";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";

type Props = {};

export default function Page({}: Props) {
  return (
    <Tabs defaultValue="music" className="h-full space-y-6">
      <div className="flex items-center space-between">
        <TabsList>
          <TabsTrigger value="music" className="relative">
            Music
          </TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="live" disabled>
            Live
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto mr-4">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add music
          </Button>
        </div>
      </div>
      <TabsContent value="music" className="p-0 border-none outline-none">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Listen Now
            </h2>
            <p className="text-sm text-muted-foreground">
              Top picks for you. Updated daily.
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="relative">
          <ScrollArea>
            <div className="flex pb-4 space-x-4">
              {listenNowAlbums.map((album) => (
                <AlbumArtwork
                  key={album.name}
                  album={album}
                  className="w-[250px]"
                  aspectRatio="portrait"
                  width={250}
                  height={330}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="mt-6 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Made for You
          </h2>
          <p className="text-sm text-muted-foreground">
            Your personal playlists. Updated daily.
          </p>
        </div>
        <Separator className="my-4" />
        <div className="relative">
          <ScrollArea>
            <div className="flex pb-4 space-x-4">
              {madeForYouAlbums.map((album) => (
                <AlbumArtwork
                  key={album.name}
                  album={album}
                  className="w-[150px]"
                  aspectRatio="square"
                  width={150}
                  height={150}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </TabsContent>
      <TabsContent
        value="podcasts"
        className="h-full flex-col border-none p-0 data-[state=active]:flex"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              New Episodes
            </h2>
            <p className="text-sm text-muted-foreground">
              Your favorite podcasts. Updated daily.
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <PodcastEmptyPlaceholder />
      </TabsContent>
    </Tabs>
  );
}
