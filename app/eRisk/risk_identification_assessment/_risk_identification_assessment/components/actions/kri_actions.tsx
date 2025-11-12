"use client";
import { BaseActionItem } from "@/components/shared/base-action-item";
import { BaseActions } from "@/components/shared/base-actions";
import { Trash, Edit, Eye } from "lucide-react";
import { ReactNode } from "react";

interface RiskKRIActionsProps {
  children: ReactNode;
  risk_id: string;
  kriId: string
  side?: "top" | "left" | "bottom" | "right";
  offset?: number;
  low?: string;
  medium?: string;
  high?: string;
  very_high?: string;
  description?: string;
  type?: string
}

export const RiskKRIActions = ({
  children,
  side = "left",
  offset = 90,
  risk_id,
  kriId,
  type,
  description,
  low,
  medium,
  high,
  very_high
  }: RiskKRIActionsProps) => {
  const setAction = useSetSearchParams(`/eRisk/risk_profile_reports`);

  return (
    <BaseActions trigger={children} side={side} offset={offset} text="KRI Actions">
        <Button onClick={() => setAction({action: "kri_details", riskId: risk_id, kriId: kriId})} asChild>
            <BaseActionItem icon={<Eye size={16} />} text="View Details" />
        </Button>
        <BaseActionItem icon={<Edit size={16} />} text="Edit" />
        <NewRiskProfile
            riskId={risk_id}
            kriId={kriId}
            description={description}
            type={type}
            thresholds={
                {
                    low: low,
                    medium: medium,
                    high: high,
                    very_high: very_high
                }
            }
        >
            <BaseActionItem icon={<Eye size={16} />} text="KRI Review Rating" />
        </NewRiskProfile>
      <BaseActionItem icon={<Trash size={16} />} text="Delete" />
    </BaseActions>
  );
};

import { NewKRI } from "../new-kri";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {NewRiskProfile} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/new_risk_profile";
import {Button} from "@/components/ui/button";
import {useSetSearchParams} from "@/lib/hooks/useActionsParams";


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
