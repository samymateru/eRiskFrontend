import {useModularQuery} from "@/lib/hooks/use-query";
import {fetchDataExternal} from "@/lib/utils/api-helper";

type BusinessProcess = {
    id: string;
    process_name: string;
    code: string;
    sub_process_name: string[];
};

type RiskCategory = {
    risk_category: string;
    sub_risk_category: string[];
};


export const useFetchEntityProcesses = (entityId?: string | null) => {
    return useModularQuery(
        ["fetch_process", entityId],
        () => fetchDataExternal<BusinessProcess[]>(`/profile/business_process/${entityId}`),
        !!entityId
    );
};

export const useFetchEntityRiskCategory = (entityId?: string | null) => {
    return useModularQuery(
        ["fetch_risk_category", entityId],
        () => fetchDataExternal<RiskCategory[]>(`/profile/risk_category/${entityId}`),
        !!entityId
    );
};
