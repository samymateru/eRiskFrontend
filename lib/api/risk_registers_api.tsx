import { useModularQuery } from "../hooks/use-query";
import { ReadRiskRegisterType } from "../schemas/risk_register_schemas";
import { fetchData } from "../utils/api-helper";

export const useFetchAllRiskRegisters = (moduleId?: string | null) => {
  return useModularQuery(
    ["risk_register_fetch", moduleId],
    () => fetchData<ReadRiskRegisterType[]>(`/risk_registers/${moduleId}`),
    !!moduleId
  );
};
