import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { ReactNode } from "react";

interface BinStatProps {
  children?: ReactNode;
}

export const BinStat = ({}: BinStatProps) => {
  return (
    <section id="main" className="bg-red-300 h-full rounded-lg flex flex-col">
      <section id="header" className="flex items-center pl-2 pt-1">
        <Trash size={16} />
        <Label className="font-semibold text-sm pl-2">Recycle Bin</Label>
      </section>

      <section id="body" className="flex items-center flex-1">
        <section
          id="left"
          className="flex w-full flex-col gap-1 justify-between items-center px-4">
          <section>
            <Label className="font-bold font-mono font- text-[20px]">100</Label>
          </section>
          <section>
            <Label className="text-[14px] font-normal leading-0.5">
              Items Deleted
            </Label>
          </section>
        </section>
      </section>
    </section>
  );
};
