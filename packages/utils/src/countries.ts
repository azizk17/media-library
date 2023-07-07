import { countries, languages } from "countries-list";

// ====================================================== //
// ========================== Country ========================== //
// ====================================================== //
const getCountryName = (code: string) => {
  return countries[code]?.name;
};

export const countriesList = Object.keys(countries).map((code) => ({
  code,
  name: getCountryName(code),
}));

// create a options list for select input
export const countriesOptions = (codes) =>
  codes.map((code) => ({
    // !! as workaround for data-attribute lowercase issue, make sure code is lowercase
    value: code.toLowerCase(),
    label: getCountryName(code),
  }));

// ====================================================== //
// ========================== Language ========================== //
// ====================================================== //
export const getLanguageName = (code: string) => {
  return languages[code]?.name;
};
export const languagesOptions = (codes) =>
  codes.map((code) => ({
    // !! no need to lowercase language code since it's saved in lowercase
    value: code,
    label: getLanguageName(code),
  }));
