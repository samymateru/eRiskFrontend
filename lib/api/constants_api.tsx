import {useModularQuery} from "@/lib/hooks/use-query";
import {fetchDataExternal} from "@/lib/utils/api-helper";

type BusinessProcess = {
    id: string;
    process_name: string;
    code: string;
    sub_process_name: string[];
};


export const useFetchEntityProcesses = (entityId?: string | null) => {
    return useModularQuery(
        ["fetch_process", entityId],
        () => fetchDataExternal<BusinessProcess[]>(`/profile/business_process/${entityId}`),
        !!entityId
    );
};
