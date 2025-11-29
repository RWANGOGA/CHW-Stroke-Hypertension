"use client"
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface CallCardProps {
  patientName: string
  patientId: string
  callType: "incoming" | "outgoing" | "missed"
  duration?: string
  timestamp: string
  transcript?: string
}

export function CallCard({ patientName, patientId, callType, duration, timestamp, transcript }: CallCardProps) {
  const callIcons = {
    incoming: <PhoneIncoming className="h-4 w-4 text-emerald-500" />,
    outgoing: <PhoneOutgoing className="h-4 w-4 text-blue-500" />,
    missed: <PhoneMissed className="h-4 w-4 text-red-500" />,
  }

  const initials = patientName
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="bg-card rounded-xl border border-border/50 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <Avatar className="h-11 w-11">
          <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">{patientName}</h4>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {callIcons[callType]}
            <span className="text-xs text-muted-foreground capitalize">{callType}</span>
            {duration && (
              <>
                <span className="text-muted-foreground">·</span>
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{duration}</span>
              </>
            )}
          </div>
          {transcript && <p className="text-xs text-muted-foreground mt-2 line-clamp-2 italic">"{transcript}"</p>}
        </div>
      </div>
      <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
        <Button variant="outline" size="sm" className="flex-1 h-8 bg-transparent">
          <Phone className="h-3.5 w-3.5 mr-1.5" />
          Call Back
        </Button>
        <Button variant="secondary" size="sm" className="flex-1 h-8">
          View Details
        </Button>
      </div>
    </div>
  )
}
