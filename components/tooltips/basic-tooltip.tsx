import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Label } from "../ui/label";
import { ReactNode } from "react";

interface BasicTooltip {
  children: ReactNode;
  text: string;
  show?: boolean;
  side?: "right" | "top" | "bottom" | "left";
  delay?: number;
}
export const BasicTooltip = ({
  children,
  text,
  show = false,
  side = "right",
  delay = 1000,
}: BasicTooltip) => {
  if (!show) return <>{children}</>;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delay}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className="bg-black">
          <Label>{text}</Label>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
