import { GoogleAnalytics } from "@next/third-parties/google";
import React, { ReactNode, useMemo } from "react";

import { Analytics } from "@/core/analytics";

import { AnalyticsContext } from "./analytics-context";
import { AnalyticsFacebookScript } from "./analytics-facebook-script";

interface AnalyticsProviderProps {
  analytics?: Analytics;
  children: ReactNode;
}

export const AnalyticsProvider = ({
  analytics,
  children,
}: AnalyticsProviderProps) => {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string;

  const value = useMemo(() => {
    return { analytics: analytics || new Analytics() };
  }, [analytics]);

  return (
    <>
      <AnalyticsContext.Provider value={value}>
        <GoogleAnalytics gaId={gaId} />

        <AnalyticsFacebookScript />

        {children}
      </AnalyticsContext.Provider>
    </>
  );
};
