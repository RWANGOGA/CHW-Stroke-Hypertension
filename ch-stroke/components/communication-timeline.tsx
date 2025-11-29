"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { communicationLogs } from "@/lib/simulated-data"
import { MessageSquare, Phone, MessageCircle, ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommunicationTimelineProps {
  patientId: string
  limit?: number
}

const channelIcons = {
  whatsapp: MessageCircle,
  sms: MessageSquare,
  ivr: Phone,
}

const channelColors = {
  whatsapp: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  sms: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  ivr: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
}

export function CommunicationTimeline({ patientId, limit }: CommunicationTimelineProps) {
  const logs = (communicationLogs[patientId] || [])
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Communication Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logs.map((log, index) => {
            const Icon = channelIcons[log.channel]
            const DirectionIcon = log.direction === "inbound" ? ArrowDownLeft : ArrowUpRight

            return (
              <div
                key={log.id}
                className={cn("relative flex gap-4 pb-4", index !== logs.length - 1 && "border-l-2 border-muted ml-4")}
              >
                <div
                  className={cn(
                    "absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full",
                    channelColors[log.channel],
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="ml-8 flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {log.channel}
                    </Badge>
                    <DirectionIcon
                      className={cn("h-3 w-3", log.direction === "inbound" ? "text-emerald-500" : "text-blue-500")}
                    />
                    <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-foreground">{log.message}</p>
                  {log.direction === "inbound" && (
                    <div className="flex flex-wrap gap-2">
                      {log.extractedSymptoms.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {log.extractedSymptoms.map((symptom) => (
                            <Badge key={symptom} variant="secondary" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {log.severity !== "low" && (
                        <Badge
                          className={cn(
                            "text-xs",
                            log.severity === "high"
                              ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
                          )}
                        >
                          {log.severity} severity
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
