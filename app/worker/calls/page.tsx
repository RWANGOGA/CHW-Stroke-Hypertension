"use client"

import { useState } from "react"
import { CallCard } from "@/components/call-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { patients, communicationLogs } from "@/lib/simulated-data"
import { Phone, PhoneCall, Search, Video, Mic, MicOff, PhoneOff } from "lucide-react"
import { cn } from "@/lib/utils"

// Generate call history from IVR logs
const generateCallHistory = () => {
  const calls: any[] = []

  patients.forEach((patient) => {
    const ivrLogs = communicationLogs[patient.id]?.filter((log) => log.channel === "ivr") || []
    ivrLogs.forEach((log, idx) => {
      calls.push({
        id: log.id,
        patientName: patient.name,
        patientId: patient.id,
        callType: idx % 3 === 0 ? "missed" : idx % 2 === 0 ? "outgoing" : "incoming",
        duration:
          idx % 3 === 0
            ? undefined
            : `${Math.floor(Math.random() * 10) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
        timestamp: new Date(log.timestamp).toLocaleDateString([], {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        transcript: log.message,
      })
    })
  })

  return calls.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export default function CallsPage() {
  const [isInCall, setIsInCall] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const callHistory = generateCallHistory()

  const filteredPatients = patients.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const startCall = (patient: (typeof patients)[0]) => {
    setSelectedPatient(patient)
    setIsInCall(true)
  }

  const endCall = () => {
    setIsInCall(false)
    setSelectedPatient(null)
    setIsMuted(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pl-[72px]">

        <main className="p-6">
          {isInCall && selectedPatient ? (
            // Active Call View
            <Card className="border-border/50 max-w-2xl mx-auto">
              <CardContent className="pt-8 pb-6">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {selectedPatient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{selectedPatient.name}</h2>
                  <p className="text-muted-foreground">Calling...</p>

                  <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-full bg-transparent"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    <Button variant="destructive" size="icon" className="h-16 w-16 rounded-full" onClick={endCall}>
                      <PhoneOff className="h-6 w-6" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-full bg-transparent">
                      <Video className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="mt-8 p-4 bg-muted/50 rounded-xl">
                    <h4 className="text-sm font-medium mb-2">Patient Info</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Risk Level:</div>
                      <div
                        className={cn(
                          "font-medium capitalize",
                          selectedPatient.riskLevel === "high" && "text-red-600",
                          selectedPatient.riskLevel === "moderate" && "text-amber-600",
                          selectedPatient.riskLevel === "low" && "text-emerald-600",
                        )}
                      >
                        {selectedPatient.riskLevel}
                      </div>
                      <div className="text-muted-foreground">Adherence:</div>
                      <div className="font-medium">{selectedPatient.adherenceScore}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Call Directory View
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              {/* Contacts */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Quick Dial</CardTitle>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search patients..."
                      className="pl-9 h-9 bg-background"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  {filteredPatients.map((patient) => {
                    const initials = patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                    return (
                      <div
                        key={patient.id}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{patient.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{patient.riskLevel} risk</p>
                        </div>
                        <Button
                          size="icon"
                          className="h-9 w-9 rounded-full bg-emerald-500 hover:bg-emerald-600"
                          onClick={() => startCall(patient)}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Call History */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <PhoneCall className="h-4 w-4" />
                    Call History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {callHistory.slice(0, 8).map((call) => (
                      <CallCard
                        key={call.id}
                        patientName={call.patientName}
                        patientId={call.patientId}
                        callType={call.callType}
                        duration={call.duration}
                        timestamp={call.timestamp}
                        transcript={call.transcript}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
