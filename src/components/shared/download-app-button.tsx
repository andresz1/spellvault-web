import { FaApple } from "react-icons/fa";

import { Button, ButtonProps } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export type DownloadAppButtonProps = Omit<ButtonProps, "asChild">;

export const DownloadAppButton = ({
  children,
  ...others
}: DownloadAppButtonProps) => {
  return (
    <Button {...others}>
      <Icon>
        <FaApple />
      </Icon>

      {children}
    </Button>
  );
};
