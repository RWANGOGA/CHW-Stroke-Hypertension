"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageBubble } from "@/components/message-bubble"
import { Send, Bot, Sparkles, Heart, Activity, AlertTriangle } from "lucide-react"

interface Message {
  id: string
  message: string
  sender: "user" | "bot"
  timestamp: string
}

const quickPrompts = [
  { icon: Heart, label: "Check patient vitals", prompt: "Show me the latest vitals for high-risk patients" },
  { icon: AlertTriangle, label: "Risk analysis", prompt: "Analyze current risk levels and recommend actions" },
  { icon: Activity, label: "Trend summary", prompt: "Summarize health trends from the past week" },
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      message:
        "Hello! I'm your AI health assistant. I can help you analyze patient data, identify risks, and recommend interventions. How can I assist you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      message: messageText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Show me the latest vitals for high-risk patients":
          "Based on the latest readings:\n\n**James Okonkwo (Risk Score: 85)**\n• Heart Rate: 92 bpm (elevated)\n• Sleep: 5.2 hrs (below optimal)\n• Steps: 1,800/day (low activity)\n\n**Fatima Hassan (Risk Score: 78)**\n• Heart Rate: 88 bpm (slightly elevated)\n• Sleep: 6.1 hrs\n• Steps: 2,100/day\n\n**Grace Nakamura (Risk Score: 72)**\n• Heart Rate: 85 bpm\n• Sleep: 6.3 hrs\n• Steps: 2,400/day\n\n⚠️ Recommendation: Prioritize follow-up with James Okonkwo due to combined elevated HR and low activity pattern.",
        "Analyze current risk levels and recommend actions":
          "**Current Risk Analysis:**\n\n🔴 **High Risk (3 patients)**\n• James Okonkwo - Past stroke history, elevated HR\n• Fatima Hassan - Vision changes reported, stroke history\n• Grace Nakamura - High stress, reduced activity\n\n🟡 **Moderate Risk (1 patient)**\n• Maria Santos - Occasional palpitations\n\n🟢 **Low Risk (1 patient)**\n• Robert Chen - Stable readings\n\n**Recommended Actions:**\n1. Urgent: Contact James Okonkwo within 24hrs\n2. Schedule BP check for Fatima Hassan\n3. Review stress management plan with Grace Nakamura",
        "Summarize health trends from the past week":
          "**Weekly Health Trend Summary:**\n\n📊 **Overall Patterns:**\n• Average adherence: 86% (+4% from last week)\n• High-risk patients: 3 (stable)\n• New alerts generated: 7\n\n📈 **Positive Trends:**\n• Maria Santos showing improved activity (+1,200 steps/day)\n• Robert Chen maintaining excellent medication adherence (95%)\n\n📉 **Areas of Concern:**\n• James Okonkwo sleep quality declining\n• Increased stress reports across 3 patients\n• 2 missed medication doses reported\n\n💡 **AI Recommendation:** Focus community wellness session on stress management techniques.",
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        message:
          responses[messageText] ||
          "I understand you're asking about patient health management. Based on the current data, I can help you with risk analysis, vital sign monitoring, and intervention recommendations. Could you be more specific about what you'd like to know?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pl-[72px]">

        <main className="p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px] h-[calc(100vh-140px)]">
            {/* Chat Area */}
            <Card className="border-border/50 flex flex-col overflow-hidden">
              <CardHeader className="pb-3 shrink-0 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold">AI Triage Assistant</CardTitle>
                    <p className="text-xs text-muted-foreground">Powered by health data analysis</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg.message}
                    sender={msg.sender}
                    senderName={msg.sender === "bot" ? "AI" : "You"}
                    timestamp={msg.timestamp}
                  />
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="flex gap-1">
                      <span
                        className="h-2 w-2 rounded-full bg-primary/60 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-primary/60 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-primary/60 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <span className="text-xs">AI is analyzing...</span>
                  </div>
                )}
              </CardContent>

              <div className="p-4 border-t border-border/50 shrink-0">
                <div className="flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about patient health, risks, or recommendations..."
                    className="flex-1 h-11 bg-background"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button size="icon" className="h-11 w-11" onClick={() => handleSend()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Quick Prompts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickPrompts.map((prompt, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full justify-start h-auto py-3 px-3 bg-transparent"
                      onClick={() => handleSend(prompt.prompt)}
                    >
                      <prompt.icon className="h-4 w-4 mr-2 text-primary shrink-0" />
                      <span className="text-sm text-left">{prompt.label}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-primary/5">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-sm mb-2">AI Capabilities</h4>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li>• Analyze patient vital signs</li>
                    <li>• Identify risk patterns</li>
                    <li>• Generate intervention plans</li>
                    <li>• Summarize health trends</li>
                    <li>• Prioritize follow-ups</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
