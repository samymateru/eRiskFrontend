import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { ReactNode } from "react";

interface UserStatProps {
  children?: ReactNode;
}

export const UserStat = ({}: UserStatProps) => {
  return (
    <section
      id="main"
      className="bg-indigo-300 h-full rounded-lg flex flex-col">
      <section id="header" className="flex items-center pl-2 pt-1">
        <User size={16} />
        <Label className="font-semibold text-sm pl-2">Users</Label>
      </section>
      <section id="body" className="flex items-center flex-1">
        <section
          id="left"
          className="flex h-full flex-col gap-1 pt-1 items-center px-4">
          <section>
            <Label className="font-bold font-mono font- text-[20px]">100</Label>
          </section>
          <section>
            <Label className="text-[14px] font-normal leading-0.5">Total</Label>
          </section>
        </section>
        <section id="right" className="flex flex-col flex-1">
          <section
            id="top"
            className="flex items-center gap-1.5 justify-between px-5 w-full">
            <section>
              <Label className="font-normal text-sm">Risk</Label>
            </section>
            <section>
              <Label className="font-mono text-[20px]">40</Label>
            </section>
          </section>
          <section
            id="bottom"
            className="flex items-center justify-between px-5 gap-1.5 w-full">
            <section>
              <Label className="font-normal text-sm">Clients</Label>
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
