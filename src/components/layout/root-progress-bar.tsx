import {
  NProgressBar,
  NProgressBarProps,
} from "@/components/shared/nprogress-bar";
import { useRouteState } from "@/components/shared/route-state";

export type RootProgressBarProps = Omit<NProgressBarProps, "isAnimating">;

export const RootProgressBar = (props: RootProgressBarProps) => {
  const { loadingKey: key, isRouteChanging } = useRouteState();

  return (
    <NProgressBar
      key={key}
      className="fixed top-0 w-full h-[0.25rem] z-30"
      isAnimating={isRouteChanging}
      {...props}
    />
  );
};

export default RootProgressBar;
