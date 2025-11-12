import {useModularQuery} from "@/lib/hooks/use-query";
import {fetchData} from "@/lib/utils/api-helper";
import {ReadKRIReportType} from "@/lib/schemas/risk_profiles_schemas";

export const useFetchRiskKRIProfile = (moduleId?: string | null) => {
    return useModularQuery(
        ["fetch_risk_kri_profile", moduleId],
        () => fetchData<ReadKRIReportType[]>(`/profiles_reports/${moduleId}`),
        !!moduleId
    );
};

export const useFetchKRIReports = (moduleId?: string | null) => {
    return useModularQuery(
        ["fetch_kri_reports", moduleId],
        () => fetchData<ReadKRIReportType[]>(`/profiles_reports/kri_reports/${moduleId}`),
        !!moduleId
    );
};

