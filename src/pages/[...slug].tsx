import { Check, ChevronRight, MoveHorizontal, X } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FAQPageJsonLd, NextSeo } from "next-seo";
import { Fragment } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { DownloadAppButton } from "@/components/shared/download-app-button";
import { IPhoneFrame } from "@/components/shared/iphone-frame";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";
import { Ratings } from "@/components/ui/ratings";
import { TextGradient } from "@/components/ui/text-gradient";
import {
  allDocs,
  allLandings,
  Doc,
  Landing,
} from "#/.content-collections/generated";

interface LandingPageProps {
  docs: Doc[];
  landings: Landing[];
  data: Landing;
  alternates: Landing[];
}

export default function LandingPage({
  landings,
  docs,
  data,
  alternates: alternatesProps,
}: LandingPageProps) {
  const { t } = useTranslation("landing");
  const router = useRouter();
  const { defaultLocale } = router;
  const { title, description, hero, sections } = data;

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
    (acc, tutorial) => {
      acc[tutorial.locale] = computeURL(tutorial.locale, tutorial.pathname);
      return acc;
    },
    {} as Record<string, string>,
  );

  const languageAlternates = [
    {
      hrefLang: "x-default",
      href: computeURL(
        defaultLocale as string,
        alternatesProps.find((tutorial) => tutorial.locale === defaultLocale)
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
        title={title}
        description={description}
        languageAlternates={languageAlternates}
      />

      <Header alternates={alternates} />

      <Container asChild>
        <main>
          <section className="relative pb-10 pt-24 md:pb-14 md:pt-28 ">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center lg:justify-start">
                      <Badge className="py-1" variant="outline">
                        {t("hero.badge")}
                        <Icon>
                          <ChevronRight />
                        </Icon>
                      </Badge>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold">
                      <TextGradient>{hero.title}</TextGradient>
                    </h1>

                    <p className="text-md md:text-lg text-muted-foreground">
                      {hero.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start">
                    <DownloadAppButton>
                      {t("hero.start-button")}
                    </DownloadAppButton>
                  </div>
                </div>

                <div className="flex flex-col gap-4 items-center lg:items-start">
                  <div className="flex flex-col gap-4 items-center justify-center md:flex-row">
                    <div className="flex -space-x-1 *:ring *:ring-background">
                      {Array.from(Array(4).keys()).map((index) => (
                        <Avatar
                          className="bg-muted-foreground size-10"
                          key={index}
                        >
                          <AvatarImage
                            className="object-contain"
                            src={`/images/home/avatar-0${index + 1}.png`}
                          />
                        </Avatar>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1 items-center lg:items-start">
                      <Ratings value={5} variant="yellow" />

                      <p className="text-muted-foreground text-sm">
                        {hero.rating ?? t("hero.rating")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <IPhoneFrame className="lg:ml-auto" />
            </div>
          </section>

          {sections.map((section, sectionIndex) => (
            <Fragment key={sectionIndex}>
              {section.type === "features" && (
                <section className="py-10 space-y-10">
                  <div className="space-y-2 max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      <Trans
                        defaults={section.title}
                        components={{
                          strong: <TextGradient />,
                        }}
                      />
                    </h2>

                    <p className="text-muted-foreground">
                      {section.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.items.map((feature, index) => (
                      <article
                        key={index}
                        className="border p-6 rounded-3xl flex flex-col gap-4 hover:shadow-md transition-shadow"
                      >
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <DynamicIcon
                            name={feature.icon as IconName}
                            size={20}
                          />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <h3 className="text-lg font-semibold tracking-tight">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {feature.description}
                          </p>
                        </div>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="self-start"
                        >
                          {feature.button}
                        </Button>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {section.type === "faqs" && (
                <>
                  <FAQPageJsonLd
                    mainEntity={section.items.map((item) => ({
                      questionName: item.title,
                      acceptedAnswerText: item.description.replace(
                        /<[^>]*>/g,
                        "",
                      ),
                    }))}
                  />

                  <section className="py-10 space-y-10">
                    <div className="space-y-2 text-center">
                      <Badge variant="secondary">{t("faqs.badge")}</Badge>

                      <h2 className="text-2xl md:text-3xl font-bold">
                        {section.title}
                      </h2>
                    </div>

                    <div className="max-w-3xl mx-auto">
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full space-y-2"
                      >
                        {section.items.map(({ title, description }, index) => (
                          <AccordionItem
                            key={index}
                            value={index.toString()}
                            className="bg-card rounded-2xl border-b-0 border"
                          >
                            <AccordionTrigger className="px-5 [&>svg]:rotate-90 [&[data-state=open]>svg]:rotate-0 text-left font-normal">
                              {title}
                            </AccordionTrigger>
                            <AccordionContent
                              className="text-muted-foreground px-5"
                              forceMount
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: description.replace(/\n/g, "<br />"),
                                }}
                              />
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </section>
                </>
              )}

              {section.type === "guides" && (
                <section className="py-10 space-y-10">
                  <div className="space-y-2 max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      <Trans
                        defaults={section.title}
                        components={{
                          strong: <TextGradient />,
                        }}
                      />
                    </h2>

                    <p className="text-muted-foreground">
                      {section.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((guide, index) => (
                      <a
                        key={index}
                        href={guide.href}
                        className="border p-6 rounded-3xl flex gap-4 items-start hover:shadow-md transition-shadow group"
                      >
                        <div className="size-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <DynamicIcon
                            name={guide.icon as IconName}
                            size={20}
                          />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                            {guide.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {guide.description}
                          </p>
                        </div>
                        <ChevronRight className="size-5 text-muted-foreground shrink-0 mt-2 group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {section.type === "banner" && (
                <section className="py-10">
                  <div className="bg-muted flex w-full flex-col gap-8 overflow-hidden rounded-lg p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-12">
                    <div className="flex-1 space-y-3">
                      <h2 className="text-xl md:text-2xl font-bold">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground max-w-xl lg:text-base">
                        {section.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                      <Button>{section.button}</Button>
                    </div>
                  </div>
                </section>
              )}

              {section.type === "comparison" && (
                <section className="py-10 space-y-10">
                  <div className="space-y-2 max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      <Trans
                        defaults={section.title}
                        components={{
                          strong: <TextGradient />,
                        }}
                      />
                    </h2>
                    <p className="text-muted-foreground">
                      {section.description}
                    </p>
                  </div>

                  <div className="max-w-3xl mx-auto rounded-xl border overflow-x-auto text-nowrap">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50 border-b">
                          <th className="text-left py-3 px-6 min-w-[180px]" />
                          <th className="text-center py-3 px-6 font-semibold text-primary min-w-[120px] whitespace-nowrap">
                            Spellvault
                          </th>
                          <th className="text-center py-3 px-6 font-semibold text-muted-foreground min-w-[120px] whitespace-nowrap">
                            {section.competitor}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row, index) => (
                          <tr
                            key={index}
                            className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                          >
                            <td className="py-3 px-6 font-medium min-w-[180px]">
                              {row.feature}
                            </td>

                            {[row.app, row.competitor].map((value, index) => (
                              <td
                                key={index}
                                className="relative text-center py-3 px-6 min-w-[120px]"
                              >
                                {typeof value !== "boolean" ? (
                                  <span className="text-muted-foreground text-xs">
                                    {value}
                                  </span>
                                ) : (
                                  <>
                                    {value ? (
                                      <>
                                        <Check
                                          className="mx-auto size-4 text-primary"
                                          aria-hidden="true"
                                        />

                                        <span className="sr-only">
                                          {t("comparison.yes")}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <X
                                          className="mx-auto size-4 text-muted-foreground/40"
                                          aria-hidden="true"
                                        />

                                        <span className="sr-only">
                                          {t("comparison.no")}
                                        </span>
                                      </>
                                    )}
                                  </>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {section.type === "youtube" && (
                <section className="py-10 space-y-10">
                  <div className="space-y-2 max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      <Trans
                        defaults={section.title}
                        components={{
                          strong: <TextGradient />,
                        }}
                      />
                    </h2>
                    <p className="text-muted-foreground">
                      {section.description}
                    </p>
                  </div>

                  <div className="max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden border bg-muted">
                    <iframe
                      src={`https://www.youtube.com/embed/${section.videoId}`}
                      title={section.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </section>
              )}

              {section.type === "examples" && (
                <section className="py-10 space-y-10">
                  <div className="space-y-2 max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      <Trans
                        defaults={section.title}
                        components={{
                          strong: <TextGradient />,
                        }}
                      />
                    </h2>
                    <p className="text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.items.map((item, index) => (
                      <figure
                        key={index}
                        className="border rounded-3xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                      >
                        {item.media === "comparison" && (
                          <ImageComparison
                            className="aspect-[4/3] w-full"
                            springOptions={{ bounce: 0.3 }}
                          >
                            <ImageComparisonImage
                              src={item.before}
                              alt={item["before-alt"]}
                              position="left"
                            />
                            <ImageComparisonImage
                              src={item.after}
                              alt={item["after-alt"]}
                              position="right"
                            />
                            <ImageComparisonSlider className="w-1 bg-background backdrop-blur-xs transition-colors">
                              <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background flex items-center justify-center hover:scale-110 transition-transform shadow-sm border">
                                <MoveHorizontal
                                  className="size-4"
                                  aria-hidden="true"
                                />
                              </div>
                            </ImageComparisonSlider>
                          </ImageComparison>
                        )}
                        {item.media === "image" && (
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="w-full h-full object-cover"
                              loading={index === 0 ? "eager" : "lazy"}
                            />
                          </div>
                        )}
                        {item.media === "video" && (
                          <div className="aspect-[4/3] relative overflow-hidden bg-black">
                            <video
                              src={item.src}
                              poster={item.poster}
                              className="w-full h-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          </div>
                        )}
                        <figcaption className="px-5 py-4 space-y-0.5">
                          <p className="text-base font-semibold">
                            {item.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
            </Fragment>
          ))}
        </main>
      </Container>

      <Footer alternates={alternates} docs={docs} landings={landings} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale: localeParam,
  params,
}) => {
  const slug = params?.slug as string[] | undefined;

  if (!slug || slug.length === 0) {
    return { notFound: true };
  }

  const locale = localeParam as string;
  const pathname = `/${slug.join("/")}`;

  const data = allLandings.find(
    (landing) => landing.locale === locale && landing.pathname === pathname,
  );

  if (!data) {
    return { notFound: true };
  }

  const [i18n] = await Promise.all([
    serverSideTranslations(locale as string, ["common", "landing"]),
  ]);

  return {
    props: {
      ...i18n,
      data,
      docs: allDocs.filter((doc) => doc.locale === locale),
      landings: allLandings.filter((landing) => landing.locale === locale),
      alternates: allLandings.filter((landing) => landing.id === data.id),
    },
  };
};
