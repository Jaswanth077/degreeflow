import React from "react";
import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  children,
  delay = 0,
  isLoading = false,
  isError = false,
}) {
  const baseClass =
    "rounded-2xl border border-white/[0.10] bg-[#141422] p-5 h-full flex flex-col justify-between shadow-lg shadow-black/30 transition-all duration-200 hover:-translate-y-1 hover:border-white/20";

  // Loading state
  if (isLoading) {
    return (
      <div className={`${baseClass} animate-pulse select-none`}>
        {/* Top */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 rounded bg-white/5" />
          <div className="h-8 w-8 shrink-0 rounded-lg bg-white/5" />
        </div>

        {/* Middle */}
        <div className="mt-4">
          <div className="h-8 w-16 rounded bg-white/5" />
          <div className="mt-2 h-3 w-28 rounded bg-white/5" />
        </div>

        {/* Bottom */}
        <div className="mt-auto h-[5px] w-full rounded bg-white/5" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className={`${baseClass} opacity-50 select-none`}>
        {/* Top */}
        <div className="flex items-center justify-between">
          <span className="mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            {title}
          </span>

          {icon && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[var(--text-faint)]">
              {icon}
            </div>
          )}
        </div>

        {/* Middle */}
        <div className="mt-4">
          <h3 className="mono text-[30px] font-semibold leading-none tracking-tight text-[var(--text-faint)]">
            —
          </h3>

          <p className="mt-2 text-xs text-red-400">
            Data unavailable
          </p>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay,
        ease: "easeOut",
      }}
      className={`${baseClass} select-none`}
    >
      {/* Top: Title + Icon */}
      <div className="flex items-center justify-between">
        <span className="mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {title}
        </span>

        {icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            {icon}
          </div>
        )}
      </div>

      {/* Middle: Value + Subtitle */}
      <div className="mt-4">
        {value !== undefined && (
          <h3 className="mono text-[30px] font-semibold leading-none tracking-tight text-[var(--text)]">
            {value}
          </h3>
        )}

        {subtitle && (
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom: Progress / Badge / Visualization */}
      {children && (
        <div className="mt-auto w-full pt-4">
          {children}
        </div>
      )}
    </motion.div>
  );
}