"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import type { Patient } from "@/lib/simulated-data"

interface PatientCardProps {
  patient: Patient
  compact?: boolean
}

export function PatientCard({ patient, compact = false }: PatientCardProps) {
  const riskColors = {
    low: "bg-emerald-500",
    moderate: "bg-amber-500",
    high: "bg-red-500",
  }

  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">{initials}</AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
              riskColors[patient.riskLevel],
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{patient.name}</p>
          <p className="text-xs text-muted-foreground">Risk: {patient.riskScore}</p>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/patients/${patient.id}`}>
      <div className="bg-card rounded-2xl border border-border/50 p-5 hover:shadow-lg transition-all hover:border-primary/20 cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-medium">{initials}</AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-card",
                riskColors[patient.riskLevel],
              )}
            />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <h3 className="font-semibold text-foreground">{patient.name}</h3>
        <p className="text-sm text-muted-foreground">
          {patient.age} yrs, {patient.gender}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
              patient.riskLevel === "high" && "bg-red-100 text-red-700",
              patient.riskLevel === "moderate" && "bg-amber-100 text-amber-700",
              patient.riskLevel === "low" && "bg-emerald-100 text-emerald-700",
            )}
          >
            {patient.riskLevel} risk
          </div>
          <div className="text-xs text-muted-foreground">Score: {patient.riskScore}</div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50 flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1 h-9" onClick={(e) => e.preventDefault()}>
            <MessageCircle className="h-4 w-4 mr-1.5" />
            Message
          </Button>
          <Button variant="secondary" size="sm" className="flex-1 h-9" onClick={(e) => e.preventDefault()}>
            <Phone className="h-4 w-4 mr-1.5" />
            Call
          </Button>
        </div>
      </div>
    </Link>
  )
}
