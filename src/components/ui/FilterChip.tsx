import { cn } from "@/lib/utils";

interface FilterChipProps {
  readonly label: string;
  readonly active?: boolean;
  readonly onClick: () => void;
}

export default function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-xs px-3 py-1 rounded-full border transition-colors",
        active
          ? "bg-blue-50 dark:bg-blue-950/70 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-medium"
          : "bg-white dark:bg-transparent border-gray-200 dark:border-[#2d2d2d] text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
      )}
    >
      {label}
    </button>
  );
}