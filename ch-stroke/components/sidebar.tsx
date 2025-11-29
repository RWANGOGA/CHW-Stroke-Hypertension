"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Bell, MessageCircle, Phone, Bot, Activity, Heart } from "lucide-react"

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Alerts", href: "/alerts", icon: Bell, badge: 3 },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "AI Chatbot", href: "/chatbot", icon: Bot },
  { name: "Calls", href: "/calls", icon: Phone },
  { name: "Vitals", href: "/vitals", icon: Activity },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[72px] bg-sidebar flex flex-col items-center py-4">
      {/* Logo */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-6">
        <Heart className="h-6 w-6 text-primary-foreground" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.badge && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-white">
                  {item.badge}
                </span>
              )}
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
