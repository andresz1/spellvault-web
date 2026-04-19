import { useRouter } from "next/router";

import * as path from "@/core/path";

export const usePathSeo = (
  key: string,
  variables: { [name: string]: string | number | null | undefined } = {},
) => {
  const router = useRouter();
  const { defaultLocale } = router;
  const alternates = path.ta(key, variables);

  const computeURL = (locale: string, pathname: string) => {
    const hostname = process.env.NEXT_PUBLIC_BASE_URL as string;

    return [
      locale !== defaultLocale ? [hostname, locale].join("/") : hostname,
      pathname,
    ]
      .join("")
      .replace(/\/$/, "");
  };

  const languageAlternates = [
    {
      hrefLang: "x-default",
      href: computeURL(
        defaultLocale as string,
        alternates[defaultLocale as string],
      ),
    },
    ...Object.keys(alternates).map((locale) => ({
      hrefLang: locale,
      href: computeURL(locale, alternates[locale]),
    })),
  ];

  return { alternates, languageAlternates };
};
