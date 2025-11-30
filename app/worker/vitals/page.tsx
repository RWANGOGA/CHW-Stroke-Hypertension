"use client"

import { useState } from "react"
import { patients, getDailyWearableAggregates } from "@/lib/simulated-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Heart, Footprints, Moon, TrendingUp, TrendingDown } from "lucide-react"
import dynamic from "next/dynamic"

const VitalsChart = dynamic(
  () => import("@/components/vitals-chart").then((mod) => ({ default: mod.VitalsChart })),
  {
    ssr: false,
    loading: () => <div className="h-[180px] bg-muted/30 rounded-lg animate-pulse" />,
  },
)

export default function VitalsPage() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])

  const dailyData = getDailyWearableAggregates(selectedPatient.id)

  const heartRateData = dailyData.map((d) => ({ date: d.date.slice(5), value: Math.round(d.avgHeartRate) }))
  const stepsData = dailyData.map((d) => ({ date: d.date.slice(5), value: Math.round(d.totalSteps) }))
  const sleepData = dailyData.map((d) => ({ date: d.date.slice(5), value: Math.round(d.avgSleep * 10) / 10 }))

  // Calculate trends
  const avgHR = Math.round(heartRateData.reduce((s, d) => s + d.value, 0) / heartRateData.length)
  const avgSteps = Math.round(stepsData.reduce((s, d) => s + d.value, 0) / stepsData.length)
  const avgSleep = Math.round((sleepData.reduce((s, d) => s + d.value, 0) / sleepData.length) * 10) / 10

  return (
    <div className="min-h-screen bg-background">
      <div className="pl-[72px]">
        <main className="p-6">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Patient Selector */}
            <Card className="border-border/50 h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Select Patient</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {patients.map((patient) => {
                  const initials = patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                  const isSelected = selectedPatient.id === patient.id

                  return (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors",
                        isSelected ? "bg-primary/10" : "hover:bg-accent/50",
                      )}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback
                          className={cn(
                            "text-sm",
                            isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                          )}
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">Score: {patient.riskScore}</p>
                      </div>
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          patient.riskLevel === "high" && "bg-red-500",
                          patient.riskLevel === "moderate" && "bg-amber-500",
                          patient.riskLevel === "low" && "bg-emerald-500",
                        )}
                      />
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Vitals Display */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid gap-4 grid-cols-3">
                <Card className="border-border/50">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-red-100 flex items-center justify-center">
                          <Heart className="h-5 w-5 text-red-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Avg HR</span>
                      </div>
                      <TrendingUp className="h-4 w-4 text-amber-500" />
                    </div>
                    <p className="text-2xl font-bold mt-2">
                      {avgHR} <span className="text-sm font-normal text-muted-foreground">bpm</span>
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Footprints className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Avg Steps</span>
                      </div>
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    </div>
                    <p className="text-2xl font-bold mt-2">{avgSteps.toLocaleString()}</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Moon className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Avg Sleep</span>
                      </div>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <p className="text-2xl font-bold mt-2">
                      {avgSleep} <span className="text-sm font-normal text-muted-foreground">hrs</span>
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <VitalsChart title="Heart Rate" data={heartRateData} color="#ef4444" unit=" bpm" />
                <VitalsChart title="Daily Steps" data={stepsData} color="#3b82f6" />
                <VitalsChart title="Sleep Duration" data={sleepData} color="#8b5cf6" unit=" hrs" />
              </div>

              {/* Data Table */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Daily Readings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Date</th>
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Heart Rate</th>
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Steps</th>
                          <th className="text-left py-2 px-3 font-medium text-muted-foreground">Sleep</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dailyData
                          .slice(-7)
                          .reverse()
                          .map((day) => (
                            <tr key={day.date} className="border-b border-border/30 hover:bg-accent/30">
                              <td className="py-2.5 px-3">{day.date}</td>
                              <td className="py-2.5 px-3">{Math.round(day.avgHeartRate)} bpm</td>
                              <td className="py-2.5 px-3">{day.totalSteps.toLocaleString()}</td>
                              <td className="py-2.5 px-3">{Math.round(day.avgSleep * 10) / 10} hrs</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
