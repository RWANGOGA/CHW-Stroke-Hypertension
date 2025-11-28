"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onClose(): void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-card border rounded-lg shadow-lg mt-20 z-10">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="text-sm font-medium">Search documentation</div>
          <button onClick={onClose} aria-label="Close search" title="Close" className="p-1 rounded-md hover:bg-muted/30">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          <input
            autoFocus
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Search... (type and press Enter)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // In a full implementation we'd run a search; for now just close
                onClose();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
