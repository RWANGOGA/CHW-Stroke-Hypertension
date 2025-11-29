"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AlertCard } from "@/components/alert-card"
import { RiskCard } from "@/components/risk-card"
import { aiAlerts, patients } from "@/lib/simulated-data"
import { AlertTriangle, Clock, CheckCircle, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = ["pending", "acknowledged", "resolved", "all"] as const

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("pending")

  const pendingCount = aiAlerts.filter((a) => a.status === "pending").length
  const acknowledgedCount = aiAlerts.filter((a) => a.status === "acknowledged").length
  const resolvedCount = aiAlerts.filter((a) => a.status === "resolved").length

  const filteredAlerts = activeTab === "all" ? aiAlerts : aiAlerts.filter((a) => a.status === activeTab)

  const getPatientName = (patientId: string) => {
    return patients.find((p) => p.id === patientId)?.name || "Unknown"
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-[72px]">
        <Header title="Alerts" subtitle="AI-generated alerts and recommended actions" />
        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <RiskCard title="Total Alerts" value={aiAlerts.length} icon={Bell} subtitle="All time" />
            <RiskCard title="Pending" value={pendingCount} icon={Clock} variant="danger" subtitle="Needs action" />
            <RiskCard
              title="Acknowledged"
              value={acknowledgedCount}
              icon={AlertTriangle}
              variant="warning"
              subtitle="In progress"
            />
            <RiskCard
              title="Resolved"
              value={resolvedCount}
              icon={CheckCircle}
              variant="success"
              subtitle="Completed"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border pb-2">
            {tabs.map((tab) => {
              const count =
                tab === "all"
                  ? aiAlerts.length
                  : tab === "pending"
                    ? pendingCount
                    : tab === "acknowledged"
                      ? acknowledgedCount
                      : resolvedCount

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize",
                    activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent",
                  )}
                >
                  {tab} ({count})
                </button>
              )
            })}
          </div>

          {/* Alerts Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="relative">
                <div className="absolute -top-2 -left-2 px-2 py-0.5 bg-card border border-border/50 rounded text-xs font-medium text-muted-foreground">
                  {getPatientName(alert.patientId)}
                </div>
                <AlertCard alert={alert} />
              </div>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-emerald-500 mb-3" />
              <h3 className="font-semibold">No {activeTab} alerts</h3>
              <p className="text-sm text-muted-foreground">All caught up!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
