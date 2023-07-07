const sharedConfig = require("tailwind-config/tailwind.config.js");

module.exports = {
  presets: [sharedConfig],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./my-components/**/*.{js,ts,jsx,tsx,mdx}",
    "./icons/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
