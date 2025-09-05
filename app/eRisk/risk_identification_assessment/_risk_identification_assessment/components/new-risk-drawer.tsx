"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ReactNode } from "react";
import { RiskOnboarding } from "../components/risk-onboarding";

interface NewRiskOnboardingProps {
  children?: ReactNode;
}

export const NewRiskOnboardingDrawer = ({
  children,
}: NewRiskOnboardingProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="ml-[56px] min-h-[calc(100svh-56px)] flex">
        <RiskOnboarding />
      </DrawerContent>
    </Drawer>
  );
};
