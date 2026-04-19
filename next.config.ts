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
    return [
      {
        source: "/en/ai-render",
        destination: "/en/render-ai",
        permanent: true,
        locale: false,
      },
      {
        source: "/en/ai-interior",
        destination: "/en/interior-ai",
        permanent: true,
        locale: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/es/precios",
        destination: "/es/pricing",
        locale: false,
      },
      {
        source: "/es/tutoriales/:path*",
        destination: "/es/tutorials/:path*",
        locale: false,
      },
      {
        source: "/pt/precos",
        destination: "/pt/pricing",
        locale: false,
      },
      {
        source: "/pt/tutoriais/:path*",
        destination: "/pt/tutorials/:path*",
        locale: false,
      },
      {
        source: "/fr/tarifs",
        destination: "/fr/pricing",
        locale: false,
      },
      {
        source: "/fr/tutoriels/:path*",
        destination: "/fr/tutorials/:path*",
        locale: false,
      },
      {
        source: "/it/prezzi",
        destination: "/it/pricing",
        locale: false,
      },
      {
        source: "/it/tutorial/:path*",
        destination: "/it/tutorials/:path*",
        locale: false,
      },
      {
        source: "/de/preise",
        destination: "/de/pricing",
        locale: false,
      },
      {
        source: "/de/anleitungen/:path*",
        destination: "/de/tutorials/:path*",
        locale: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "decoroomai.s3.eu-central-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.nouroomai.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.inmoedit.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
        pathname: "/**",
      },
    ],
  },
};

export default withContentCollections(nextConfig);
