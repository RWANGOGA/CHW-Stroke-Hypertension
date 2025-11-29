"use client"

import { use } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { patients, getDailyWearableAggregates, communicationLogs, aiAlerts } from "@/lib/simulated-data"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Pill, AlertTriangle, Calendar, Activity, Heart, Moon, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import dynamic from "next/dynamic"

const VitalsChart = dynamic(
  () => import("@/components/dashboard/vitals-chart").then((mod) => ({ default: mod.VitalsChart })),
  {
    ssr: false,
    loading: () => <div className="h-[180px] bg-muted/30 rounded-lg animate-pulse" />,
  },
)

interface PatientDetailPageProps {
  params: Promise<{ id: string }>
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { id } = use(params)
  const patient = patients.find((p) => p.id === id)

  if (!patient) {
    notFound()
  }

  const dailyData = getDailyWearableAggregates(patient.id)
  const patientLogs = communicationLogs[patient.id] || []
  const patientAlerts = aiAlerts.filter((a) => a.patientId === patient.id)

  const heartRateData = dailyData.map((d) => ({ date: d.date.slice(5), value: Math.round(d.avgHeartRate) }))
  const stepsData = dailyData.map((d) => ({ date: d.date.slice(5), value: Math.round(d.totalSteps) }))
  const sleepData = dailyData.map((d) => ({ date: d.date.slice(5), value: Math.round(d.avgSleep * 10) / 10 }))

  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-[72px]">
        <Header title="Patient Details" subtitle={`ID: ${patient.id}`} />
        <main className="p-6 space-y-6">
          {/* Back Button */}
          <Link
            href="/patients"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Patients
          </Link>

          {/* Patient Header */}
          <Card className="border-border/50 overflow-hidden">
            <div
              className={cn(
                "h-2",
                patient.riskLevel === "high" && "bg-red-500",
                patient.riskLevel === "moderate" && "bg-amber-500",
                patient.riskLevel === "low" && "bg-emerald-500",
              )}
            />
            <CardContent className="pt-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold">{patient.name}</h2>
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-semibold capitalize",
                          patient.riskLevel === "high" && "bg-red-100 text-red-700",
                          patient.riskLevel === "moderate" && "bg-amber-100 text-amber-700",
                          patient.riskLevel === "low" && "bg-emerald-100 text-emerald-700",
                        )}
                      >
                        {patient.riskLevel} risk
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {patient.age} years old · {patient.gender} · Score: {patient.riskScore}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {patient.knownHypertension && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md">
                          <AlertTriangle className="h-3 w-3" />
                          Hypertension
                        </span>
                      )}
                      {patient.pastStrokeHistory && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md">
                          <AlertTriangle className="h-3 w-3" />
                          Stroke History
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="h-10 bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="h-10 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button className="h-10">Schedule Visit</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Row */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Card className="border-border/50">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{patient.adherenceScore}%</p>
                    <p className="text-xs text-muted-foreground">Adherence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{heartRateData[heartRateData.length - 1]?.value || 0}</p>
                    <p className="text-xs text-muted-foreground">Avg HR (bpm)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Moon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{sleepData[sleepData.length - 1]?.value || 0}</p>
                    <p className="text-xs text-muted-foreground">Sleep (hrs)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{patientAlerts.length}</p>
                    <p className="text-xs text-muted-foreground">Total Alerts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Medications */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Pill className="h-4 w-4 text-primary" />
                    Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.medications.length > 0 ? (
                    <ul className="space-y-2">
                      {patient.medications.map((med, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm p-2 bg-accent/30 rounded-lg">
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          {med}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No medications recorded</p>
                  )}
                </CardContent>
              </Card>

              {/* Lifestyle Risks */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Lifestyle Risk Factors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-accent/30">
                    <span className="text-sm">Salt Intake</span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-xs font-medium capitalize",
                        patient.lifestyleRisks.saltIntake === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {patient.lifestyleRisks.saltIntake}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-accent/30">
                    <span className="text-sm">Alcohol</span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-xs font-medium capitalize",
                        patient.lifestyleRisks.alcohol === "frequent"
                          ? "bg-red-100 text-red-700"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {patient.lifestyleRisks.alcohol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-accent/30">
                    <span className="text-sm">Stress Level</span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-xs font-medium capitalize",
                        patient.lifestyleRisks.stress === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {patient.lifestyleRisks.stress}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* AI Alerts for this patient */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">AI Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {patientAlerts.slice(0, 3).map((alert) => (
                    <div
                      key={alert.id}
                      className={cn(
                        "p-3 rounded-lg border-l-4",
                        alert.riskLevel === "high" && "border-l-red-500 bg-red-50/50",
                        alert.riskLevel === "moderate" && "border-l-amber-500 bg-amber-50/50",
                        alert.riskLevel === "low" && "border-l-emerald-500 bg-emerald-50/50",
                      )}
                    >
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.recommendedAction}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vitals Charts */}
              <div className="grid gap-4 md:grid-cols-3">
                <VitalsChart title="Heart Rate" data={heartRateData} color="#ef4444" unit=" bpm" />
                <VitalsChart title="Daily Steps" data={stepsData} color="#3b82f6" />
                <VitalsChart title="Sleep" data={sleepData} color="#8b5cf6" unit=" hrs" />
              </div>

              {/* Communication Timeline */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Recent Communications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {patientLogs
                      .slice(-10)
                      .reverse()
                      .map((log) => (
                        <div key={log.id} className="flex gap-3 p-3 rounded-lg hover:bg-accent/30 transition-colors">
                          <div
                            className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-medium text-white",
                              log.channel === "whatsapp" && "bg-emerald-500",
                              log.channel === "sms" && "bg-blue-500",
                              log.channel === "ivr" && "bg-purple-500",
                            )}
                          >
                            {log.channel.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium capitalize">{log.channel}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(log.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                              </span>
                              {log.severity === "high" && (
                                <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] rounded">High</span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{log.message}</p>
                            {log.extractedSymptoms.length > 0 && (
                              <div className="flex gap-1 mt-1.5 flex-wrap">
                                {log.extractedSymptoms.map((symptom, i) => (
                                  <span
                                    key={i}
                                    className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded"
                                  >
                                    {symptom}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
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
