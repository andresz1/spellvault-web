import {
  ArrowRight,
  BarChart2,
  BellRing,
  ChevronRight,
  FileText,
  LibraryBig,
  Repeat2,
  ScanSearch,
  SearchCheck,
  WalletCards,
  Zap,
} from "lucide-react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FAQPageJsonLd, NextSeo } from "next-seo";
import { FaApple } from "react-icons/fa";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
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
import { Ratings } from "@/components/ui/ratings";
import { TextGradient } from "@/components/ui/text-gradient";
import {
  allDocs,
  allLandings,
  Doc,
  Landing,
} from "#/.content-collections/generated";

interface HomePageProps {
  docs: Doc[];
  landings: Landing[];
}

export default function HomePage({ docs, landings }: HomePageProps) {
  const { t } = useTranslation("home");

  const icons: Record<string, React.ReactNode> = {
    scan: <ScanSearch />,
    "scan-speed": <Zap />,
    collection: <LibraryBig />,
    prices: <BarChart2 />,
    alerts: <BellRing />,
    export: <WalletCards />,
    pdf: <FileText />,
    duplicates: <Repeat2 />,
    search: <SearchCheck />,
  };

  const services = t("services.items", { returnObjects: true }) as {
    key: string;
    title: string;
    description: string;
    href: string;
  }[];

  const sites = t("publish.items", { returnObjects: true }) as {
    name: string;
  }[];

  const faqs = t("faqs.items", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <>
      <NextSeo title={t("meta.title")} description={t("meta.description")} />

      <FAQPageJsonLd
        mainEntity={faqs.map((item) => ({
          questionName: item.title,
          acceptedAnswerText: item.description.replace(/<[^>]*>/g, ""),
        }))}
      />

      <Header />

      <main>
        <Container className="relative pb-8 pt-24 md:pt-28">
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
                    <Trans
                      t={t}
                      i18nKey="hero.title"
                      components={{
                        strong: <TextGradient />,
                      }}
                    />
                  </h1>

                  <p className="text-md text-muted-foreground md:text-lg">
                    {t("hero.description")}
                  </p>
                </div>

                <div className="flex items-center justify-center lg:justify-start">
                  <Button>
                    <Icon>
                      <FaApple />
                    </Icon>
                    {t("hero.start-button")}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 lg:items-start">
                <div className="flex flex-col items-center gap-4 md:flex-row">
                  <div className="flex -space-x-1 *:ring *:ring-background">
                    {Array.from(Array(4).keys()).map((index) => (
                      <Avatar
                        className="size-10 bg-muted-foreground"
                        key={index}
                      >
                        <AvatarImage
                          className="object-contain"
                          src={`/images/home/avatar-0${index + 1}.png`}
                        />
                      </Avatar>
                    ))}
                  </div>

                  <div className="flex flex-col items-center gap-1 lg:items-start">
                    <Ratings value={5} variant="yellow" />
                    <p className="text-sm text-muted-foreground">
                      {t("hero.rating")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <IPhoneFrame className="lg:ml-auto" />
          </div>
        </Container>

        <Container className="py-8 md:py-12" asChild>
          <section>
            <div className="mx-auto max-w-2xl space-y-2 text-center">
              <h2 className="text-2xl font-bold md:text-3xl">
                <Trans
                  t={t}
                  i18nKey="services.title"
                  components={{
                    strong: <TextGradient />,
                  }}
                />
              </h2>

              <p className="text-muted-foreground">
                {t("services.description")}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.key}
                  className="flex flex-col gap-4 rounded-3xl border bg-card p-6 text-left transition-shadow hover:shadow-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="text-xl">
                      {icons[service.key] ?? <ScanSearch />}
                    </Icon>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1 text-sm font-medium underline-offset-2 hover:underline"
                  >
                    {t("services.learn-more")}
                    <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </Container>

        <Container className="py-4 md:py-8" asChild>
          <section>
            <div className="rounded-3xl bg-muted p-8 md:p-12">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl space-y-3">
                  <h2 className="text-2xl font-bold md:text-3xl">
                    {t("banner.title")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("banner.description")}
                  </p>
                </div>

                <div className="shrink-0">
                  <Button>{t("banner.button")}</Button>
                </div>
              </div>
            </div>
          </section>
        </Container>

        <Container className="py-8 md:py-12" asChild>
          <section>
            <div className="space-y-2 text-center">
              <Badge variant="secondary">{t("faqs.badge")}</Badge>
              <h2 className="text-2xl font-bold md:text-3xl">
                {t("faqs.title")}
              </h2>
            </div>

            <div className="mx-auto mt-8 max-w-3xl">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map(({ title, description }, index) => (
                  <AccordionItem
                    key={index}
                    value={index.toString()}
                    className="rounded-2xl border border-border bg-card px-1"
                  >
                    <AccordionTrigger className="px-4 text-left font-medium">
                      {title}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-muted-foreground">
                      <Trans
                        t={t}
                        i18nKey={description}
                        components={{
                          strong: <strong className="text-foreground" />,
                        }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </Container>
      </main>

      <Footer docs={docs} landings={landings} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const [i18n] = await Promise.all([
    serverSideTranslations(locale as string, ["common", "home"]),
  ]);

  const docs = allDocs.filter((doc) => {
    return doc.locale === locale;
  });

  const landings = allLandings.filter((landing) => {
    return landing.locale === locale;
  });

  return {
    props: {
      ...i18n,
      docs,
      landings,
    },
  };
};
