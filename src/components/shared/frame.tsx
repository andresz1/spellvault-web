import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/components/ui/core";
import { Tilt } from "@/components/ui/tilt";

export type WindowFrameProps = ComponentPropsWithoutRef<"div">;

export const WindowFrame = ({
  className,
  children,
  ...others
}: WindowFrameProps) => {
  return (
    <Tilt
      rotationFactor={3}
      className={cn(
        "aspect-[4/3] size-full flex flex-col overflow-hidden max-w-md",
        className,
      )}
      {...others}
    >
      <div className="w-full py-3 px-4 gap-2 flex bg-primary relative z-10 rounded-t-2xl">
        <div className="h-3 w-3 first:bg-white/20 last:bg-white/10 bg-white/15 rounded-full"></div>
        <div className="h-3 w-3 first:bg-white/20 last:bg-white/10 bg-white/15 rounded-full"></div>
        <div className="h-3 w-3 first:bg-white/20 last:bg-white/10 bg-white/15 rounded-full"></div>
      </div>
      <div className="text-sm sm:text-lg border bg-muted backdrop-blur-md flex flex-col items-center justify-center rounded-b-2xl flex-1 overflow-hidden border-t-0">
        {children}
      </div>
    </Tilt>
  );
};
