"use client";

import type { AnalyticsData } from "@/lib/types";

interface LabelChartProps {
  readonly data?: AnalyticsData["issues_by_label"];
}

const COLORS = ["#E24B4A", "#378ADD", "#EF9F27", "#888780", "#7F77DD", "#1D9E75"];

export default function LabelChart({ data = [] }: LabelChartProps) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2d2d2d] rounded-xl p-4">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">By label</h2>
      {data.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-4">No data</p>
      ) : (
        <div className="space-y-2">
          {data.map((item, idx) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-14 text-xs text-gray-500 dark:text-gray-400 truncate text-right">
                {item.label}
              </span>
              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-[#2a2a2a] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.count / max) * 100}%`,
                    background: COLORS[idx % COLORS.length],
                  }}
                />
              </div>
              <span className="w-5 text-right text-xs text-gray-400 dark:text-gray-500">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}