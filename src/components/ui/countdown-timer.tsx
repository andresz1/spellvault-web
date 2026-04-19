"use client";

import { ComponentPropsWithoutRef, useEffect, useState } from "react";

import { cn } from "./core";

export interface CountdownTimerProps extends ComponentPropsWithoutRef<"div"> {
  targetDate: Date;
  onExpire?: () => void;
}

function calculateTimeLeft(targetDate: Date) {
  const difference = +targetDate - +new Date();

  if (difference > 0) {
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return { hours: 0, minutes: 0, seconds: 0 };
}

export const CountdownTimer = ({
  targetDate,
  onExpire,
  className,
  ...others
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onExpire]);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      {...others}
    >
      <div className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-2 rounded-lg font-bold">
        <span className="text-xl">{formatTime(timeLeft.hours)}</span>
        <span className="text-sm">:</span>
        <span className="text-xl">{formatTime(timeLeft.minutes)}</span>
        <span className="text-sm">:</span>
        <span className="text-xl">{formatTime(timeLeft.seconds)}</span>
      </div>
    </div>
  );
};
