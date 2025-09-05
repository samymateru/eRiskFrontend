import { Label } from "@/components/ui/label";
import { Calendar, CircleCheck, Repeat2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserDetails } from "@/components/shared/user-details";

export const ActivityDetailsSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader className="pb-2">
          <SheetTitle>
            <Label className="font-semibold text-xl">Activity Details</Label>
          </SheetTitle>
          <SheetDescription className="absolute"></SheetDescription>
        </SheetHeader>
        <section className="px-2">
          <ActivityDetails />
        </section>
      </SheetContent>
    </Sheet>
  );
};

export const ActivityDetails = () => {
  return (
    <section className="flex flex-col gap-1">
      <section className="flex flex-col gap-1.5 bg-neutral-100 p-2 rounded-md hover:scale-103 transition-all duration-300 ease-[cubic-bezier(.68,-0.55,.27,1.55)]">
        <section className="flex flex-col">
          <section>
            <Label className=" text-sm">STRATEGIC RISK</Label>
          </section>
          <section className="flex items-start gap-1">
            <section className="w-2 h-2 flex bg-primary rounded-full mt-[5px]"></section>

            <Label className="font-medium text-sm opacity-80 flex-1">
              Benchmarking technological adoption against peers Lorem ipsum
              dolor, sit amet consectetur adipisicing elit. Consequatur, laborio
              sam.
            </Label>
          </section>
        </section>
        <section className="flex justify-end">
          <Label className="font-medium text-xs">KRI Review</Label>
        </section>
      </section>

      {/* -------------------------------------- */}
      <section className="flex flex-col gap-0.5 bg-neutral-100 p-2 rounded-md hover:scale-103 transition-all duration-300 ease-[cubic-bezier(.68,-0.55,.27,1.55)]">
        <section className="flex items-center gap-1">
          <CircleCheck size={16} className="text-green-800" />
          <Label className="font-semibold text-base">Completed</Label>
        </section>
        <section className="flex justify-between">
          <section className="flex items-center gap-1">
            <Repeat2 size={16} />
            <Label className="font-medium text-xs">Annually</Label>
          </section>
          <section className="flex items-center gap-1">
            <Calendar size={16} />
            <Label className="font-medium text-xs">19 May 2025</Label>
          </section>
        </section>
      </section>
      {/* ----------------------------------------------------------------- */}
      <section className="mt-4 flex flex-col gap-1">
        <section>
          <Label className="font-medium tex-sm">Creator By</Label>
        </section>
        <section className="bg-neutral-100 p-2 rounded-md hover:scale-103 transition-all duration-300 ease-[cubic-bezier(.68,-0.55,.27,1.55)]">
          <UserDetails
            name="John Doe"
            email="johndoe@gmail.com"
            isAction={false}
            image="https://i.pravatar.cc/150?img=12"
          />
        </section>
      </section>
      {/* ------------------------------------------------------------------ */}
      <section className="mt-4 flex flex-col gap-1">
        <section>
          <Label className="font-medium tex-sm">Leads</Label>
        </section>
        <section className="flex flex-col gap-1">
          <section className="bg-neutral-100 p-2 rounded-md hover:scale-103 transition-all duration-300 ease-[cubic-bezier(.68,-0.55,.27,1.55)]">
            <UserDetails
              name="Anna Richards"
              email="annarichards@gmail.com"
              image="https://i.pravatar.cc/150?img=32"
              isAction={false}
              showLowerSection={false}
            />
          </section>
          <section className="bg-neutral-100 p-2 rounded-md hover:scale-103 transition-all duration-300 ease-[cubic-bezier(.68,-0.55,.27,1.55)]">
            <UserDetails
              name="Samwel Materu"
              email="samymateru1999@gmail.com"
              image="https://i.pravatar.cc/150?img=65"
              isAction={false}
              showLowerSection={false}
            />
          </section>
          <section className="bg-neutral-100 p-2 rounded-md hover:scale-103 transition-all duration-300 ease-[cubic-bezier(.68,-0.55,.27,1.55)]">
            <UserDetails
              name="Luck Dube"
              email="luckdube@gmail.com"
              image="https://i.pravatar.cc/150?img=64"
              isAction={false}
              showLowerSection={false}
            />
          </section>
        </section>
      </section>
    </section>
  );
};
