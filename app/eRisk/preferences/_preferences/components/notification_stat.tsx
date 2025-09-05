import { Label } from "@/components/ui/label";
import { BellDot } from "lucide-react";
import { ReactNode } from "react";

interface NotificationStatProps {
  children?: ReactNode;
}

export const NotificationStat = ({}: NotificationStatProps) => {
  return (
    <section id="main" className="bg-blue-300 h-full rounded-lg flex flex-col">
      <section id="header" className="flex items-center pl-2 pt-1">
        <BellDot size={16} />
        <Label className="font-semibold text-sm pl-2">Nofications</Label>
      </section>
      <section id="body" className="flex items-center flex-1">
        <section id="right" className="flex flex-col flex-1">
          <section
            id="top"
            className="flex items-center justify-between px-5 gap-1.5 w-full">
            <section>
              <Label className="font-normal text-sm">New</Label>
            </section>
            <section>
              <Label className="font-mono text-[20px]">40</Label>
            </section>
          </section>
          <section
            id="bottom"
            className="flex items-center justify-between px-5 gap-1.5 w-full">
            <section>
              <Label className="font-normal text-sm">All</Label>
            </section>
            <section>
              <Label className="font-mono text-[20px]">60</Label>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};
