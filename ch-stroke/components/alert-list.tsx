"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RiskBadge } from "./risk-badge"
import { aiAlerts, patients } from "@/lib/simulated-data"
import { Check, Clock, AlertTriangle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AlertListProps {
  limit?: number
  showHeader?: boolean
  filterStatus?: "pending" | "acknowledged" | "resolved" | "all"
}

export function AlertList({ limit, showHeader = true, filterStatus = "all" }: AlertListProps) {
  const [alerts, setAlerts] = useState(aiAlerts)

  const filteredAlerts = alerts
    .filter((alert) => filterStatus === "all" || alert.status === filterStatus)
    .slice(0, limit)

  const getPatientName = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    return patient?.name || patientId
  }

  const handleAcknowledge = (alertId: string) => {
    setAlerts(alerts.map((a) => (a.id === alertId ? { ...a, status: "acknowledged" as const } : a)))
  }

  const handleResolve = (alertId: string) => {
    setAlerts(alerts.map((a) => (a.id === alertId ? { ...a, status: "resolved" as const } : a)))
  }

  const statusIcons = {
    pending: <Clock className="h-4 w-4 text-amber-500" />,
    acknowledged: <AlertTriangle className="h-4 w-4 text-primary" />,
    resolved: <Check className="h-4 w-4 text-emerald-500" />,
  }

  return (
    <Card>
      {showHeader && (
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">AI Alerts</CardTitle>
          <Link href="/alerts">
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
      )}
      <CardContent className={cn(!showHeader && "pt-6")}>
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                alert.status === "pending" && alert.riskLevel === "high"
                  ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
                  : "border-border bg-card",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {statusIcons[alert.status]}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{alert.title}</span>
                      <RiskBadge level={alert.riskLevel} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <Link href={`/patients/${alert.patientId}`} className="font-medium text-primary hover:underline">
                        {getPatientName(alert.patientId)}
                      </Link>{" "}
                      • {new Date(alert.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {alert.type === "wearable" && "Wearable Data"}
                        {alert.type === "communication" && "Communication"}
                        {alert.type === "combined" && "Combined Analysis"}
                      </Badge>
                    </div>
                  </div>
                </div>
                {alert.status === "pending" && (
                  <div className="flex shrink-0 gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleAcknowledge(alert.id)}>
                      Acknowledge
                    </Button>
                    <Button size="sm" onClick={() => handleResolve(alert.id)}>
                      Mark Resolved
                    </Button>
                  </div>
                )}
              </div>
              {alert.status === "pending" && (
                <div className="mt-3 rounded-md bg-muted p-3">
                  <p className="text-sm font-medium text-foreground">Recommended Action:</p>
                  <p className="text-sm text-muted-foreground">{alert.recommendedAction}</p>
                </div>
              )}
            </div>
          ))}
          {filteredAlerts.length === 0 && (
            <p className="py-8 text-center text-muted-foreground">No alerts found for the selected filter.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
