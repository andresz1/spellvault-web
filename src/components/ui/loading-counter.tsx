import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

import { cn } from "@/components/ui/core";

export interface LoadingCounterProps extends ComponentPropsWithoutRef<"span"> {
  target?: number;
  duration: number;
  isComplete?: boolean;
  className?: string;
  onComplete?: () => void;
  asChild?: boolean;
}

export const LoadingCounter = ({
  target = 100,
  duration,
  isComplete = false,
  className,
  onComplete,
  asChild,
  ...others
}: LoadingCounterProps) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const completeStartRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const hasCompletedRef = useRef(false);
  const Component = asChild ? Slot : "span";

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;

      if (isComplete) {
        if (!completeStartRef.current) {
          completeStartRef.current = currentTime;
        }

        const completeElapsed = currentTime - completeStartRef.current;
        const completeProgress = Math.min(completeElapsed / 500, 1);

        setCount((prevCount) => {
          const easedComplete = 1 - Math.pow(1 - completeProgress, 3);
          const newCount = prevCount + (target - prevCount) * easedComplete;

          if (completeProgress >= 1) {
            if (!hasCompletedRef.current) {
              hasCompletedRef.current = true;
              onComplete?.();
            }
            return target;
          }

          return newCount;
        });

        if (completeProgress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      } else {
        const progress = elapsed / duration;
        const asymptotic = 1 - Math.exp(-3 * progress);
        const currentCount = asymptotic * target * 0.98;

        setCount(currentCount);

        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [target, duration, isComplete, onComplete]);

  const value = count.toFixed(0);

  return (
    <Component className={cn("tabular-nums", className)} {...others}>
      {value}%
    </Component>
  );
};
