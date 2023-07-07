import React from "react";
import { countries, getEmojiFlag, languages } from "countries-list";

type Props = {
  cCode?: string; // country code
  lCode?: string; // language code
  currency?: string;
  timezone?: string;
  className?: string;
  native?: boolean;
  flag?: boolean;
};

export function Locale({
  cCode,
  lCode,
  currency,
  timezone,
  className,
  flag,
  native,
}: Props) {
  const country = cCode ? countries[cCode] : null;
  const language = lCode ? languages[lCode] : null;

  console.log("country -         -- - - -- - - - - --  -- - - ", country);
  console.log("language", language);
  if (!country && !language) {
    return null;
  }

  const countryName = native ? country?.native : country?.name;
  const languageName = native ? language?.native : language?.name;

  return (
    <span className={className}>
      {flag && cCode && <span className="mr-1">{getEmojiFlag(cCode)}</span>}
      {countryName && <span className="mr-1">{countryName}</span>}
      {languageName && countryName && <span className="mr-1">|</span>}
      {languageName && <span>{languageName}</span>}
    </span>
  );
}
