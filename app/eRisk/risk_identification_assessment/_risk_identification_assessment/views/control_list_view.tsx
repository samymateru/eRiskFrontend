"use client";
import { useFetchAllRiskResponses } from "@/lib/api/risk_responses_api";
import { RiskResponsesTable } from "../tables/responses_table";
import {RiskIdentificationAssessmentHeader} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/risk_identification_assessment_header";

export const ControlListView = () => {
  const { data } = useFetchAllRiskResponses();
  return (
    <section className="flex flex-col gap-3">
      <section>
        <RiskIdentificationAssessmentHeader />
      </section>
      <section className="px-2">
        <RiskResponsesTable data={data} type={"full"} height={"208"}/>
      </section>
    </section>
  );
};
