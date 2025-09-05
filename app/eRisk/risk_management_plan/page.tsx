import { Label } from "@/components/ui/label";
import { RMPViewController } from "./_risk_management_plan/views/rmp_view_controller";

export default function RiskManagementPlanPage() {
  return (
    <div className="w-full flex flex-col gap-5 mt-4">
      <section className="flex items-center justify-between px-2">
        <section>
          <Label className="font-bold text-[18px]">Risk Management Plans</Label>
        </section>
        <section className="flex flex-col gap-1">
          <section>
            <Label>RMP-001-2025</Label>
          </section>
          <section className="self-end">
            <Label className="text-[13px] bg-emerald-800 w-fit px-3 h-5 flex items-center justify-center rounded-full text-neutral-200">
              Active
            </Label>
          </section>
        </section>
      </section>
      <RMPViewController />
    </div>
  );
}
