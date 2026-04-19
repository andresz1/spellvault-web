import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ComponentPropsWithoutRef } from "react";

import { usePathTranslation } from "@/components/path";
import { LangButton } from "@/components/shared/lang-button";
import { LogoExtended } from "@/components/shared/logo-extended";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/components/ui/core";
import { Icon } from "@/components/ui/icon";
import { Doc, Landing } from "#/.content-collections/generated";

export interface FooterProps extends ComponentPropsWithoutRef<"footer"> {
  docs?: Doc[];
  landings?: Landing[];
  alternates?: Record<string, string>;
}

export const Footer = ({
  className,
  docs = [],
  landings = [],
  alternates,
  ...others
}: FooterProps) => {
  const { t } = useTranslation("common");
  const { tp } = usePathTranslation();

  const products = landings.filter((landing) => {
    return !landing.category;
  });
  const solutions = landings.filter((landing) => {
    return landing.category === "solution";
  });
  const features = landings.filter((landing) => {
    return landing.category === "feature";
  });
  const comparisons = landings.filter((landing) => {
    return landing.category === "comparison";
  });

  const nav = [
    products.length > 0 && {
      title: t("footer.products.title"),
      links: [
        ...products.map((landing) => ({
          text: landing.short || landing.title,
          href: landing.pathname,
        })),
      ],
    },
    features.length > 0 && {
      title: t("footer.features.title"),
      links: [
        ...features.map((landing) => ({
          text: landing.short || landing.title,
          href: landing.pathname,
        })),
      ],
    },
    comparisons.length > 0 && {
      title: t("footer.compare.title"),
      links: [
        ...comparisons.map((landing) => ({
          text: landing.short || landing.title,
          href: landing.pathname,
        })),
      ],
    },
    solutions.length > 0 && {
      title: t("footer.solutions.title"),
      links: [
        ...solutions.map((landing) => ({
          text: landing.short || landing.title,
          href: landing.pathname,
        })),
      ],
    },
    {
      title: t("footer.about.title"),
      links: [
        {
          text: t("footer.about.pricing"),
          href: "/pricing",
        },
        {
          text: t("footer.about.contact-us"),
          href: "mailto:info@spellvault.com",
        },
      ],
    },
    docs.length > 0 && {
      title: t("footer.legal.title"),
      links: docs.map((doc) => ({
        text: doc.title,
        href: doc.pathname,
      })),
    },
  ];

  return (
    <footer
      className={cn("relative bg-muted pt-12 pb-6", className)}
      {...others}
    >
      <Container className="relative space-y-8 z-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-14">
          <div className="flex-shrink-0 space-y-4 md:pr-20">
            <Link href="/">
              <LogoExtended className="size-10" />
            </Link>

            <div className="space-x-2">
              <Button
                aria-label="Instagram"
                variant="outline-secondary"
                size="icon"
                asChild
              >
                <a
                  href="https://www.instagram.com/spellvault"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <Icon className="text-lg">
                    <Instagram />
                  </Icon>
                </a>
              </Button>

              <Button
                aria-label="YouTube"
                variant="outline-secondary"
                size="icon"
                asChild
              >
                <a
                  href="https://www.youtube.com/@spellvault"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <Icon className="text-lg">
                    <Youtube />
                  </Icon>
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 flex-1">
              {nav
                .filter((item) => !!item)
                .map(({ title, links }, index) => (
                  <div key={index} className="space-y-3 text-sm">
                    <p className="font-semibold">{title}</p>

                    <ul className="space-y-2">
                      {links.map(({ text, href }, index) => (
                        <li key={index}>
                          {href.startsWith("https") ? (
                            <a
                              href={href}
                              target="_blank"
                              className="underline-offset-4 hover:underline"
                              rel="noopener noreferrer nofollow"
                            >
                              {text}
                            </a>
                          ) : (
                            <Link
                              className="underline-offset-4 hover:underline"
                              href={href}
                            >
                              {text}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-between items-center">
          <div className="text-sm line-clamp-2 flex-1">
            {t("footer.copyright")}
          </div>

          <div className="space-x-2">
            <LangButton variant="outline" alternates={alternates} />
          </div>
        </div>
      </Container>
    </footer>
  );
};
