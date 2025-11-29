"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RiskBadge } from "./risk-badge"
import { patients, communicationLogs, aiAlerts, getDailyWearableAggregates } from "@/lib/simulated-data"
import { Brain, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIInsightsPanelProps {
  patientId: string
}

export function AIInsightsPanel({ patientId }: AIInsightsPanelProps) {
  const patient = patients.find((p) => p.id === patientId)
  const patientAlerts = aiAlerts.filter((a) => a.patientId === patientId)
  const dailyData = getDailyWearableAggregates(patientId)
  const patientComms = communicationLogs[patientId] || []

  if (!patient) return null

  // Calculate trends
  const recentDays = dailyData.slice(-7)
  const olderDays = dailyData.slice(-14, -7)

  const avgRecentHR = recentDays.reduce((sum, d) => sum + d.avgHeartRate, 0) / recentDays.length
  const avgOlderHR = olderDays.reduce((sum, d) => sum + d.avgHeartRate, 0) / olderDays.length
  const hrTrend = avgRecentHR > avgOlderHR ? "increasing" : "stable"

  const avgRecentSteps = recentDays.reduce((sum, d) => sum + d.totalSteps, 0) / recentDays.length
  const avgOlderSteps = olderDays.reduce((sum, d) => sum + d.totalSteps, 0) / olderDays.length
  const stepsTrend =
    avgRecentSteps > avgOlderSteps ? "increasing" : avgRecentSteps < avgOlderSteps * 0.9 ? "decreasing" : "stable"

  // Count symptoms from recent communications
  const recentInbound = patientComms.filter((c) => c.direction === "inbound").slice(-10)
  const symptomCounts: Record<string, number> = {}
  recentInbound.forEach((c) => {
    c.extractedSymptoms.forEach((s) => {
      symptomCounts[s] = (symptomCounts[s] || 0) + 1
    })
  })

  const topSymptoms = Object.entries(symptomCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  const insights = [
    {
      icon: Activity,
      title: "Heart Rate Trend",
      description:
        hrTrend === "increasing"
          ? `Average HR has increased by ${Math.round(avgRecentHR - avgOlderHR)} bpm over the past week`
          : "Heart rate remains stable within normal parameters",
      type: hrTrend === "increasing" ? "warning" : "success",
    },
    {
      icon: hrTrend === "increasing" || stepsTrend === "decreasing" ? TrendingDown : TrendingUp,
      title: "Activity Level",
      description:
        stepsTrend === "decreasing"
          ? "Daily step count has decreased. Consider encouraging more physical activity."
          : stepsTrend === "increasing"
            ? "Good progress! Step count is trending upward."
            : "Activity levels are consistent.",
      type: stepsTrend === "decreasing" ? "warning" : "success",
    },
    {
      icon: Brain,
      title: "Communication Analysis",
      description:
        topSymptoms.length > 0
          ? `Most reported symptoms: ${topSymptoms.map(([s]) => s).join(", ")}`
          : "No recurring symptoms detected in recent communications.",
      type: topSymptoms.some(([s]) => ["chest tightness", "dizziness", "palpitations"].includes(s))
        ? "warning"
        : "info",
    },
  ]

  const pendingAlerts = patientAlerts.filter((a) => a.status === "pending")

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Brain className="h-5 w-5 text-primary" />
            AI-Generated Insights
          </CardTitle>
          <RiskBadge level={patient.riskLevel} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Risk Score */}
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Overall Risk Score</span>
            <span
              className={cn(
                "text-2xl font-bold",
                patient.riskScore >= 70
                  ? "text-red-600"
                  : patient.riskScore >= 40
                    ? "text-amber-600"
                    : "text-emerald-600",
              )}
            >
              {patient.riskScore}/100
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted-foreground/20">
            <div
              className={cn(
                "h-full transition-all",
                patient.riskScore >= 70 ? "bg-red-500" : patient.riskScore >= 40 ? "bg-amber-500" : "bg-emerald-500",
              )}
              style={{ width: `${patient.riskScore}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Calculated from: Vital signs (45%) + Self-reported symptoms (35%) + Trends (20%)
          </p>
        </div>

        {/* Pending Alerts */}
        {pendingAlerts.length > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-amber-800 dark:text-amber-400">
                {pendingAlerts.length} Pending Alert{pendingAlerts.length > 1 ? "s" : ""}
              </span>
            </div>
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">{pendingAlerts[0].title}</p>
          </div>
        )}

        {/* Insights List */}
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  insight.type === "warning"
                    ? "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                    : insight.type === "success"
                      ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                      : "bg-muted text-muted-foreground",
                )}
              >
                <insight.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{insight.title}</p>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Actions */}
        <div className="space-y-2 border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground">Recommended Actions</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {patient.riskLevel === "high" && (
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Contact patient within 24 hours
              </li>
            )}
            {hrTrend === "increasing" && (
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Request BP measurement
              </li>
            )}
            {stepsTrend === "decreasing" && (
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Discuss barriers to physical activity
              </li>
            )}
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Review medication adherence
            </li>
          </ul>
        </div>

        <Button className="w-full">Log Follow-up Action</Button>
      </CardContent>
    </Card>
  )
}
