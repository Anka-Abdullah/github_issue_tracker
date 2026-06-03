"use client";

import { Bell, Settings, GitBranch, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface TopbarProps {
  readonly username?: string;
}

export default function Topbar({ username = "User" }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <header className="h-13 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#2d2d2d] flex items-center px-4 gap-3 sticky top-0 z-30">
      <div className="flex items-center gap-2 font-medium text-gray-800 dark:text-white">
        <GitBranch size={18} className="text-gray-500 dark:text-gray-400" />
        IssueTracker
      </div>

      <div className="flex-1" />

      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-500 dark:text-gray-400 transition-colors">
        <Bell size={16} />
      </button>
      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-500 dark:text-gray-400 transition-colors">
        <Settings size={16} />
      </button>

      <button
        onClick={toggleTheme}
        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-500 dark:text-gray-400 transition-colors"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <div className="w-7 h-7 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-xs font-medium text-white">
        {initials}
      </div>
    </header>
  );
}