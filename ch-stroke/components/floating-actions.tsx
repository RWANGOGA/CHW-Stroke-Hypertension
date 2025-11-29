"use client"

import { useState } from "react"
import { Phone, MessageSquare, X, Send, PhoneOff, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { patients } from "@/lib/simulated-data"

export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<"none" | "call" | "message">("none")
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "connected" | "ended">("idle")

  const handleCall = (patientId: string) => {
    setSelectedPatient(patientId)
    setCallStatus("calling")
    // Simulate call connection
    setTimeout(() => setCallStatus("connected"), 2000)
  }

  const handleEndCall = () => {
    setCallStatus("ended")
    setTimeout(() => {
      setCallStatus("idle")
      setSelectedPatient(null)
      setActivePanel("none")
    }, 1000)
  }

  const handleSendMessage = () => {
    if (message.trim() && selectedPatient) {
      // Simulate message sent
      setMessage("")
      // Show success feedback
      setTimeout(() => {
        setSelectedPatient(null)
        setActivePanel("none")
      }, 500)
    }
  }

  const selectedPatientData = patients.find((p) => p.id === selectedPatient)

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Expanded options */}
        <div
          className={cn(
            "flex flex-col gap-2 transition-all duration-300",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
          )}
        >
          <Button
            size="lg"
            onClick={() => {
              setActivePanel("call")
              setIsOpen(false)
            }}
            className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/30"
          >
            <Phone className="h-6 w-6" />
          </Button>
          <Button
            size="lg"
            onClick={() => {
              setActivePanel("message")
              setIsOpen(false)
            }}
            className="h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>

        {/* Main FAB */}
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-16 w-16 rounded-full shadow-xl transition-all duration-300",
            isOpen ? "bg-muted-foreground hover:bg-muted-foreground/90 rotate-45" : "bg-primary hover:bg-primary/90",
          )}
        >
          {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
        </Button>
      </div>

      {/* Call Panel */}
      {activePanel === "call" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {!selectedPatient ? (
              <>
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Start a Call</h3>
                    <Button variant="ghost" size="icon" onClick={() => setActivePanel("none")}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Select a patient to call</p>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {patients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => handleCall(patient.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div
                        className={cn(
                          "h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold",
                          patient.riskLevel === "high"
                            ? "bg-red-500"
                            : patient.riskLevel === "moderate"
                              ? "bg-amber-500"
                              : "bg-emerald-500",
                        )}
                      >
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.phone}</p>
                      </div>
                      <Phone className="h-5 w-5 text-emerald-500" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div
                  className={cn(
                    "h-24 w-24 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4",
                    callStatus === "connected" ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground",
                  )}
                >
                  {selectedPatientData?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-semibold">{selectedPatientData?.name}</h3>
                <p className="text-muted-foreground mb-6">
                  {callStatus === "calling" && "Calling..."}
                  {callStatus === "connected" && "Connected"}
                  {callStatus === "ended" && "Call Ended"}
                </p>

                {callStatus === "calling" && (
                  <div className="flex justify-center gap-4">
                    <div className="animate-bounce delay-0 h-3 w-3 rounded-full bg-emerald-500" />
                    <div className="animate-bounce delay-150 h-3 w-3 rounded-full bg-emerald-500" />
                    <div className="animate-bounce delay-300 h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                )}

                {callStatus === "connected" && <p className="text-2xl font-mono text-emerald-500 mb-6">00:00</p>}

                <div className="flex justify-center gap-4 mt-6">
                  {callStatus !== "ended" && (
                    <>
                      <Button variant="outline" size="icon" className="h-14 w-14 rounded-full bg-transparent">
                        <Video className="h-6 w-6" />
                      </Button>
                      <Button onClick={handleEndCall} className="h-14 w-14 rounded-full bg-red-500 hover:bg-red-600">
                        <PhoneOff className="h-6 w-6" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Message Panel */}
      {activePanel === "message" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {!selectedPatient ? (
              <>
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Send Message</h3>
                    <Button variant="ghost" size="icon" onClick={() => setActivePanel("none")}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Select a patient to message</p>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {patients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div
                        className={cn(
                          "h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold",
                          patient.riskLevel === "high"
                            ? "bg-red-500"
                            : patient.riskLevel === "moderate"
                              ? "bg-amber-500"
                              : "bg-emerald-500",
                        )}
                      >
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.phone}</p>
                      </div>
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="p-4 border-b border-border flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedPatient(null)}>
                    <X className="h-5 w-5" />
                  </Button>
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
                      selectedPatientData?.riskLevel === "high"
                        ? "bg-red-500"
                        : selectedPatientData?.riskLevel === "moderate"
                          ? "bg-amber-500"
                          : "bg-emerald-500",
                    )}
                  >
                    {selectedPatientData?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{selectedPatientData?.name}</p>
                    <p className="text-xs text-muted-foreground">via WhatsApp</p>
                  </div>
                </div>

                {/* Quick Messages */}
                <div className="p-4 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-2">Quick Messages</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "How are you feeling today?",
                      "Did you take your medication?",
                      "Please check your BP",
                      "Schedule a visit",
                    ].map((quick) => (
                      <button
                        key={quick}
                        onClick={() => setMessage(quick)}
                        className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                      >
                        {quick}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4">
                  <div className="flex gap-2">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button onClick={handleSendMessage} disabled={!message.trim()} className="gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
