import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/components/ui/core";

export interface TextGradientProps extends ComponentPropsWithoutRef<"strong"> {
  gradient?: string;
  asChild?: boolean;
}

export function TextGradient({
  children,
  className,
  gradient = "linear-gradient(to right, #228cfb, #ce54cd, #e76267, #ff830c)",
  style,
  asChild,
  ...others
}: TextGradientProps) {
  const Component = asChild ? Slot : "strong";

  return (
    <Component
      className={cn("bg-clip-text text-transparent font-bold", className)}
      style={{
        backgroundImage: gradient,
        ...style,
      }}
      {...others}
    >
      {children}
    </Component>
  );
}
