import { useNProgress } from "@tanem/react-nprogress";

import { Progress, ProgressProps } from "@/components/ui/progress";

export interface NProgressBarProps
  extends Omit<ProgressProps, "isIndeterminate"> {
  isAnimating: boolean;
}

export const NProgressBar = ({ isAnimating, ...others }: NProgressBarProps) => {
  const { animationDuration, progress, isFinished } = useNProgress({
    isAnimating,
  });

  if (isFinished) {
    return null;
  }

  return (
    <Progress
      style={{
        transition: `width ${animationDuration}ms linear`,
      }}
      value={progress * 100}
      {...others}
    />
  );
};
