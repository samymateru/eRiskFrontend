import { SimpleChartBar } from "@/components/charts/simple-bar-chart";
import { SimpleRadialStacked } from "@/components/charts/simple-radial-chart";
import { TopRiskTable } from "./_eRisk/tables/top-risk-table";
import { Label } from "@/components/ui/label";


export default function eRiskHomePage() {
  return (
    <div className="flex flex-col gap-5 w-full px-2 py-3 overflow-y-auto overflow-x-hidden bg-neutral-100">
      <div className="text-primary flex h-[350px] gap-3">
        <section className="drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)]">
          <SimpleRadialStacked title="Risk Summary" />
        </section>
        <section className="flex-1 drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)]">
          <SimpleChartBar />
        </section>
        <section className="drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)]">
          <SimpleRadialStacked title="Risk Exceptions" />
        </section>
      </div>
      <div className="flex bg-neutral-100 p-2 rounded-md flex-col gap-1 drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)]">
        <section>
          <Label className="font-bold text-[16px] pl-2">Top Risk</Label>
        </section>
        <section className="bg-neutral-100">
          <TopRiskTable />
        </section>
      </div>
    </div>
  );
}
