"use client";
import { BaseActionItem } from "@/components/shared/base-action-item";
import { BaseActions } from "@/components/shared/base-actions";
import { Trash, Edit, Eye } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface RiskResponsesActionsProps {
  children: ReactNode;
  risk_id: string;
}

export const RiskResponsesActions = ({
  children,
  risk_id,
}: RiskResponsesActionsProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <BaseActions
      trigger={children}
      side="bottom"
      sideOffset="-10"
      text="Risk Actions">
      <section className="flex flex-col gap-1">
        <BaseActionItem
          onClick={() =>
            router.push(
              pathname + `?action=${"risk_details"}&risk_id=${risk_id}`
            )
          }
          icon={<Eye size={16} />}
          text="View"
        />
        <BaseActionItem icon={<Edit size={16} />} text="Edit" />
        <BaseActionItem icon={<Trash size={16} />} text="Delete" />
      </section>
    </BaseActions>
  );
};
