import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/components/ui/core";
import { Marquee } from "@/components/ui/marquee";

export type CustomersMarqueeProps = Omit<
  ComponentPropsWithoutRef<typeof Marquee>,
  "children"
>;

export const CustomersMarquee = ({
  className,
  ...others
}: CustomersMarqueeProps) => {
  const customers = [
    "Collectors",
    "Commander Pods",
    "LGS Owners",
    "Modern Grinders",
    "Cube Curators",
    "MTG Sellers",
  ];

  return (
    <div className={cn("relative", className)}>
      <Marquee
        pauseOnHover
        className="[--duration:40s] [--gap:2rem]"
        {...others}
      >
        {customers.map((customer, index) => (
          <div
            key={index}
            className="rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
          >
            {customer}
          </div>
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
    </div>
  );
};
