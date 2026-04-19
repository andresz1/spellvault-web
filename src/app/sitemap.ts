import { allDocs, allLandings, allTutorials } from "content-collections";
import { MetadataRoute } from "next";

import { i18n } from "#/next-i18next.config";

const { locales, defaultLocale } = i18n;

type ChangeFrequency =
  | "daily"
  | "always"
  | "hourly"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"
  | undefined;

const computeLocale = (locale: string) => {
  return locale !== defaultLocale ? locale : undefined;
};

interface SitemapEntry {
  pathname: string;
  locale: string;
}

const getSitemapFile = ({
  entries,
  locale,
}: {
  entries: SitemapEntry[];
  locale: string;
}) => {
  const siteURL = process.env.NEXT_PUBLIC_BASE_URL as string;

  const languages = entries.reduce((alternates, entry) => {
    const current = [siteURL, computeLocale(entry.locale)]
      .filter(Boolean)
      .join("/")
      .concat(entry.pathname);

    return {
      ...alternates,
      [entry.locale]: current,
    };
  }, {});

  const entry = entries.find((e) => e.locale === locale);

  if (!entry) return null;

  return {
    url: [siteURL, computeLocale(locale)]
      .filter(Boolean)
      .join("/")
      .concat(entry.pathname),
    lastModified: new Date(),
    changeFrequency: "daily" as ChangeFrequency,
    priority: 0.7,
    alternates: { languages },
  };
};

const getSitemapFiles = ({ entries }: { entries: SitemapEntry[] }) => {
  return locales
    .map((locale) =>
      getSitemapFile({
        entries,
        locale,
      }),
    )
    .filter((entry) => entry !== null);
};

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = [
    ...getSitemapFiles({
      entries: [
        { pathname: "", locale: "es" },
        { pathname: "", locale: "en" },
        { pathname: "", locale: "pt" },
        { pathname: "", locale: "fr" },
        { pathname: "", locale: "it" },
        { pathname: "", locale: "de" },
      ],
    }),
  ];

  const docs = allDocs.map((doc) =>
    getSitemapFile({
      entries: allDocs.filter((current) => current.id === doc.id),
      locale: doc.locale,
    }),
  );

  const landings = allLandings.map((landing) =>
    getSitemapFile({
      entries: allLandings.filter((current) => current.id === landing.id),
      locale: landing.locale,
    }),
  );

  return [...urls, ...docs, ...landings].filter((entry) => entry !== null);
}
