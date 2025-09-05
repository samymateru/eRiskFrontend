import { useQuery, QueryFunction, QueryKey } from "@tanstack/react-query";

export function useModularQuery<TData>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TData>,
  enabled: boolean = true
) {
  return useQuery<TData>({
    queryKey,
    queryFn,
    enabled,
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000*60,
  });
}
