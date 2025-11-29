"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ChatInterface } from "@/components/chat-interface"
import { patients, communicationLogs } from "@/lib/simulated-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function MessagesPage() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Get messages for selected patient
  const patientLogs = communicationLogs[selectedPatient.id] || []
  const messages = patientLogs
    .filter((log) => log.channel === "whatsapp" || log.channel === "sms")
    .map((log) => ({
      id: log.id,
      message: log.message,
      sender: log.direction === "inbound" ? ("patient" as const) : ("user" as const),
      senderName: log.direction === "inbound" ? selectedPatient.name : "CHW",
      timestamp: new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      channel: log.channel,
    }))

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-[72px]">
        <Header title="Messages" subtitle="Patient communication center" />

        <main className="p-6">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr] h-[calc(100vh-140px)]">
            {/* Contacts List */}
            <Card className="border-border/50 flex flex-col overflow-hidden">
              <CardHeader className="pb-3 shrink-0">
                <CardTitle className="text-base font-semibold">Conversations</CardTitle>
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
              <CardContent className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                  {filteredPatients.map((patient) => {
                    const lastMessage = communicationLogs[patient.id]?.slice(-1)[0]
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
                          {lastMessage && (
                            <p className="text-xs text-muted-foreground truncate">{lastMessage.message}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] text-muted-foreground">
                            {lastMessage &&
                              new Date(lastMessage.timestamp).toLocaleDateString([], {
                                month: "short",
                                day: "numeric",
                              })}
                          </span>
                          {patient.riskLevel === "high" && <span className="h-2 w-2 rounded-full bg-red-500" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <ChatInterface patientName={selectedPatient.name} initialMessages={messages} />
          </div>
        </main>
      </div>
    </div>
  )
}
