/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "es",
    locales: ["en", "es", "pt", "fr", "it", "de"],
  },
  localePath:
    typeof window === "undefined"
      ? // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("path").resolve("./public/locales")
      : "/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
