"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Users, FileText, Calendar, Settings, Briefcase, ChevronLeft, ChevronRight, X } from "lucide-react";

interface SidebarProps {
  role?: "worker" | "patient";
}

export const Sidebar: React.FC<SidebarProps> = ({ role = "worker" }) => {
  const [expanded, setExpanded] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // listen for collapse toggle events from header or elsewhere
  useEffect(() => {
    function onCollapse() {
      setExpanded((v) => !v);
      // if collapsing, unpin; if expanding, pin by default
      setPinned((p) => (p ? false : true));
    }
    window.addEventListener("sidebar:collapse", onCollapse as EventListener);
    return () => window.removeEventListener("sidebar:collapse", onCollapse as EventListener);
  }, []);

  useEffect(() => {
    function onToggle() {
      setMobileOpen((v) => !v);
    }
    window.addEventListener("sidebar:toggle", onToggle as EventListener);

    // track desktop breakpoint (md = 768px)
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);

    return () => {
      window.removeEventListener("sidebar:toggle", onToggle as EventListener);
      mq.removeEventListener?.("change", handler);
    };
  }, []);

  // Hover behaviour: expand temporarily on desktop unless pinned
  function handleMouseEnter() {
    if (isDesktop && !pinned) setExpanded(true);
  }

  function handleMouseLeave() {
    if (isDesktop && !pinned) setExpanded(false);
  }
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
    <>
      {/* Overlay for mobile when open */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative z-50 w-64 h-full bg-card p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                  <span className="font-bold text-white">HG</span>
                </div>
                <div>
                  <div className="text-sm font-semibold">HealthGuard AI</div>
                  <div className="text-xs opacity-80">{role === "worker" ? "Community Worker" : "Patient"}</div>
                </div>
              </div>
              <button aria-label="Close sidebar" onClick={() => setMobileOpen(false)} className="p-2 rounded-md">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1">
              <ul className="space-y-2">
                {items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10">
                      <it.icon className="h-5 w-5" />
                      <span className="text-sm">{it.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={
          (role === "worker"
            ? "brand-sidebar text-white"
            : "relative min-h-screen bg-card text-card-foreground") +
          " flex flex-col transition-width duration-200 shadow-sm " +
          (expanded ? "w-56" : "w-16 items-center")
        }
        // inline fallback so the blue appears even if CSS isn't loaded yet
        style={role === "worker" ? { background: 'var(--brand-blue)', color: '#fff' } : undefined}
      >
      {/* Collapse control moved to header; sidebar button removed per user request */}
      <div className={expanded ? "px-4 py-4 flex items-center gap-3" : "mb-4 mt-2"}>
        <div className={expanded ? "h-10 w-10 rounded-md bg-primary flex items-center justify-center" : "h-10 w-10 rounded-md bg-primary flex items-center justify-center"}>
          <span className={expanded ? "font-bold text-white" : "font-bold text-white"}>HG</span>
        </div>
        {expanded && (
          <div>
            <div className="text-sm font-semibold">HealthGuard AI</div>
            <div className="text-xs opacity-80">{role === "worker" ? "Community Worker" : "Patient"}</div>
          </div>
        )}
      </div>

      <nav className="flex-1 w-full px-1">
        <ul className={expanded ? "space-y-1 px-2" : "flex flex-col items-center space-y-2"}>
          {items.map((it) => (
            <li key={it.href} className={expanded ? "w-full" : "w-full flex justify-center"}>
              <Link
                href={it.href}
                title={it.label}
                className={
                  (expanded ? "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors" : "p-3 rounded-md hover:bg-primary/10 transition-colors flex items-center justify-center w-10 h-10")
                }
              >
                <it.icon className="h-5 w-5" />
                {expanded && <span className="text-sm">{it.label}</span>}
                <span className="sr-only">{it.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={expanded ? "px-4 py-4 border-t" : "mt-4 mb-2"}>
        <div className="flex items-center gap-2">
          {!expanded ? (
            <div className="flex items-center gap-2">
              <button aria-label="Open sidebar (mobile)" title="Open" onClick={() => setMobileOpen(true)} className="p-2 rounded-md hover:bg-primary/10 md:hidden">
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                aria-label="Expand sidebar"
                title="Expand"
                onClick={() => {
                  setPinned(true);
                  setExpanded(true);
                }}
                className="p-2 rounded-md hover:bg-primary/10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <Link href="/support" title="Support" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10">
                <Users className="h-5 w-5" />
                <span className="text-sm">Support</span>
              </Link>
              <button
                aria-label="Collapse sidebar"
                title="Collapse"
                onClick={() => {
                  setPinned(false);
                  setExpanded(false);
                }}
                className="ml-auto p-2 rounded-md hover:bg-primary/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
    </>
  );
};
