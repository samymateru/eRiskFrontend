"use client"
import { useLocalStorage } from "@/lib/hooks/use-localstorage";
import { RiskHeader } from "../components/risk_header";
import { RiskTable } from "../tables/risk_table";

export const RiskListView = () => {
    const moduleId = useLocalStorage("module_id");
  

  return (
    <section className="flex flex-col gap-3">
      <RiskHeader />
      <section className="px-2">
        <RiskTable moduleId={moduleId} />
      </section>
    </section>
  );
};
