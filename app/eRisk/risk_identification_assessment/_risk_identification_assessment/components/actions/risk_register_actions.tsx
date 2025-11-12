import { BaseActionItem } from "@/components/shared/base-action-item";
import { BaseActions } from "@/components/shared/base-actions";
import { CirclePlus, Download, Forward, ScanSearch } from "lucide-react";
import { ReactNode } from "react";
import { NewRiskOnboardingDrawer } from "../new-risk-drawer";
import { AllRiskRegisterList } from "../all_register";
import { NewRiskRegister } from "../../forms/new_risk_register";

interface RegisterActionsProps {
  children: ReactNode;
}

export const RegisterActions = ({ children }: RegisterActionsProps) => {
  return (
    <BaseActions
      side="bottom"
      sideOffset="10"
      trigger={children}
      tooltip="Risk Register"
      text="Risk Register Actions">
      <NewRiskOnboardingDrawer>
        <BaseActionItem icon={<CirclePlus size={16} />} text="New Risk" />
      </NewRiskOnboardingDrawer>
      <NewRiskRegister>
        <BaseActionItem icon={<Forward size={16} />} text="Roll Forward" />
      </NewRiskRegister>
      <AllRiskRegisterList>
        <BaseActionItem icon={<ScanSearch size={16} />} text="All Registers" />
      </AllRiskRegisterList>
      <BaseActionItem icon={<Download size={16} />} text="Export" />
    </BaseActions>
  );
};
