"use client";
import { BaseActionItem } from "@/components/shared/base-action-item";
import { BaseActions } from "@/components/shared/base-actions";
import { CirclePlus, Download, Forward, ScanSearch } from "lucide-react";
import { ReactNode } from "react";
import { NewActivity } from "../../form/new_activity";
import { AllRMPList } from "../rmp_list";
import { NewRMP } from "../../form/new_rmp";
import { useLocalStorage } from "@/lib/hooks/use-localstorage";

interface RMPActionsProps {
  children: ReactNode;
}

export const RMPActions = ({ children }: RMPActionsProps) => {
  const moduleId = useLocalStorage("module_id");
  return (
    <BaseActions trigger={children} tooltip="Risk Management Plan Activities">
      <NewActivity moduleId={moduleId}>
        <BaseActionItem icon={<CirclePlus size={16} />} text="New Activity" />
      </NewActivity>
      <NewRMP>
        <BaseActionItem icon={<Forward size={16} />} text="Roll Forward" />
      </NewRMP>
      <BaseActionItem icon={<Download size={16} />} text="Export" />
      <AllRMPList>
        <BaseActionItem icon={<ScanSearch size={16} />} text="All RMP" />
      </AllRMPList>
    </BaseActions>
  );
};
