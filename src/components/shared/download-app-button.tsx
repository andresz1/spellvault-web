import { FaApple } from "react-icons/fa";

import { Button, ButtonProps } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

import { useAnalytics } from "../analytics/use-analytics";

export type DownloadAppButtonProps = Omit<ButtonProps, "asChild">;

export const DownloadAppButton = ({
  children,
  onClick,
  ...others
}: DownloadAppButtonProps) => {
  const { analytics } = useAnalytics();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    }

    analytics.track("download_app_click");

    window.open("https://forms.gle/3rNBNMUtkiCjn4Wo9", "_blank");
  };

  return (
    <Button onClick={handleClick} {...others}>
      <Icon>
        <FaApple />
      </Icon>

      {children}
    </Button>
  );
};
