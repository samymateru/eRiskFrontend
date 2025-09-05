import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode } from "react";
import { RiskRegisterTable } from "../tables/risk_register_table";

interface AllRiskRegisterListProps {
  children: ReactNode;
}

export const AllRiskRegisterList = ({ children }: AllRiskRegisterListProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="ml-[56px] min-h-[calc(100svh-56px)] flex">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold text-left">
            Risk Registers
          </DrawerTitle>
          <DrawerDescription className="text-left text-neutral-900">
            This section List all Register saved in your module
          </DrawerDescription>
        </DrawerHeader>
        <section id="main" className="px-4">
          <RiskRegisterTable />
        </section>
      </DrawerContent>
    </Drawer>
  );
};
