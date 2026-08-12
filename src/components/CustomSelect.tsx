"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

type Option = { value: string; label: string };

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (open) setHighlight(options.findIndex((o) => o.value === value));
    else setHighlight(null);
  }, [open, options, value]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") setOpen(true);
      return;
    }
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown") setHighlight((h) => (h === null ? 0 : Math.min(options.length - 1, h + 1)));
    if (e.key === "ArrowUp") setHighlight((h) => (h === null ? options.length - 1 : Math.max(0, h - 1)));
    if (e.key === "Enter" && highlight !== null) {
      onChange(options[highlight].value);
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        onKeyDown={handleKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-sm focus:outline-none focus:ring-2 focus:ring-[#EE7862]"
      >
        <span className={`truncate ${value ? "text-slate-800" : "text-slate-400"}`}>
          {value ? options.find((o) => o.value === value)?.label ?? value : placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-auto py-2"
        >
          {options.map((opt, i) => (
            <li
              key={`${opt.value}-${i}`}
              role="option"
              aria-selected={opt.value === value}
              onMouseEnter={() => setHighlight(i)}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-slate-50 ${
                i === highlight ? "bg-slate-50" : ""
              }`}
            >
              <span className="truncate">{opt.label}</span>
              {opt.value === value && <Check className="w-4 h-4 text-[#00F0ED]" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
