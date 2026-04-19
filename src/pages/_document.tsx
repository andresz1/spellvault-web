/* eslint-disable jsx-a11y/alt-text */

import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  const fbId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  return (
    <Html translate="no">
      <Head>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${fbId}&ev=PageView&noscript=1`}
          />
        </noscript>
      </Head>
      <body className="bg-background text-foreground antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
