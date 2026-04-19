import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "./core";

export const iconStyles = cva([], {
  variants: {
    size: {
      current: ["w-[1em] h-[1em]"],
      sm: ["size-4"],
      md: ["size-8"],
      lg: ["size-10"],
      xl: ["size-12"],
    },
  },
});

export type IconVariantsProps = VariantProps<typeof iconStyles>;

export interface IconProps
  extends IconVariantsProps,
    React.ComponentPropsWithoutRef<"svg"> {
  children: React.ReactNode;
  label?: string;
}

export const Icon = ({
  label,
  className,
  size = "current",
  children,
  ...others
}: IconProps) => {
  if (!React.isValidElement(children)) {
    return label ? <span className="sr-only">{label}</span> : null;
  }

  const child = children as React.ReactElement<SVGElement>;

  return (
    <>
      {React.cloneElement(child, {
        className: cn(iconStyles({ size }), className),
        "aria-hidden": "true",
        focusable: "false",
        ...others,
      } as Partial<SVGElement>)}

      {label && <span className="sr-only">{label}</span>}
    </>
  );
};

Icon.displayName = "Icon";
