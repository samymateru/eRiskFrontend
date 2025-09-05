import {useModularQuery} from "@/lib/hooks/use-query";
import {fetchData} from "@/lib/utils/api-helper";
import {ReadUserType} from "@/lib/schemas/user";

export const useFetchModuleUsers = (moduleId?: string | null) => {
    return useModularQuery(
        ["module_users_fetch", moduleId],
        () => fetchData<ReadUserType[]>(`/risk_users/${moduleId}`),
        !!moduleId
    );
};

export const useFetchModuleUser = (moduleId?: string | null, userId?: string | null) => {
    return useModularQuery(
        ["module_user_fetch", moduleId],
        () => fetchData<ReadUserType>(`/risk_users/user/${moduleId}?user_id=${userId}`),
        !!moduleId && !!userId
    );
};