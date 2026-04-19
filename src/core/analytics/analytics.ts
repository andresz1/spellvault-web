import { sendGAEvent } from "@next/third-parties/google";

type EventParams = Record<string, unknown>;

const sendFBEvent = (name: string, params: object = {}) => {
  if (typeof window === "undefined" || !window.fbq) {
    return;
  }

  window.fbq("track", name, params);
};

export class Analytics {
  page() {
    sendFBEvent("PageView");
  }

  track(name: string, params: EventParams = {}) {
    try {
      if (["sign_up", "schedule_demo_click", "purchase"].includes(name)) {
        const parsed = name
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");

        if (parsed === "Purchase") {
          const current = params as {
            items?: { currency: string; value: number }[];
          };

          const item = current.items?.[0];

          sendFBEvent(parsed, {
            currency: item?.currency,
            value: item?.value,
          });
        }

        sendFBEvent(parsed);
      }

      sendGAEvent("event", name, params);
    } catch (error) {}
  }
}
