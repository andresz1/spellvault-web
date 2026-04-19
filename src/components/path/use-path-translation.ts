import { useRouter } from "next/router";

import * as path from "@/core/path";

export const usePathTranslation = () => {
  const router = useRouter();
  const { locale } = router;

  const tp = (
    key: string,
    variables: { [name: string]: string | number | null | undefined } = {},
  ) => {
    return path.tp(key, locale as string, variables);
  };

  return { tp };
};
