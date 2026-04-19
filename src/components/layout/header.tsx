import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ComponentPropsWithoutRef } from "react";

import { DownloadAppButton } from "@/components/shared/download-app-button";
import { ModeToggleButton } from "@/components/shared/mode-toggle-button";
import { Container } from "@/components/ui/container";
import { cn } from "@/components/ui/core";

import { LangButton } from "../shared/lang-button";
import { Logo } from "../shared/logo";
import { LogoExtended } from "../shared/logo-extended";

export interface HeaderProps extends ComponentPropsWithoutRef<"header"> {
  alternates?: Record<string, string>;
}

export const Header = ({ className, alternates, ...others }: HeaderProps) => {
  const { t } = useTranslation("common");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-20 backdrop-blur-md",
        className,
      )}
      {...others}
    >
      <Container className={cn("flex h-16 items-center justify-between")}>
        <div className="flex gap-2">
          <Link
            className="flex gap-2 items-center underline-offset-4 hover:underline font-semibold text-lg notranslate"
            href="/"
          >
            <Logo className="size-10 md:hidden" />

            <LogoExtended className="hidden size-10 md:block" />
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <DownloadAppButton size="sm">
            {t("header.download-button")}
          </DownloadAppButton>

          <ModeToggleButton
            className="hidden md:flex"
            variant="ghost-secondary"
          />

          <LangButton
            className="hidden md:flex"
            variant="ghost-secondary"
            alternates={alternates}
          />
        </div>
      </Container>
    </header>
  );
};
