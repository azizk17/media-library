import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCollections } from "db/src/handlers/collectionsHandlers";
import { Eye } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "ui/components/card";
import { Separator } from "ui/components/separator";

// TODO: pagination, filters, sorting
// TODO: media card
// TODO: spcial collection page based on type

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    page: number;
    limit: number;
    sort: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const collections = await getCollections(searchParams);
  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        {/* <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p> */}
      </div>
      <Separator />
      Page: {params.slug}
      <pre>{JSON.stringify(collections, null, 2)}</pre>
      <div className="grid grid-cols-4 gap-5">
        {/* {media.map((item) => (
          <Card key={item.id} className="w-full">
            <CardHeader className="p-2">
              <div className="relative h-56 ">
                <Image
                  src={item.Media.metadata.thumbnails[0]}
                  fill
                  className="object-cover h-56 rounded-md"
                  alt={""}
                />
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <h3 className="text-lg font-medium">
                <Link href={`/library/media/${item.Media.id}`}>
                  {item.Media.name}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.Media.description}
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Eye size={16} /> <span>0</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))} */}
      </div>
    </div>
  );
}
