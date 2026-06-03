"use client";

import { useQuery } from "@tanstack/react-query";
import { mockGetIssues } from "@/lib/mockData";
import type { IssueFilters } from "@/lib/types";

export function useIssues(owner: string, repo: string, filters?: IssueFilters) {
  return useQuery({
    queryKey: ["issues", owner, repo, filters],
    queryFn: () => mockGetIssues(owner, repo),
    enabled: !!owner && !!repo,
    staleTime: 60_000,
  });
}