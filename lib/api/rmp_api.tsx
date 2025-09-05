import { useModularQuery } from "../hooks/use-query";
import { ReadRMPType } from "../schemas/rmp_schemas";
import { fetchData } from "../utils/api-helper";

export const useFetchAllRMP = (moduleId?: string | null) => {
  return useModularQuery(
    ["rmp_fetch", moduleId],
    () => fetchData<ReadRMPType[]>(`/rmp/${moduleId}`),
    !!moduleId
  );
};
