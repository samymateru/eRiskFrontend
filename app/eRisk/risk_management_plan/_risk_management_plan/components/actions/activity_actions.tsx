"use client";
import { BaseActionItem } from "@/components/shared/base-action-item";
import { BaseActions } from "@/components/shared/base-actions";
import {
    Trash,
    Edit,
    Eye,
    CircleCheck,
    UsersIcon
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import {
    NewActivityReport
} from "@/app/eRisk/risk_management_plan/_risk_management_plan/components/new_activity_report";
import {
    AssignActivityOwners
} from "@/app/eRisk/risk_management_plan/_risk_management_plan/components/assign_activity_owners";

interface ActivitiesActionsProps {
  children: ReactNode;
  activityId: string;
}

export const ActivitiesActions = ({
  children,
  activityId,
}: ActivitiesActionsProps) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <BaseActions
      trigger={children}
      side="left"
      offset={90}
      text="Activity Actions">
      <BaseActionItem
        onClick={() =>
          router.push(
            pathname +
              `?action=activity_details&activity_id=${activityId}`
          )
        }
        icon={<Eye size={16} />}
        text="View"
      />
      <BaseActionItem icon={<Edit size={16} />} text="Edit" />
      <AssignActivityOwners>
        <BaseActionItem icon={<UsersIcon size={16} />} text="Assign Leads"/>
      </AssignActivityOwners>
      <BaseActionItem icon={<Trash size={16} />} text="Delete" />
        <NewActivityReport activityId={activityId}>
            <BaseActionItem
              icon={<CircleCheck size={16} />}
              text="Add Status / Report"
            />
        </NewActivityReport>
    </BaseActions>
  );
};
