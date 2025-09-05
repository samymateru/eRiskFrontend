"use client";
import { useFetchAllRiskResponses } from "@/lib/api/risk_responses_api";
import { ResponsesHeader } from "../components/responses-header";
import { RiskResponsesTable } from "../tables/responses_table";

export const ControlListView = () => {
  const { data } = useFetchAllRiskResponses();
  return (
    <section className="flex flex-col gap-3">
      <section>
        <ResponsesHeader />
      </section>
      <section className="px-2">
        <RiskResponsesTable data={data} />
      </section>
    </section>
  );
};
