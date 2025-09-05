"use client";
import { BaseActionItem } from "@/components/shared/base-action-item";
import { BaseActions } from "@/components/shared/base-actions";
import { Trash, Edit, Eye } from "lucide-react";
import { ReactNode } from "react";
import { NewRiskResponse } from "./new-risk-response";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface RiskResponseActionsProps {
  children: ReactNode;
  risk_id?: string | null;
}

export const RiskResponseActions = ({
  children,
  risk_id,
}: RiskResponseActionsProps) => {
  console.log(risk_id);

  return (
    <BaseActions
      trigger={children}
      side="left"
      offset={90}
      text="Risk Response Actions">
      <BaseActionItem icon={<Eye size={16} />} text="Response Details" />
      <BaseActionItem icon={<Edit size={16} />} text="Update" />
      <BaseActionItem icon={<Trash size={16} />} text="Remove" />
    </BaseActions>
  );
};

interface CreateRiskResponseActionProps {
  children: ReactNode;
  risk_id?: string | null;
}

export const CreateRiskResponseAction = ({
  children,
  risk_id,
}: CreateRiskResponseActionProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="ml-[56px] min-h-[calc(100svh-56px)] flex">
        <NewRiskResponse isOnBoard={true} riskId={risk_id ?? ""} />
      </DrawerContent>
    </Drawer>
  );
};
