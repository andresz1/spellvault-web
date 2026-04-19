"use client";

import { Check, Copy } from "lucide-react";
import { MouseEventHandler } from "react";

import { useCopyToClipboard } from "@/components/hooks/use-copy-to-clipboard";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export interface CopyButtonProps extends ButtonProps {
  value: string;
}

export const CopyButton = ({ value, onClick, ...others }: CopyButtonProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    }

    copyToClipboard(value);
  };

  return (
    <Button size="icon" onClick={handleClick} {...others}>
      <Icon>{isCopied ? <Check /> : <Copy />}</Icon>
    </Button>
  );
};
