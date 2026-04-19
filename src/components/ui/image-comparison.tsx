"use client";
import {
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { Slot as SlotPrimitive } from "radix-ui";
import {
  ComponentPropsWithoutRef,
  createContext,
  useContext,
  useState,
} from "react";

import { cn } from "@/components/ui/core";

const ImageComparisonContext = createContext<
  | {
      sliderPosition: number;
      setSliderPosition: (pos: number) => void;
      motionSliderPosition: MotionValue<number>;
    }
  | undefined
>(undefined);

export interface ImageComparisonProps extends ComponentPropsWithoutRef<"div"> {
  enableHover?: boolean;
  springOptions?: SpringOptions;
  asChild?: boolean;
}

const DEFAULT_SPRING_OPTIONS = {
  bounce: 0,
  duration: 0,
};

function ImageComparison({
  children,
  className,
  enableHover,
  springOptions,
  asChild,
  ...others
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(
    motionValue,
    springOptions ?? DEFAULT_SPRING_OPTIONS,
  );
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !enableHover) return;

    const containerRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const x =
      "touches" in event
        ? event.touches[0].clientX - containerRect.left
        : (event as React.MouseEvent).clientX - containerRect.left;

    const percentage = Math.min(
      Math.max((x / containerRect.width) * 100, 0),
      100,
    );
    motionValue.set(percentage);
    setSliderPosition(percentage);
  };

  const Component = asChild ? SlotPrimitive.Root : "div";

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}
    >
      <Component
        className={cn(
          "relative select-none overflow-hidden",
          enableHover && "cursor-ew-resize",
          className,
        )}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
        {...others}
      >
        {children}
      </Component>
    </ImageComparisonContext.Provider>
  );
}

const MotionImage = motion(Image);

const ImageComparisonImage = ({
  className,
  alt,
  src,
  position,
  priority,
}: {
  className?: string;
  alt: string;
  src: string;
  position: "left" | "right";
  priority?: boolean;
}) => {
  const { motionSliderPosition } = useContext(ImageComparisonContext)!;
  const leftClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 0 0 ${value}%)`,
  );
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`,
  );

  return (
    <MotionImage
      src={src}
      alt={alt}
      className={cn(
        "absolute inset-0 h-full w-full object-cover pointer-events-none bg-muted",
        className,
      )}
      style={{
        clipPath: position === "right" ? leftClipPath : rightClipPath,
      }}
      priority={priority}
      fill
    />
  );
};

const ImageComparisonSlider = ({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode;
}) => {
  const { motionSliderPosition } = useContext(ImageComparisonContext)!;

  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      className={cn("absolute bottom-0 top-0 w-1 cursor-ew-resize", className)}
      style={{
        left,
      }}
    >
      {children}
    </motion.div>
  );
};

export { ImageComparison, ImageComparisonImage, ImageComparisonSlider };
