import { ComponentPropsWithoutRef } from "react";

import { cn } from "./core";

export type EmptyStateProps = ComponentPropsWithoutRef<"h2">;

export const EmptyState = ({ className, ...others }: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "max-w-md mx-auto flex flex-col items-center w-full text-md gap-4",
        className,
      )}
      {...others}
    />
  );
};

export type EmptyStateContentProps = ComponentPropsWithoutRef<"div">;

export const EmptyStateContent = ({
  className,
  ...others
}: EmptyStateContentProps) => {
  return (
    <div className={cn("text-center space-y-0.5", className)} {...others} />
  );
};

export type EmptyStateTitleProps = ComponentPropsWithoutRef<"h2">;

export const EmptyStateTitle = ({
  className,
  ...others
}: EmptyStateTitleProps) => {
  return (
    <h2
      className={cn("text-2xl font-semibold break-words", className)}
      {...others}
    />
  );
};

export type EmptyStateDescriptionProps = ComponentPropsWithoutRef<"p">;

export const EmptyStateDescription = ({
  className,
  ...others
}: EmptyStateDescriptionProps) => {
  return (
    <h2
      className={cn(
        "text-md md:text-base text-muted-foreground break-words",
        className,
      )}
      {...others}
    />
  );
};
