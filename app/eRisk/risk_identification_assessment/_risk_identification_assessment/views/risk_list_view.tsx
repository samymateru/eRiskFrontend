"use client"
import { useLocalStorage } from "@/lib/hooks/use-localstorage";
import { RiskTable } from "../tables/risk_table";
import {RiskIdentificationAssessmentHeader} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/risk_identification_assessment_header";
import {useCallback, useState} from "react";

export const RiskListView = () => {
    const moduleId = useLocalStorage("module_id");
    const [riskIds, setRiskIds] = useState<string[]>([])

    const handleSelectionChange = useCallback((riskIds: string[]) => {
        setRiskIds(riskIds);
    }, []);

  return (
    <section className="flex flex-col gap-3">
      <RiskIdentificationAssessmentHeader riskIds={riskIds}/>
      <section className="px-2">
        <RiskTable onSelectionChange={handleSelectionChange} moduleId={moduleId} />
      </section>
    </section>
  );
};
