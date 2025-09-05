import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Shield } from "lucide-react";
import { ReactNode } from "react";

interface RiskOnboardingHeaderProps {
  topIcon?: ReactNode;
  title?: string;
  description?: string;
}

export const RiskOnboardingHeader = ({
  topIcon = <Shield size={18} />,
  title = "Welcome to Risk creation wizard",
  description = "This is the first step, provide the details of the risk then addcorrespondind ratings",
}: RiskOnboardingHeaderProps) => {
  return (
    <section className="h-full w-[300px] flex flex-col gap-3 items-center pt-4">
      <section className="flex flex-col items-center pt-2">
        <section>{topIcon}</section>
        <DrawerHeader className="">
          <DrawerTitle className="font-semibold text-base">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
      </section>
      <section className="w-full flex items-center gap-4 px-4"></section>
    </section>
  );
};
