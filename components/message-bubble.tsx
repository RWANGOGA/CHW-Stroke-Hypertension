"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MessageBubbleProps {
  message: string
  sender: "user" | "patient" | "bot"
  senderName?: string
  timestamp?: string
  channel?: "whatsapp" | "sms" | "ivr"
}

export function MessageBubble({ message, sender, senderName, timestamp, channel }: MessageBubbleProps) {
  const isOutbound = sender === "user" || sender === "bot"

  const channelColors = {
    whatsapp: "bg-emerald-500",
    sms: "bg-blue-500",
    ivr: "bg-purple-500",
  }

  return (
    <div className={cn("flex gap-3 max-w-[85%]", isOutbound && "ml-auto flex-row-reverse")}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={cn(
            "text-xs text-white",
            sender === "patient" && "bg-primary",
            sender === "user" && "bg-secondary-foreground",
            sender === "bot" && "bg-primary",
          )}
        >
          {sender === "bot" ? "AI" : senderName?.charAt(0) || "P"}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "rounded-2xl px-4 py-2.5",
          isOutbound
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card border border-border/50 rounded-tl-sm",
        )}
      >
        {channel && (
          <div className="flex items-center gap-1.5 mb-1">
            <span className={cn("h-2 w-2 rounded-full", channelColors[channel])} />
            <span
              className={cn(
                "text-[10px] uppercase font-medium",
                isOutbound ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              {channel}
            </span>
          </div>
        )}
        <p className="text-sm">{message}</p>
        {timestamp && (
          <p className={cn("text-[10px] mt-1", isOutbound ? "text-primary-foreground/60" : "text-muted-foreground")}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  )
}
