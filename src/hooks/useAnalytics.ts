import { useQuery } from "@tanstack/react-query";
import { mockGetAnalytics } from "@/lib/mockData";

export function useAnalytics(owner: string, repo: string) {
  return useQuery({
    queryKey: ["analytics", owner, repo],
    queryFn: () => mockGetAnalytics(owner, repo),
    enabled: !!owner && !!repo,
    staleTime: 5 * 60_000,
  });
}