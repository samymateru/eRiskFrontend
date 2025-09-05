"use client";
import { BaseActionItem } from "@/components/shared/base-action-item";
import { BaseActions } from "@/components/shared/base-actions";
import { Trash, Edit, Eye } from "lucide-react";
import { ReactNode } from "react";

interface RiskKRIActionsProps {
  children: ReactNode;
  risk_id: string;
}

export const RiskKRIActions = ({ children, risk_id }: RiskKRIActionsProps) => {
  console.log(risk_id);

  return (
    <BaseActions trigger={children} side="left" offset={90} text="KRI Actions">
      <BaseActionItem icon={<Eye size={16} />} text="KRI Details" />
      <BaseActionItem icon={<Edit size={16} />} text="Update" />
      <BaseActionItem icon={<Trash size={16} />} text="Remove" />
    </BaseActions>
  );
};

import { NewKRI } from "../new-kri";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface CreateKRIActionProps {
  children: ReactNode;
  risk_id?: string | null;
}

export const CreateKRIAction = ({
  children,
  risk_id,
}: CreateKRIActionProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="ml-[56px] min-h-[calc(100svh-56px)] flex">
        <NewKRI showHeader={false} risk_id={risk_id ?? ""} />
      </DrawerContent>
    </Drawer>
  );
};
