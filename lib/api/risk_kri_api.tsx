import {useModularQuery} from "@/lib/hooks/use-query";
import {fetchData} from "@/lib/utils/api-helper";
import {ReadKRIType} from "@/lib/schemas/kir-schemas";


export const useFetchRiskKRI = (riskId?: string | null) => {
    return useModularQuery(
        ["fetch_risk_kri", riskId],
        () => fetchData<ReadKRIType[]>(`/risk_kri/${riskId}`),
        !!riskId
    );
};
