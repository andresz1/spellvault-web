import { setCookie } from "cookies-next";
import { Globe } from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";

export interface LangButtonProps extends ButtonProps {
  alternates?: Record<string, string>;
}

export const LangButton = ({ alternates, ...props }: LangButtonProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { asPath, locale, locales = [] } = router;

  const handleValueChange = (locale: string) => {
    const href = asPath;

    setCookie("NEXT_LOCALE", locale);

    if (alternates && alternates[locale]) {
      const href = alternates[locale];
      router.push(href, href, { locale });
      return;
    }

    router.push(href, href, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button size="icon" aria-label={t("lang.button")} {...props}>
          <Icon>
            <Globe />
          </Icon>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>{t("lang.menu.title")}</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleValueChange}
        >
          {locales.map((locale) => (
            <DropdownMenuRadioItem
              key={locale}
              value={locale}
              className="w-full text-md cursor-pointer"
            >
              {t(`lang.menu.${locale}`)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
