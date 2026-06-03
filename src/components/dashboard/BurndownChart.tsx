"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { AnalyticsData } from "@/lib/types";

interface BurndownChartProps {
  readonly data?: AnalyticsData["burndown"];
}

export default function BurndownChart({ data = [] }: BurndownChartProps) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2d2d2d] rounded-xl p-4">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Burndown chart
      </h2>
      <div className="flex gap-4 mb-3">
        <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
          <span className="w-4 border-t-2 border-dashed border-blue-300 dark:border-blue-600 inline-block" />
          {' Ideal'}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
          <span className="w-4 border-t-2 border-blue-500 dark:border-blue-400 inline-block" />
          {' Actual'}
        </span>
      </div>

      {data.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-6">
          No data available
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" strokeOpacity={0.5} />
            <XAxis
              dataKey="day"
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
                border: "0.5px solid #e5e7eb",
                borderRadius: 8,
                boxShadow: "none",
                backgroundColor: "var(--bg-surface, #ffffff)",
                color: "var(--text-primary, #111827)",
              }}
            />
            <Line
              type="monotone"
              dataKey="ideal"
              stroke="#93c5fd"
              strokeWidth={1.5}
              strokeDasharray="5 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}