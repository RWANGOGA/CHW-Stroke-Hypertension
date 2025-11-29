"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bell, User, LogOut, Settings as SettingsIcon, Search, Menu, ChevronLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

interface HeaderProps {
  title?: string;
  avatarSrc?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, avatarSrc }) => {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [messageCount, setMessageCount] = useState<number>(3);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenSearch((v) => !v);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return;
      if (e.target instanceof Node && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="relative flex items-center justify-between px-4 py-3 border-b bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger to toggle sidebar overlay */}
        <button
          aria-label="Open sidebar"
          title="Open sidebar"
          onClick={() => window.dispatchEvent(new CustomEvent('sidebar:toggle'))}
          className="p-2 rounded-md mr-2 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        {/* Divider button: toggle collapse/expand of sidebar */}
        <button
          aria-label="Toggle sidebar collapse"
          title="Toggle sidebar collapse"
          onClick={() => window.dispatchEvent(new CustomEvent('sidebar:collapse'))}
          className="p-2 rounded-md mr-2 hidden md:inline-flex hover:bg-muted/50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="text-lg font-semibold">{title ?? "Dashboard"}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Search"
          title="Search"
          onClick={() => setOpenSearch(true)}
          className="p-2 rounded-md hover:bg-muted/50 transition-colors"
        >
          <Search className="h-5 w-5 text-foreground" />
        </button>
        {/* Messages button (brand blue) */}
        <div className="relative">
          <button
            aria-label={messageCount > 0 ? `Messages (${messageCount})` : "Messages"}
            title="Messages"
            onClick={() => {
              // open messages UI (placeholder)
              // don't automatically clear the badge here so the count remains visible
              console.log("open messages");
            }}
            className="header-message-btn hover:opacity-95"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
          {messageCount > 0 && (
            <span className="header-message-badge" aria-hidden>
              {messageCount >= 20 ? "20+" : String(messageCount)}
            </span>
          )}
        </div>
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-full hover:bg-muted/50 transition-colors"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-destructive text-white text-[10px]">3</span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={open}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-muted/50 transition-colors"
          >
            {avatarSrc ? (
              <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
                <Image src={avatarSrc} alt="User avatar" width={32} height={32} className="object-cover" />
              </div>
            ) : (
              <span className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">HG</span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-card border rounded-md shadow-strong z-50">
              <div className="flex flex-col py-1">
                <Link href="/patient/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-muted/40">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Profile</span>
                </Link>
                <Link href="/patient/settings" className="flex items-center gap-2 px-3 py-2 hover:bg-muted/40">
                  <SettingsIcon className="h-4 w-4" />
                  <span className="text-sm">Settings</span>
                </Link>
                <button onClick={() => console.log("sign out") } className="flex items-center gap-2 px-3 py-2 hover:bg-muted/40 text-left">
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
    </header>
  );
};
