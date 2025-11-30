"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AIAlert } from "@/lib/simulated-data"

interface AlertCardProps {
  alert: AIAlert
  onAcknowledge?: () => void
}

export function AlertCard({ alert, onAcknowledge }: AlertCardProps) {
  const riskStyles = {
    low: "border-l-emerald-500 bg-emerald-50/50",
    moderate: "border-l-amber-500 bg-amber-50/50",
    high: "border-l-red-500 bg-red-50/50",
  }

  const statusIcon = {
    pending: <Clock className="h-4 w-4 text-amber-500" />,
    acknowledged: <AlertTriangle className="h-4 w-4 text-primary" />,
    resolved: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  }

  return (
    <div className={cn("rounded-xl border-l-4 p-4", riskStyles[alert.riskLevel])}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {statusIcon[alert.status]}
            <h4 className="font-semibold text-sm">{alert.title}</h4>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
          <p className="text-xs text-primary font-medium mt-2">{alert.recommendedAction}</p>
        </div>
        {alert.status === "pending" && (
          <Button size="sm" variant="outline" className="shrink-0 bg-transparent" onClick={onAcknowledge}>
            Acknowledge
          </Button>
        )}
      </div>
    </div>
  )
}
