import {useModularQuery} from "@/lib/hooks/use-query";
import {fetchData} from "@/lib/utils/api-helper";
import {
    ReadActivityReportType
} from "@/lib/schemas/activity_reports_schemas";


export const useFetchAllActivityReports = (activityId?: string | null) => {
    return useModularQuery(
        ["activity_reports_fetch", activityId],
        () => fetchData<ReadActivityReportType[]>(`/activity_reports/${activityId}`),
        !!activityId
    );
};