import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { AspectRatio } from "@/components/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/card";

type Props = {};

// 4 thimgs should be done here:
// 1. 16:9 aspect ratio for the thumbnail image, for youtube
// 2. 1:1 aspect ratio for the thumbnail image, for instagram
// 3. 9:16 aspect ratio for the thumbnail image, for youtube stories, tiktok, facebook stories
// 4. if post is tweet, then show the tweet
//
export function PostCard({
  id,
  title,
  description,
  thumbnail,
  createdAt,
  updatedAt,
  publishedAt,
  aspectRatio = 16 / 9,
}: Props) {
  const orintation = "landscape" as "landscape" | "portrait";

  const isLandscape = orintation === "landscape";
  const isPortrait = orintation === "portrait";

  const width = 900;
  const height = width * (isLandscape ? 1 / aspectRatio : aspectRatio);

  return (
    <div className="">
      <Card>
        <CardHeader className="p-1 bg-slate-900">
          <Link href={`/posts/${id}`}>
            <div className="flex items-start justify-center group">
              <div className="relative w-full bg-blue-300 ">
                <Duration duration={2222} />
                <AspectRatio ratio={aspectRatio} className="bg-muted">
                  <Image
                    src="https://picsum.photos/seed/2/600/600"
                    className="object-cover rounded-md group-hover:opacity-75"
                    fill
                    alt=""
                  />
                </AspectRatio>
              </div>
            </div>
          </Link>
        </CardHeader>
        <CardContent className="px-2 pt-2">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center space-x-2">
                <div className="flex flex-col space-y-1">
                  <div className="font-medium text-md">
                    <Link
                      href={`/posts/${id}`}
                      className="transition-colors duration-200 hover:text-primary"
                    >
                      {title}
                    </Link>
                  </div>
                  {/* <div className="text-xs text-muted-foreground">
                    2 hours ago
                  </div> */}
                </div>
              </div>
              {/* <div className="flex flex-row items-center space-x-2">
                <div className="flex flex-row items-center space-x-1">
                  <div className="text-xs text-muted-foreground">2</div>
                  <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-row items-center space-x-1">
                  <div className="text-xs text-muted-foreground">2</div>
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                </div>
              </div> */}
            </div>
            <div className=" turncate-2-lines text-muted-foreground">
              {description}
            </div>
            <div className="flex flex-row items-center justify-start space-x-3">
              <div className="flex flex-row items-center space-x-1">
                <div className="text-xs text-muted-foreground">2</div>
                <ThumbsUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex flex-row items-center space-x-1">
                <div className="text-xs text-muted-foreground">2</div>
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex flex-row items-center space-x-1">
                <div className="text-xs text-muted-foreground">2</div>
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const Duration = ({ duration }: { duration: number }) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  return (
    <div className="absolute z-10 flex flex-row items-center p-0.5 space-x-1 rounded-md bottom-2 right-2 bg-slate-900">
      <div className="text-sm font-semibold text-muted-foreground">
        {minutes}:{seconds}
      </div>
    </div>
  );
};
