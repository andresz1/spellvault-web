import { Slot as SlotPrimitive } from "radix-ui";
import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/components/ui/core";

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  asChild?: boolean;
}

export const Container = ({
  className,
  asChild,
  ...others
}: ContainerProps) => {
  const Component = asChild ? SlotPrimitive.Slot : "div";

  return (
    <Component
      className={cn("max-w-7xl mx-auto px-3.5", className)}
      {...others}
    />
  );
};
