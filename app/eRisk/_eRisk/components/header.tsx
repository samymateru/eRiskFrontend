import SearchInput from "@/components/inputs/search-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BellDot, Layers } from "lucide-react";
import { ReactNode } from "react";
import Notifications from "./notifications";
import { Profile } from "./profile";

export const SystemHeader = () => {
  return (
    <section className="px-2 py-2 shadow-neutral-200- shadow-md- flex items-center justify-between">
      <section id="logo" className="flex items-center gap-1 flex-1/2">
        {/* Logo content */}
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            CN
          </AvatarFallback>
        </Avatar>
        <section className="flex flex-col gap-2">
          <Label className="text-[18px] leading-2.5 font-semibold">
            Cornely and Capstone Auditors
          </Label>
          <Label className="text-sm leading-2.5 font-medium bg-primary w-fit px-2 py-1 rounded-full text-neutral-200">
            eRisk
          </Label>
        </section>
      </section>

      <section
        id="action"
        className="flex items-center gap-1 flex-1/3 justify-end">
        <section
          id="search"
          className="flex-grow flex justify-center px-4 flex-1/4">
          <SearchInput />
        </section>
        <section className="flex gap-1">
          <ActionItem tooltip="Switch Organization">
            <Layers />
          </ActionItem>
          <Notifications>
            <ActionItem tooltip="Nofitications">
              <BellDot />
            </ActionItem>
          </Notifications>
          <Profile>
            <ActionItem tooltip="Your Profile">
              <div className="relative h-full w-full">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Kelly King"
                  />
                  <AvatarFallback className="text-neutral-500">
                    KK
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -end-1.5 -top-1.5">
                  <span className="sr-only">Verified</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      className="fill-background"
                      d="M3.046 8.277A4.402 4.402 0 0 1 8.303 3.03a4.4 4.4 0 0 1 7.411 0 4.397 4.397 0 0 1 5.19 3.068c.207.713.23 1.466.067 2.19a4.4 4.4 0 0 1 0 7.415 4.403 4.403 0 0 1-3.06 5.187 4.398 4.398 0 0 1-2.186.072 4.398 4.398 0 0 1-7.422 0 4.398 4.398 0 0 1-5.257-5.248 4.4 4.4 0 0 1 0-7.437Z"
                    />
                    <path
                      className="fill-emerald-500"
                      d="M4.674 8.954a3.602 3.602 0 0 1 4.301-4.293 3.6 3.6 0 0 1 6.064 0 3.598 3.598 0 0 1 4.3 4.302 3.6 3.6 0 0 1 0 6.067 3.6 3.6 0 0 1-4.29 4.302 3.6 3.6 0 0 1-6.074 0 3.598 3.598 0 0 1-4.3-4.293 3.6 3.6 0 0 1 0-6.085Z"
                    />
                    <path
                      className="fill-background"
                      d="M15.707 9.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
                    />
                  </svg>
                </span>
              </div>
            </ActionItem>
          </Profile>
        </section>
      </section>
    </section>
  );
};

interface ActionItemProps {
  children: ReactNode;
  tooltip: string;
}

const ActionItem = ({ children }: ActionItemProps) => {
  return (
    <Button className="p-0 m-0 rounded-full cursor-pointer h-10 w-10">
      {children}
    </Button>
  );
};
