import { cn } from "@/lib/utils";

const PRESETS: Record<string, string> = {
  bug: "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  feature: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  docs: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  chore: "bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  question: "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  internal: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
};

interface BadgeProps {
  readonly label: string;
  readonly color?: string;
  readonly className?: string;
}

export default function Badge({ label, color, className }: BadgeProps) {
  const preset = Object.keys(PRESETS).find((k) =>
    label.toLowerCase().includes(k)
  );
  const base = preset ? PRESETS[preset] : "bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700";

  return (
    <span
      className={cn(
        "inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full border",
        base,
        className
      )}
      style={color ? { background: `${color}22`, color, borderColor: `${color}66` } : undefined}
    >
      {label}
    </span>
  );
}