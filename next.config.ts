import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

import { i18n } from "./next-i18next.config";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  i18n: {
    defaultLocale: i18n.defaultLocale,
    locales: i18n.locales,
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return [];
  },
};

export default withContentCollections(nextConfig);
