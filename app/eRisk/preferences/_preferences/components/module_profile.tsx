import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EllipsisVertical } from "lucide-react";

export const ModuleProfile = () => {
  return (
    <section className="h-full p-2 rounded-md flex flex-col gap-2">
      <section id="header" className="flex items-start justify-between">
        <section>
          <Label className="font-bold text-[18px]">Module Profile</Label>
        </section>
        <section className="flex items-center gap-1.5">
          <section id="status">
            <Label className="w-fit bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center px-3 py-0.5 rounded-full">
              Active
            </Label>
          </section>
          <section id="actions">
            <Button className="flex h-6 w-6 rounded-full">
              <EllipsisVertical size={16} />
            </Button>
          </section>
        </section>
      </section>
      {/* ------------------------------------- */}
      <section className="flex items-center gap-2">
        <section id="logo">
          <Avatar className="w-10 h-10">
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
        </section>
        <section id="name" className="flex flex-col gap-3 justify-center">
          <Label className="font-[500] text-[14px] leading-0.5">
            Capstone Auditors
          </Label>
          <Label className="font-[400] text-[14px] leading-0.5">
            eRiskNext
          </Label>
        </section>
      </section>
      {/* ------------------------ */}
    </section>
  );
};
