"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Filter } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import StatsRow from "@/components/dashboard/StatsRow";
import IssueList from "@/components/dashboard/IssueList";
import LabelChart from "@/components/dashboard/LabelChart";
import BurndownChart from "@/components/dashboard/BurndownChart";
import { useIssues } from "@/hooks/useIssues";
import { useAnalytics } from "@/hooks/useAnalytics";
import type { Repository } from "@/lib/types";
import { mockRepos } from "@/lib/mockData";

export default function DashboardPage() {
  const [activeRepo, setActiveRepo] = useState<Repository>(mockRepos[0]);
  const [lastSynced, setLastSynced] = useState<string>("");

  const { data: issues, isLoading: issuesLoading, refetch } = useIssues(
    activeRepo.owner,
    activeRepo.name
  );

  const { data: analytics, isLoading: analyticsLoading } = useAnalytics(
    activeRepo.owner,
    activeRepo.name
  );

  useEffect(() => {
    setLastSynced(
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <Topbar username="anka" />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          repos={mockRepos}
          activeRepo={activeRepo.full_name}
          onRepoSelect={setActiveRepo}
          openCounts={{ total: mockRepos.reduce((s, r) => s + r.open_issues_count, 0) }}
        />

        <main className="flex-1 overflow-auto p-5 flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <div>
              <h1 className="text-base font-medium text-gray-900 dark:text-white">
                {activeRepo.name}
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Last synced at {lastSynced || "—"}
              </p>
            </div>
            <div className="flex-1" />
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#2d2d2d] bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-gray-600 dark:text-gray-300"
            >
              <RefreshCw size={13} />
              Sync
            </button>
            <button className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#2d2d2d] bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-gray-600 dark:text-gray-300">
              <Filter size={13} />
              Filter
            </button>
          </div>

          <StatsRow data={analytics} loading={analyticsLoading} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-3.5">
            <IssueList issues={issues ?? []} loading={issuesLoading} />

            <div className="flex flex-col gap-3.5">
              <LabelChart data={analytics?.issues_by_label} />
              <BurndownChart data={analytics?.burndown} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}