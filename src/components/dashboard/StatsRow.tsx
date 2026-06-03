import type { AnalyticsData } from "@/lib/types";

interface StatsRowProps {
  readonly data?: AnalyticsData;
  readonly loading?: boolean;
}

interface StatCardProps {
  readonly label: string;
  readonly value: string | number;
  readonly sub?: string;
  readonly trend?: "up" | "down" | "neutral";
}

function StatCard({ label, value, sub, trend }: StatCardProps) {
  let trendColor: string;
  if (trend === "up") {
    trendColor = "text-emerald-600 dark:text-emerald-400";
  } else if (trend === "down") {
    trendColor = "text-red-500 dark:text-red-400";
  } else {
    trendColor = "text-gray-400 dark:text-gray-500";
  }

  return (
    <div className="bg-gray-50 dark:bg-[#1e1e1e] rounded-xl p-3.5 border border-gray-200 dark:border-[#2d2d2d]">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-medium text-gray-900 dark:text-white leading-none">{value}</p>
      {sub && <p className={`text-[11px] mt-1 ${trendColor}`}>{sub}</p>}
    </div>
  );
}

export default function StatsRow({ data, loading }: StatsRowProps) {
  if (loading) {
    const skeletonIds = ["skeleton-0", "skeleton-1", "skeleton-2", "skeleton-3"];
    return (
      <div className="grid grid-cols-4 gap-2.5">
        {skeletonIds.map((id) => (
          <div key={id} className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl h-20 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      <StatCard
        label="Open Issues"
        value={data?.open_count ?? 0}
        sub="↑ 3 this week"
        trend="up"
      />
      <StatCard
        label="Closed Issues"
        value={data?.closed_count ?? 0}
        sub="↑ 8 this week"
        trend="up"
      />
      <StatCard
        label="Avg Resolution"
        value={`${data?.avg_resolution_days?.toFixed(1) ?? "—"}d`}
        sub="vs last month"
        trend="neutral"
      />
      <StatCard
        label="Close Rate"
        value={`${Math.round((data?.close_rate ?? 0) * 100)}%`}
        sub="↑ 2% vs last month"
        trend="up"
      />
    </div>
  );
}