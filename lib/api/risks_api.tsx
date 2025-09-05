import {useModularQuery} from "@/lib/hooks/use-query";
import {fetchData} from "@/lib/utils/api-helper";
import {ReadRiskType} from "@/lib/schemas/risk-schemas";


export const useFetchAllRisks = (moduleId?: string | null) => {
    return useModularQuery(
        ["fetch_risks", moduleId],
        () => fetchData<ReadRiskType[]>(`/risks/${moduleId}`),
        !!moduleId
    );
};

export const useFetchRisk = (riskId?: string | null) => {
    return useModularQuery(
        ["fetch_risk", riskId],
        () => fetchData<ReadRiskType>(`/risks/risk/${riskId}`),
        !!riskId
    );
};

