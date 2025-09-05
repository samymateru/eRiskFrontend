import { useModularQuery } from "../hooks/use-query";
import { ReadActivityType } from "../schemas/activity-schemas";
import { fetchData } from "../utils/api-helper";

export const useFetchAllActivities = (moduleId?: string | null) => {
  return useModularQuery(
    ["activities_fetch", moduleId],
    () => fetchData<ReadActivityType[]>(`/activities/${moduleId}`),
    !!moduleId
  );
};

export const useFetchSingleActivity = (activityId?: string | null) => {
  return useModularQuery(
    ["activity_fetch", activityId],
    () => fetchData<ReadActivityType>(`/activities/activity/${activityId}`),
    !!activityId
  );
};
