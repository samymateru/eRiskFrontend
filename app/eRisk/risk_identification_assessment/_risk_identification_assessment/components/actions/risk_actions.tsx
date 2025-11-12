"use client";
import { BaseActionItem } from "@/components/shared/base-action-item";
import { BaseActions } from "@/components/shared/base-actions";
import {
    Trash,
    Edit,
    Eye,
    UsersIcon, CirclePlus, MessageCircleReply
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import {AssignRiskOwners} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/assign_risk_owners";
import {
    CreateKRIAction
} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/actions/kri_actions";
import {
    CreateRiskResponseAction
} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/risk_response-actions";

interface RiskActionsProps {
  children: ReactNode;
  riskId?: string | null;
  shoView?: boolean
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: string
}

export const RiskActions = ({
  children,
  riskId,
  shoView = true,
  side="bottom",
  sideOffset = "10",
}: RiskActionsProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <BaseActions
      trigger={children}
      side={side}
      sideOffset={sideOffset}
      text="Risk Actions">
      <section className="flex flex-col gap-1">
        {shoView && (
          <BaseActionItem
            onClick={() =>
                router.push(
                    pathname + `?action=risk_details&risk_id=${riskId}`
                )
            }
            icon={<Eye size={16} />}
            text="View"
          /> )
        }

        <AssignRiskOwners riskId={riskId}>
          <BaseActionItem icon={<UsersIcon size={16} />} text="Assign Risk Leads" />
        </AssignRiskOwners>
        <BaseActionItem icon={<Edit size={16} />} text="Edit" />
        <CreateKRIAction risk_id={riskId}>
          <BaseActionItem icon={<CirclePlus size={16} />} text="Add KRI" />
        </CreateKRIAction>
        <CreateRiskResponseAction risk_id={riskId}>
          <BaseActionItem icon={<MessageCircleReply size={16} />} text="Add Response" />
        </CreateRiskResponseAction>
        <BaseActionItem icon={<Trash size={16} />} text="Delete" />
      </section>
    </BaseActions>
  );
};
