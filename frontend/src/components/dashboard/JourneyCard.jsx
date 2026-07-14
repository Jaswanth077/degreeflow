import React from "react";

export default function JourneyCard({
  children,
  footerMessage = "",
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141422] shadow-md shadow-black/30 transition-colors duration-200 hover:border-white/[0.14]">
      <style>{`
        .journey-scrollbar::-webkit-scrollbar {
          width: 3px;
        }

        .journey-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .journey-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
        }

        .journey-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>

      {/* Header */}
      <div className="flex items-start justify-between border-b border-white/[0.06] px-6 pb-4 pt-5">
        <div>
          <h2 className="serif text-lg font-medium text-[#F5F3FF]">
            Academic Journey
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Recent updates from your academic record.
          </p>
        </div>

        <span className="mono mt-0.5 cursor-not-allowed select-none text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] opacity-40">
          View All →
        </span>
      </div>

      {/* Timeline Content */}
      <div className="relative px-6 pb-1 pt-4">
        <div className="journey-scrollbar max-h-[300px] overflow-y-auto pr-2">
          {children}
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#141422] to-transparent" />
      </div>

      {/* Footer */}
      {footerMessage && (
        <div className="border-t border-white/[0.06] px-6 py-3.5">
          <p className="mono text-[11px] leading-relaxed text-[var(--text-faint)]">
            {footerMessage}
          </p>
        </div>
      )}
    </div>
  );
}