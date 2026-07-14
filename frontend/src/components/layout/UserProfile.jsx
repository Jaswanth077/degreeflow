import React from "react";
import { LogOut } from "lucide-react";
import Avatar from "../ui/Avatar";

export default function UserProfile({ student, onLogout, isMockMode = false }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <div className="flex items-center gap-3 rounded-xl bg-[var(--surface)] border border-white/10 p-3.5 hover:bg-white/[0.02] transition-all">
        {/* Reusable Avatar */}
        <Avatar name={student?.name} />

        {/* Profile Info */}
        <div className="flex-1 overflow-hidden">
          <h4 className="truncate text-sm font-bold text-[var(--text)] leading-tight">
            {student?.name || "Student"}
          </h4>
          <p className="truncate text-[10px] font-semibold text-[var(--text-faint)] tracking-wider uppercase mt-0.5 mono">
            Reg: {student?.registerNumber || "N/A"}
          </p>
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout}
          type="button"
          title="Logout"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[var(--text-muted)] hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
        </button>
      </div>

      {isMockMode && (
        <div className="mt-3 text-center">
          <span className="inline-block text-[9px] uppercase font-bold tracking-widest text-[var(--primary)]/60 bg-[var(--primary)]/5 px-2.5 py-0.5 rounded-md border border-[var(--primary)]/10 mono">
            Demo Mode Active
          </span>
        </div>
      )}
    </div>
  );
}
