"use client";

import { Circle, CircleCheck, CircleDot, Clock, Hash } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Issue } from "@/lib/types";
import { formatDistanceToNow } from "@/lib/dateUtils";

interface IssueItemProps {
  readonly issue: Issue;
  readonly onClick?: () => void;
}

interface StatusIconProps {
  readonly status: Issue["status"];
}

const StatusIcon = ({ status }: StatusIconProps) => {
  if (status === "closed")
    return <CircleCheck size={15} className="text-purple-500 mt-0.5 shrink-0" />;
  if (status === "in_progress")
    return <CircleDot size={15} className="text-amber-500 mt-0.5 shrink-0" />;
  return <Circle size={15} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />;
};

export default function IssueItem({ issue, onClick }: IssueItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-2.5 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0 w-full text-left hover:bg-gray-50 dark:hover:bg-[#2a2a2a] -mx-2 px-2 rounded-lg transition-colors group"
    >
      <StatusIcon status={issue.status} />

      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {issue.title}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
            <Hash size={10} />
            {issue.number}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
            <Clock size={10} />
            {formatDistanceToNow(issue.created_at)}
          </span>
          {issue.labels.map((l) => (
            <Badge key={l.id} label={l.name} color={`#${l.color}`} />
          ))}
          {issue.custom_labels.map((l) => (
            <Badge key={l.id} label={l.name} color={l.color} />
          ))}
        </div>
      </div>
    </button>
  );
}