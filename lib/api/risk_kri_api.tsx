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

export const useFetchAllRiskKRI = (moduleId?: string | null) => {
    return useModularQuery(
        ["fetch_all_kri", moduleId],
        () => fetchData<ReadKRIType[]>(`/risk_kri/review/${moduleId}`),
        !!moduleId
    );
};

export const useFetchKRI = (kriId?: string | null) => {
    return useModularQuery(
        ["fetch_kri", kriId],
        () => fetchData<ReadKRIType>(`/risk_kri/kri/${kriId}`),
        !!kriId
    );
};

export const useFetchOverRiskKRI = (moduleId?: string | null, frequency?: string | null) => {
    return useModularQuery(
        ["fetch_overdue_kri", moduleId, frequency],
        () => fetchData<ReadKRIType[]>(`/risk_kri/kri/overdue/${moduleId}?frequency=${frequency}`),
        !!moduleId && !!frequency
    );
};

