"use client"

import { cn } from "@/lib/utils"
import type { ElementType } from "react"

interface RiskCardProps {
  title: string
  value: number | string
  subtitle?: string
  icon: ElementType
  trend?: { value: string; up: boolean }
  variant?: "default" | "danger" | "warning" | "success"
}

export function RiskCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: RiskCardProps) {
  const variantStyles = {
    default: "bg-card border-border/50",
    danger: "bg-gradient-to-br from-red-50 to-red-100/50 border-red-200/50",
    warning: "bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/50",
    success: "bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200/50",
  }

  const iconStyles = {
    default: "bg-primary/10 text-primary",
    danger: "bg-red-500/10 text-red-600",
    warning: "bg-amber-500/10 text-amber-600",
    success: "bg-emerald-500/10 text-emerald-600",
  }

  return (
    <div className={cn("rounded-2xl border p-5 transition-shadow hover:shadow-md", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend.up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700",
            )}
          >
            {trend.up ? "+" : ""}
            {trend.value}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm font-medium text-foreground/80 mt-1">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}
