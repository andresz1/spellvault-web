import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/components/ui/core";

export type LogoProps = ComponentPropsWithoutRef<"svg">;

export const Logo = ({ className, ...others }: LogoProps) => {
  return (
    <svg
      aria-label="Spellvault"
      className={cn("rounded-xl overflow-hidden", className)}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <rect width="40" height="40" fill="#000000" />
    </svg>
  );
};
