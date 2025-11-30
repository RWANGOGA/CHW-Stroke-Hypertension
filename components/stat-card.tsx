import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  change?: {
    value: string
    trend: "up" | "down"
  }
  icon?: LucideIcon
  variant?: "default" | "primary" | "warning" | "danger" | "success"
}

const variantStyles = {
  default: "border-border",
  primary: "border-l-4 border-l-primary",
  warning: "border-l-4 border-l-amber-500",
  danger: "border-l-4 border-l-destructive",
  success: "border-l-4 border-l-emerald-500",
}

export function StatCard({ title, value, subtitle, change, icon: Icon, variant = "default" }: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            {change && (
              <p className={cn("text-sm font-medium", change.trend === "up" ? "text-emerald-600" : "text-destructive")}>
                {change.trend === "up" ? "+" : ""}
                {change.value}
                <span className="ml-1 text-muted-foreground">vs last week</span>
              </p>
            )}
          </div>
          {Icon && (
            <div className="rounded-lg bg-muted p-3">
              <Icon className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
