import { cn } from "@/lib/utils"

interface RiskBadgeProps {
  level: "low" | "moderate" | "high"
  size?: "sm" | "md" | "lg"
  showDot?: boolean
}

const levelStyles = {
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  moderate: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
}

const dotStyles = {
  low: "bg-emerald-500",
  moderate: "bg-amber-500",
  high: "bg-red-500",
}

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-sm",
}

export function RiskBadge({ level, size = "md", showDot = true }: RiskBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium capitalize",
        levelStyles[level],
        sizeStyles[size],
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 rounded-full", dotStyles[level])} />}
      {level} Risk
    </span>
  )
}
