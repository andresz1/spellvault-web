import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo, OrganizationJsonLd } from "next-seo";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { useRouter } from "next/router";

import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import RootProgressBar from "@/components/layout/root-progress-bar";
import { ThemeProvider } from "@/components/ui/theme";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const hostname = process.env.NEXT_PUBLIC_BASE_URL as string;

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const siteName = "Spellvault";
  const { locale = "es", defaultLocale = "es", locales = [] } = router;

  const computeURL = (baseURL: string, pathname: string) => {
    return [baseURL, pathname].join("").replace(/\/$/, "");
  };

  const getBaseURL = (locale: string) => {
    return locale !== defaultLocale ? [hostname, locale].join("/") : hostname;
  };

  const pathname = router.asPath.split("?")[0].replace(`/${locale}`, "");
  const canonical = computeURL(getBaseURL(locale), pathname);
  const languageAlternates = locales
    .map((locale) => ({ hrefLang: locale, href: getBaseURL(locale) }))
    .map(({ hrefLang, href }) => {
      return {
        hrefLang,
        href: computeURL(href, pathname),
      };
    });

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fontSans.style.fontFamily};
        }
      `}</style>

      <DefaultSeo
        openGraph={{
          type: "website",
          locale,
          url: canonical,
          siteName,
          images: [{ url: `${hostname}/og-logo.png` }],
        }}
        canonical={canonical}
        titleTemplate={`%s | ${siteName}`}
        defaultTitle={siteName}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        themeColor="#ffffff"
        languageAlternates={[
          {
            hrefLang: "x-default",
            href: computeURL(getBaseURL(defaultLocale), pathname),
          },
          ...languageAlternates,
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            type: "image/png",
            sizes: "96x96",
            href: "/favicon-96x96.png",
          },
          {
            rel: "icon",
            type: "image/svg+xml",
            href: "/favicon.svg",
          },
          {
            rel: "shortcut icon",
            href: "/favicon.ico",
          },
          {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
          },
          {
            rel: "manifest",
            href: "/site.webmanifest",
          },
        ]}
      />

      <OrganizationJsonLd
        name={siteName}
        url={hostname}
        logo={`${hostname}/logo.png`}
        sameAs={[
          "https://www.instagram.com/spellvault",
          "https://www.youtube.com/@spellvault",
        ]}
      />

      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={50}>
          <div className={fontSans.className}>
            <RootProgressBar />

            <AnalyticsProvider>
              <Component {...pageProps} />
            </AnalyticsProvider>
          </div>

          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(App);
