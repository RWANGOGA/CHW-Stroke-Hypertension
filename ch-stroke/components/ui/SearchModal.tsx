"use client";

import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { searchIndex } from "./searchIndex";

interface SearchModalProps {
  open: boolean;
  onClose(): void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
      }
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
      );
    });
  }, [query]);

  useEffect(() => {
    setSelected(0);
  }, [results]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-card border rounded-lg shadow-lg mt-20 z-10">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="text-sm font-medium">Search</div>
          <button onClick={onClose} aria-label="Close search" title="Close" className="p-1 rounded-md hover:bg-muted/30">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected((s) => Math.min(s + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected((s) => Math.max(s - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                if (results.length > 0) {
                  const r = results[selected];
                  onClose();
                  router.push(r.href);
                }
              }
            }}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Search..."
            aria-label="Search"
          />

          <div className="mt-3">
            {query.trim() === "" ? (
              <div className="text-sm text-muted">Type to search...</div>
            ) : results.length === 0 ? (
              <div className="text-sm text-muted">No results found for "{query}"</div>
            ) : (
              <ul className="space-y-1">
                {results.map((r, idx) => (
                  <li key={r.href}>
                    <button
                      className={
                        "w-full text-left px-3 py-2 rounded-md hover:bg-muted/30 " +
                        (idx === selected ? "bg-muted/30" : "")
                      }
                      onMouseEnter={() => setSelected(idx)}
                      onClick={() => {
                        onClose();
                        router.push(r.href);
                      }}
                    >
                      <div className="font-medium">{r.title}</div>
                      <div className="text-sm text-muted">{r.description}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
