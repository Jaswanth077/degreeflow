import React from "react";
import { Link } from "react-router-dom";

export default function SidebarItem({ label, icon, path, isActive }) {
  return (
    <Link
      to={path}
      className={`
        w-full flex items-center h-11 gap-4 rounded-xl px-4 text-sm font-semibold
        transition-all duration-200 group relative select-none
        ${
          isActive
            ? "bg-[var(--primary)] text-[#0B0B14] shadow-md shadow-[var(--primary)]/10"
            : "text-[var(--text-muted)] hover:bg-white/[0.03] hover:text-white"
        }
      `}
    >
      {/* Active Indicator bar */}
      {isActive && (
        <span className="absolute left-0 top-1/4 h-1/2 w-1.5 rounded-r bg-[#0B0B14]" />
      )}
      <span className={isActive ? "text-[#0B0B14]" : "text-[var(--text-faint)] group-hover:text-[var(--text-muted)]"}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
