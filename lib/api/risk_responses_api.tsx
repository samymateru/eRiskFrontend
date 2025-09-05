import { useEffect, useState } from "react";
import { useModularQuery } from "../hooks/use-query";
import { ReadRiskResponseType } from "../schemas/risk-responses-schemas";
import { fetchData } from "../utils/api-helper";

export const useFetchAllRiskResponses = () => {
  const [moduleId, setModuleId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const data = localStorage.getItem("module_id");
      setModuleId(data);
    }
  }, []);

  return useModularQuery(
    ["all_risk_responses", moduleId],
    () => fetchData<ReadRiskResponseType[]>(`/risk_responses/all/${moduleId}`),
    !!moduleId
  );
};

export const useFetchRiskResponses = (riskId?: string | null) => {
  return useModularQuery(["rrisk_responses", riskId], () =>
    fetchData<ReadRiskResponseType[]>(`/risk_responses/${riskId}`)
  );
};
