import { BasicTooltip } from "@/components/tooltips/basic-tooltip";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";

interface BaseActionsProps {
  trigger: ReactNode;
  children: ReactNode;
  text?: string;
  side?: "bottom" | "left" | "top" | "right" | undefined;
  offset?: number;
  sideOffset?: string;
  tooltip?: string;
  tooltipSide?: "bottom" | "left" | "top" | "right" | undefined;
}

export const BaseActions = ({
  children,
  trigger,
  text = "RMP Activities",
  side = "left",
  sideOffset = "0",
  tooltip,
  tooltipSide = "bottom",
}: BaseActionsProps) => {
  return (
    <Popover modal>
      {tooltip ? (
        <BasicTooltip show={true} text={tooltip} side={tooltipSide}>
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        </BasicTooltip>
      ) : (
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      )}
      <PopoverContent
        side={side}
        className={`mt-0 w-[280px] p-0 py-2 relative -left-[${sideOffset}px] bg-secondary border-[1px] border-neutral-400 shadow-md shadow-blue-200`}
        style={{
          boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.4)",
        }}>
        <Label className="pl-4 pt-2">{text}</Label>
        <section className="flex flex-col mt-2">{children}</section>
      </PopoverContent>
    </Popover>
  );
};
