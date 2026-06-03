"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart2,
  Tag,
  FileDown,
  Plus,
} from "lucide-react";
import type { Repository } from "@/lib/types";
import { cn } from "@/lib/utils";

const REPO_COLORS = [
  "#1D9E75",
  "#378ADD",
  "#EF9F27",
  "#D85A30",
  "#7F77DD",
  "#D4537E",
];

interface SidebarProps {
  readonly repos: Repository[];
  readonly activeRepo?: string;
  readonly onRepoSelect: (repo: Repository) => void;
  readonly openCounts?: Record<string, number>;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/labels", label: "Labels", icon: Tag },
  { href: "/export", label: "Export PDF", icon: FileDown },
];

export default function Sidebar({
  repos,
  activeRepo,
  onRepoSelect,
  openCounts = {},
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-55 bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-[#2d2d2d] flex flex-col py-3 overflow-y-auto">
      <p className="px-4 text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
        Menu
      </p>

      <nav className="flex flex-col gap-0.5 px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-white font-medium"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1f1f1f] hover:text-gray-800 dark:hover:text-gray-200"
              )}
            >
              <Icon size={15} />
              {label}
              {label === "Dashboard" && openCounts["total"] ? (
                <span className="ml-auto text-[11px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded-full">
                  {openCounts["total"]}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <p className="px-4 text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-5 mb-1">
        Repositories
      </p>

      <div className="flex flex-col gap-0.5 px-2">
        {repos.map((repo, i) => {
          const color = REPO_COLORS[i % REPO_COLORS.length];
          const active = activeRepo === repo.full_name;
          return (
            <button
              key={repo.id}
              onClick={() => onRepoSelect(repo)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors text-left w-full",
                active
                  ? "bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-white font-medium"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1f1f1f] hover:text-gray-800 dark:hover:text-gray-200"
              )}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: color }}
              />
              <span className="truncate text-xs">{repo.name}</span>
            </button>
          );
        })}

        <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <Plus size={13} />
          Add repo
        </button>
      </div>
    </aside>
  );
}