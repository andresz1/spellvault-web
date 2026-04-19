import { createContext } from "react";

import { Analytics } from "@/core/analytics/analytics";

interface Context {
  analytics: Analytics;
}

export const AnalyticsContext = createContext<Context>({} as Context);
