import React from "react";
import Link from "next/link";
import { Users, FileText, Calendar, Settings, Briefcase } from "lucide-react";

interface SidebarProps {
  role?: "worker" | "patient";
}

export const Sidebar: React.FC<SidebarProps> = ({ role = "worker" }) => {
  // For workers we show a compact icon-only sidebar (collapsed) as requested.
  const workerItems = [
    { href: "/dashboard", label: "Dashboard", icon: Briefcase },
    { href: "/worker/patients", label: "Patients", icon: Users },
    { href: "/worker/alerts", label: "Alerts", icon: FileText },
    { href: "/worker/simulator", label: "Simulator", icon: Calendar },
    { href: "/worker/settings", label: "Settings", icon: Settings },
  ];

  const patientItems = [
    { href: "/patient/profile", label: "Profile", icon: Users },
    { href: "/patient/records", label: "Records", icon: FileText },
    { href: "/patient/settings", label: "Settings", icon: Settings },
  ];

  const items = role === "worker" ? workerItems : patientItems;

  return (
    // Narrow sidebar (collapsed) - width for icons only
    <aside className="w-16 min-h-screen bg-card text-card-foreground flex flex-col items-center py-4 shadow-sm">
      <div className="mb-4">
        <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center"> 
          <span className="font-bold text-white">HG</span>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col items-center space-y-2">
          {items.map((it) => (
            <li key={it.href} className="w-full flex justify-center">
              <Link
                href={it.href}
                title={it.label}
                className="p-3 rounded-md hover:bg-primary/10 transition-colors flex items-center justify-center w-10 h-10"
              >
                <it.icon className="h-5 w-5" />
                <span className="sr-only">{it.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4 mb-2">
        <Link href="/support" title="Support" className="p-2 rounded-md hover:bg-primary/10">
          <Users className="h-5 w-5" />
          <span className="sr-only">Support</span>
        </Link>
      </div>
    </aside>
  );
};
