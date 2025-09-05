import { useModularQuery } from "../hooks/use-query";
import { fetchDataExternal } from "../utils/api-helper";

export const useFetchWelcomeToken = (sessionCode?: string | null) => {
  return useModularQuery(
    ["session_code", sessionCode],
    () =>
      fetchDataExternal<{ token?: string }>(`/api/session-code/${sessionCode}`),
    !!sessionCode
  );
};
