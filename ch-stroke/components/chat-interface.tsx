"use client"

import { useState } from "react"
import { Send, Paperclip, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageBubble } from "./message-bubble"

interface Message {
  id: string
  message: string
  sender: "user" | "patient" | "bot"
  senderName?: string
  timestamp: string
  channel?: "whatsapp" | "sms" | "ivr"
}

interface ChatInterfaceProps {
  patientName?: string
  initialMessages?: Message[]
  onSendMessage?: (message: string) => void
}

export function ChatInterface({ patientName = "Patient", initialMessages = [], onSendMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      message: input,
      sender: "user",
      senderName: "CHW",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    onSendMessage?.(input)
    setInput("")
  }

  return (
    <div className="flex flex-col h-full bg-background rounded-2xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50 bg-card">
        <h3 className="font-semibold">{patientName}</h3>
        <p className="text-xs text-muted-foreground">Online now</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.message}
            sender={msg.sender}
            senderName={msg.senderName}
            timestamp={msg.timestamp}
            channel={msg.channel}
          />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 h-10 bg-background"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9">
            <Mic className="h-4 w-4" />
          </Button>
          <Button size="icon" className="shrink-0 h-10 w-10" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
