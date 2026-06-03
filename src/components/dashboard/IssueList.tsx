"use client";

import { useState } from "react";
import FilterChip from "@/components/ui/FilterChip";
import IssueItem from "./IssueItem";
import type { Issue, IssueStatus } from "@/lib/types";

const FILTERS: { label: string; value: IssueStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Closed", value: "closed" },
];

interface IssueListProps {
  readonly issues: Issue[];
  readonly loading?: boolean;
}

export default function IssueList({ issues, loading }: IssueListProps) {
  const [activeFilter, setActiveFilter] = useState<IssueStatus | "all">("all");

  const filtered =
    activeFilter === "all"
      ? issues
      : issues.filter((i) => i.status === activeFilter);

  const skeletonKeys = ["skel-0", "skel-1", "skel-2", "skel-3", "skel-4"];

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2d2d2d] rounded-xl p-4">
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Issues</h2>
        <div className="flex gap-1.5 flex-wrap mb-3">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.value}
              label={f.label}
              active={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
            />
          ))}
        </div>
        <div className="space-y-3">
          {skeletonKeys.map((key) => (
            <div key={key} className="h-10 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2d2d2d] rounded-xl p-4">
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Issues</h2>
        <div className="flex gap-1.5 flex-wrap mb-3">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.value}
              label={f.label}
              active={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
            />
          ))}
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 py-6 text-center">No issues found</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2d2d2d] rounded-xl p-4">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Issues</h2>
      <div className="flex gap-1.5 flex-wrap mb-3">
        {FILTERS.map((f) => (
          <FilterChip
            key={f.value}
            label={f.label}
            active={activeFilter === f.value}
            onClick={() => setActiveFilter(f.value)}
          />
        ))}
      </div>
      <div>
        {filtered.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}