import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/components/ui/core";

export type LogoProps = ComponentPropsWithoutRef<"div">;

export const Logo = ({ className, ...others }: LogoProps) => {
  return (
    <div
      className={cn("rounded-md relative overflow-hidden size-10", className)}
      {...others}
    >
      <Image alt="Spellvault" src="/logo.png" fill />
    </div>
  );
};
