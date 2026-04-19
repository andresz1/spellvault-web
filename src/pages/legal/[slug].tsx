import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MDX, mdxOptions } from "@/components/shared/mdx";
import { Container } from "@/components/ui/container";
import {
  allDocs,
  allLandings,
  Doc,
  Landing,
} from "#/.content-collections/generated";

export interface TutorialPageProps {
  doc: Doc;
  docs: Doc[];
  landings: Landing[];
  alternates: Doc[];
  source: MDXRemoteSerializeResult;
}

const hostname = process.env.NEXT_PUBLIC_BASE_URL as string;

export default function TutorialPage({
  docs,
  doc,
  source,
  landings,
  alternates: alternatesProps,
}: TutorialPageProps) {
  const router = useRouter();
  const { defaultLocale } = router;

  const computeURL = (locale: string, pathname: string) => {
    const hostname = process.env.NEXT_PUBLIC_BASE_URL as string;

    return [
      locale !== defaultLocale ? [hostname, locale].join("/") : hostname,
      pathname,
    ]
      .join("")
      .replace(/\/$/, "");
  };

  const alternates = alternatesProps.reduce(
    (acc, doc) => {
      acc[doc.locale] = computeURL(doc.locale, doc.pathname);
      return acc;
    },
    {} as Record<string, string>,
  );

  const languageAlternates = [
    {
      hrefLang: "x-default",
      href: computeURL(
        defaultLocale as string,
        alternatesProps.find((doc) => doc.locale === defaultLocale)
          ?.pathname as string,
      ),
    },
    ...Object.keys(alternates).map((locale) => ({
      hrefLang: locale,
      href: alternates[locale],
    })),
  ];

  return (
    <>
      <NextSeo
        title={doc.title}
        description={doc.description}
        languageAlternates={languageAlternates}
      />

      <Header alternates={alternates} />

      <Container asChild>
        <main className="mt-20 mb-6 space-y-6">
          <MDX {...source} />
        </main>
      </Container>

      <Footer alternates={alternates} docs={docs} landings={landings} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const slug = params?.slug as string;

  const doc = allDocs.find((doc) => {
    return doc.locale === locale && slug === doc.slug;
  });

  if (!doc) {
    return { notFound: true };
  }

  const docs = allDocs.filter((doc) => doc.locale === locale);
  const landings = allLandings.filter((landing) => {
    return landing.locale === locale;
  });
  const alternates = allDocs.filter((current) => current.id === doc.id);

  const [i18n, source] = await Promise.all([
    serverSideTranslations(locale as string, ["common"]),
    serialize(doc.content, {
      mdxOptions: mdxOptions as never,
    }),
  ]);

  return {
    props: {
      ...i18n,
      doc,
      source,
      docs,
      landings,
      alternates,
    },
  };
};
