import React from "react";
import Image from "next/image";
import { Locale } from "@/my-components/Locale";
import { PlatformIcon } from "@/my-components/platform-icon";

type Props = {
  name: string;
  platformName: string;
  country: string;
  language: string;
  thumbnail: string;
};

export function ChannelHead({
  name,
  platformName,
  country,
  language,
  thumbnail,
}: Props) {
  return (
    <div className="flex space-x-3 ">
      <Image
        className="w-16 h-16 rounded-md "
        src={thumbnail}
        alt=""
        height={500}
        width={500}
      />
      <div className="flex flex-col justify-center space-y-1 ">
        <div className="flex items-center space-x-2 group">
          <h2 className="text-lg font-semibold tracking-tight group-hover:text-primary">
            {name}
          </h2>
          <PlatformIcon
            name={platformName}
            className="w-8 h-8 text-muted-foreground group-hover:text-primary"
          />
        </div>
        <Locale
          cCode={country}
          lCode={language}
          flag={true}
          native={true}
          className="text-sm text-muted-foreground"
        />
      </div>
    </div>
  );
}
