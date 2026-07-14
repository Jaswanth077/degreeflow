import React from "react";
import { CheckCircle, AlertTriangle, GraduationCap } from "lucide-react";
import { EVENT_TYPES } from "../../constants/timeline";

// Badge variant map corrected to match Badge.jsx supported variants:
// high, medium, low, new
const ICON_MAP = {
  [EVENT_TYPES.COURSE]: CheckCircle,
  [EVENT_TYPES.BACKLOG]: AlertTriangle,
  [EVENT_TYPES.CREDIT]: GraduationCap,
};

const ICON_COLOR_MAP = {
  [EVENT_TYPES.COURSE]: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
  [EVENT_TYPES.BACKLOG]: "text-[var(--accent-warm)] bg-[var(--accent-warm)]/10 border border-[var(--accent-warm)]/20",
  [EVENT_TYPES.CREDIT]: "text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20",
};

// Inline badge — avoids variant mismatch with Badge.jsx
const TYPE_LABEL_STYLE = {
  [EVENT_TYPES.COURSE]: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  [EVENT_TYPES.BACKLOG]: "text-[var(--accent-warm)] bg-[var(--accent-warm)]/10 border-[var(--accent-warm)]/20",
  [EVENT_TYPES.CREDIT]: "text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20",
};

export default function JourneyItem({ item, isLast = false }) {
  const IconComponent = ICON_MAP[item.type] || CheckCircle;
  const colorClass = ICON_COLOR_MAP[item.type] || "text-slate-400 bg-white/5";
  const badgeStyle = TYPE_LABEL_STYLE[item.type] || "text-slate-400 bg-white/5 border-white/10";

  return (
    <div className="flex gap-5 relative select-none group pb-5">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center shrink-0 relative">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colorClass} z-10 transition-transform duration-200 group-hover:scale-105`}>
          <IconComponent size={14} />
        </div>
        {!isLast && (
          <div className="absolute top-8 bottom-0 left-1/2 w-px -translate-x-1/2 bg-white/5 group-hover:bg-white/10 transition-colors duration-200" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeStyle}`}>
            {item.badge}
          </span>
          <span className="mono text-[11px] text-[var(--text-faint)]">
            {item.relativeLabel}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-[#F5F3FF] tracking-tight leading-snug">
          {item.title}
        </h4>
        <p className="text-xs text-[var(--text-muted)] font-medium mt-1 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}
