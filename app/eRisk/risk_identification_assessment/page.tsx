import { Label } from "@/components/ui/label";
import { RiskAssessmentViewContoller } from "./_risk_identification_assessment/views/view-controller";

export default function RiskIdentificationPage() {
  return (
    <div className="w-full flex flex-col gap-5 mt-4">
      <section className="flex items-center justify-between px-2">
        <Label className="font-bold text-[18px]">
          Risk Identification and Assessment
        </Label>
        <section className="flex flex-col gap-1">
          <section>
            <Label>RG-001-2025</Label>
          </section>
          <section className="self-end">
            <Label className="text-[13px] bg-emerald-800 w-fit px-3 h-5 flex items-center justify-center rounded-full text-neutral-200">
              Active
            </Label>
          </section>
        </section>
      </section>
      <RiskAssessmentViewContoller />
    </div>
  );
}
