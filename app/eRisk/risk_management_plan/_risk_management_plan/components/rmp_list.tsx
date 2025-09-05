import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode } from "react";
import { RMPTable } from "../tables/rmp_table";

interface AllRMPListProps {
  children: ReactNode;
}

export const AllRMPList = ({ children }: AllRMPListProps) => {
  
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="ml-[56px] min-h-[calc(100svh-56px)] flex">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold text-left">
            Risk Management Plans
          </DrawerTitle>
          <DrawerDescription className="text-left text-neutral-900">
            This section List all Risk Management Plans saved in your module
          </DrawerDescription>
        </DrawerHeader>
        <section id="main" className="px-4">
          <RMPTable />
        </section>
      </DrawerContent>
    </Drawer>
  );
};
