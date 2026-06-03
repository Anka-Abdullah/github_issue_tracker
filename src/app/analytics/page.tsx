"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import BurndownChart from "@/components/dashboard/BurndownChart";
import LabelChart from "@/components/dashboard/LabelChart";
import { useAnalytics } from "@/hooks/useAnalytics";
import { exportPDF } from "@/lib/api";
import type { Repository } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { mockRepos } from "@/lib/mockData";

export default function AnalyticsPage() {
  const [activeRepo, setActiveRepo] = useState<Repository>(mockRepos[0]);
  const { data, isLoading } = useAnalytics(activeRepo.owner, activeRepo.name);

  const skeletonKeys = ["skeleton-0", "skeleton-1", "skeleton-2", "skeleton-3"];

  const summaryItems = [
    { key: "total-open", label: "Total open", value: data?.open_count ?? "—" },
    { key: "total-closed", label: "Total closed", value: data?.closed_count ?? "—" },
    { key: "close-rate", label: "Close rate", value: `${Math.round((data?.close_rate ?? 0) * 100)}%` },
    { key: "avg-resolution", label: "Avg resolution", value: `${data?.avg_resolution_days?.toFixed(1) ?? "—"} days` },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <Topbar username="anka" />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          repos={mockRepos}
          activeRepo={activeRepo.full_name}
          onRepoSelect={setActiveRepo}
        />

        <main className="flex-1 overflow-auto p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-medium text-gray-900 dark:text-white">Analytics</h1>
            <span className="text-sm text-gray-400 dark:text-gray-500">— {activeRepo.name}</span>
            <div className="flex-1" />
            <button
              onClick={() => exportPDF(activeRepo.owner, activeRepo.name)}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#2d2d2d] bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors text-gray-600 dark:text-gray-300"
            >
              <Download size={13} />
              Export PDF
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {skeletonKeys.map((key) => (
                <div key={key} className="h-48 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Weekly Trend */}
              <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2d2d2d] rounded-xl p-4">
                <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Weekly opened vs closed
                </h2>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={data?.weekly_trend ?? []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" strokeOpacity={0.5} />
                    <XAxis 
                      dataKey="week" 
                      tick={{ fontSize: 10, fill: "#9ca3af" }} 
                      tickLine={false} 
                      axisLine={false} 
                      stroke="#9ca3af"
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: "#9ca3af" }} 
                      tickLine={false} 
                      axisLine={false} 
                      stroke="#9ca3af"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        fontSize: 12, 
                        borderRadius: 8, 
                        border: "0.5px solid #e5e7eb",
                        backgroundColor: "var(--bg-surface, #ffffff)",
                        color: "var(--text-primary, #111827)",
                      }} 
                    />
                    <Legend wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} />
                    <Bar dataKey="opened" fill="#93c5fd" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="closed" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Burndown */}
              <BurndownChart data={data?.burndown} />

              {/* Labels */}
              <LabelChart data={data?.issues_by_label} />

              {/* Summary stats */}
              <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2d2d2d] rounded-xl p-4">
                <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Summary</h2>
                <div className="space-y-3">
                  {summaryItems.map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}