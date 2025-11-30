"use client"

import { RiskCard } from "@/components/risk-card"
import { PatientCard } from "@/components/patient-card"
import { AlertCard } from "@/components/alert-card"
import { patients, aiAlerts, getDailyWearableAggregates } from "@/lib/simulated-data"
import { Users, AlertTriangle, Activity, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const highRiskPatients = patients.filter((p) => p.riskLevel === "high")
  const pendingAlerts = aiAlerts.filter((a) => a.status === "pending")

  // Get sample vitals data for overview
  const samplePatient = patients[0]
  const dailyData = getDailyWearableAggregates(samplePatient.id)
  const latestDay = dailyData[dailyData.length - 1]

  return (
    <div className="min-h-screen bg-background">
      <div className="pl-[72px]">

        <main className="p-6 space-y-6">
          {/* Risk Overview Cards */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <RiskCard title="Total Patients" value={patients.length} subtitle="Under monitoring" icon={Users} />
            <RiskCard
              title="High Risk"
              value={highRiskPatients.length}
              subtitle="Immediate attention"
              icon={AlertTriangle}
              variant="danger"
            />
            <RiskCard
              title="Pending Alerts"
              value={pendingAlerts.length}
              subtitle="Awaiting action"
              icon={Activity}
              variant="warning"
            />
            <RiskCard
              title="Avg Adherence"
              value="86%"
              subtitle="Medication compliance"
              icon={TrendingUp}
              variant="success"
              trend={{ value: "4%", up: true }}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* High Risk Patients */}
            <div className="lg:col-span-2">
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">High Risk Patients</CardTitle>
                  <Link href="/patients">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {highRiskPatients.slice(0, 4).map((patient) => (
                      <PatientCard key={patient.id} patient={patient} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <div>
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
                  <Link href="/alerts">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pendingAlerts.slice(0, 3).map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Vitals Summary Cards */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Avg Heart Rate</h3>
                  <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Normal</span>
                </div>
                <p className="text-4xl font-bold text-red-500">{latestDay ? Math.round(latestDay.avgHeartRate) : 82}</p>
                <p className="text-sm text-muted-foreground mt-1">bpm average across all patients</p>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: "68%" }} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Avg Daily Steps</h3>
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Low</span>
                </div>
                <p className="text-4xl font-bold text-blue-500">
                  {latestDay ? Math.round(latestDay.totalSteps / 4).toLocaleString() : "2,450"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">steps average per reading</p>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: "45%" }} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Avg Sleep</h3>
                  <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Good</span>
                </div>
                <p className="text-4xl font-bold text-purple-500">
                  {latestDay ? Math.round(latestDay.avgSleep * 10) / 10 : 6.5}
                </p>
                <p className="text-sm text-muted-foreground mt-1">hours average sleep</p>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: "72%" }} />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
