import { Button } from "@/components/ui/button";
import {useState} from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Equal, ChevronLeft, ChevronRight } from "lucide-react";

const values = {
  equals: "Equals",
  less_than: "Less Than",
  less_than_eqal: "Less Than Equals",
  greater_than: "Greater Than",
  greater_equal_to: "Greater Than Equals",
  between_inclusive: "Between Inclusive",
  between_exclusive: "Between Exclusive",
};

interface KRISetterProps {
  value: string;
  onChange: (data: string) => void;
}

export const KRISetter = ({ onChange, value }: KRISetterProps) => {
  const [open, onOpenChange] = useState(false)
  return (
    <Popover modal open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[140px] border border-neutral-400 rounded-full font-semibold text-xs">
          {value === "equals"
            ? values.equals
            : value === "less_than"
            ? values.less_than
            : value === "less_than_eqal"
            ? values.less_than_eqal
            : value === "greater_than"
            ? values.greater_than
            : value === "greater_equal_to"
            ? values.greater_equal_to
            : value === "between_inclusive"
            ? values.between_inclusive
            : value === "between_exclusive"
            ? values.between_exclusive
            : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="bg-secondary py-3 px-0">
        <section className="flex flex-col">
          <Button
            onClick={() => {onChange("equals"); onOpenChange(false)}}
            role="button"
            tabIndex={0}
            className="flex bg-secondary text-secondary-foreground cursor-pointer hover:bg-neutral-100  items-center justify-between gap-1  px-1 py-1 rounded-none">
            Equals
            <Equal size={16} />
          </Button>
          <Button
            role="button"
            onClick={() => {onChange("greater_than"); onOpenChange(false)}}
            tabIndex={0}
            className="flex bg-secondary text-secondary-foreground  cursor-pointer hover:bg-neutral-100 items-center justify-between gap-1  px-3 py-1 rounded-none">
            Greater than
            <ChevronRight size={16} />
          </Button>
          <Button
            role="button"
            onClick={() => {onChange("greater_equal_to") ; onOpenChange(false)}}
            tabIndex={0}
            className="flex bg-secondary text-secondary-foreground  cursor-pointer hover:bg-neutral-100 items-center justify-between gap-1  px-3 py-1 rounded-none">
            Greater than equal to
            <section className="flex items-center relative -left-[12px]">
              <ChevronRight size={16} className="absolute -left-[10px]" />
              <Equal size={16} className="absolute" />
            </section>
          </Button>
          <Button
            role="button"
            onClick={() => {onChange("less_than"); onOpenChange(false)}}
            tabIndex={0}
            className="flex bg-secondary text-secondary-foreground  cursor-pointer hover:bg-neutral-100 items-center justify-between gap-1  px-3 py-1 rounded-none">
            Less than
            <ChevronLeft size={16} />
          </Button>
          <Button
            role="button"
            tabIndex={0}
            onClick={() => {onChange("less_than_eqal"); onOpenChange(false)}}
            className="flex bg-secondary text-secondary-foreground  cursor-pointer hover:bg-neutral-100 items-center justify-between gap-1  px-3 py-1 rounded-none">
            Less than equal to
            <section className="flex items-center relative -left-[12px]">
              <Equal size={16} className="absolute -left-[10px]" />
              <ChevronLeft size={16} className="absolute" />
            </section>
          </Button>
          <Button
            role="button"
            tabIndex={0}
            onClick={() => {onChange("between_inclusive"); onOpenChange(false)}}
            className="flex bg-secondary text-secondary-foreground  cursor-pointer hover:bg-neutral-100 items-center justify-between gap-1  px-3 py-1 rounded-none">
            Between inclusive
            <section className=" flex items-center gap-4 relative -left-[12px]">
            <section className="flex items-center relative -left-[10px]">
              <Equal size={16} className="absolute -left-[10px]" />
              <ChevronLeft size={16} className="absolute" />
            </section>
            <section className="flex items-center relative">
              <ChevronRight size={16} className="absolute -left-[10px]" />
              <Equal size={16} className="absolute" />
            </section>
            </section>

          </Button>
          <Button
            role="button"
            tabIndex={0}
            onClick={() => {onChange("between_exclusive"); onOpenChange(false)}}
            className="flex bg-secondary text-secondary-foreground rounded-none  cursor-pointer hover:bg-neutral-100 items-center justify-between gap-1  py-1">
            Between exclusive
            <section className="flex items-center  gap-1">
              <ChevronLeft size={16} className="" />
              <ChevronRight size={16} className="" />
            </section>
          </Button>
        </section>
      </PopoverContent>
    </Popover>
  );
};
