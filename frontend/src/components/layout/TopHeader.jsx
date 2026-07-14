import React from "react";
import { Search, Calendar, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getGreeting } from "../../utils/getGreeting";
import Avatar from "../ui/Avatar";

export default function TopHeader() {
  const { student } = useAuth();

  // Format current date
  const getFormattedDate = () => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  const firstName = student?.name?.split(" ")[0] || "Student";

  return (
    <header className="flex h-20 items-center justify-between border-b border-white/5 bg-[var(--bg-panel)] px-8 shrink-0">
      {/* Greeting */}
      <div>
        <h2 className="serif text-2xl font-medium text-[var(--text)] flex items-center gap-2">
          {getGreeting()}, {firstName} 👋
        </h2>
        <p className="text-xs text-[var(--text-muted)] font-medium">
          Let's check your progress.
        </p>
      </div>

      {/* Right Header items */}
      <div className="flex items-center gap-4">
        {/* Search Bar mockup */}
        <div className="hidden md:flex items-center gap-2.5 rounded-xl border border-white/10 bg-[var(--surface)] px-4 h-10 text-[var(--text-muted)] focus-within:border-[var(--primary)] focus-within:text-[var(--text)] transition-all max-w-xs select-none">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search courses..."
            className="bg-transparent text-xs font-semibold outline-none placeholder:text-[var(--text-faint)] w-44 font-mono"
          />
        </div>

        {/* Date Display */}
        <div className="flex items-center gap-2 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-4 h-10 text-xs font-bold text-[var(--primary)] mono select-none">
          <Calendar size={14} />
          <span>{getFormattedDate()}</span>
        </div>

        {/* Notifications icon */}
        <button className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer outline-none focus:border-white/20">
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[var(--primary)]" />
        </button>

        {/* Rightmost Profile/Avatar placeholder */}
        <Avatar name={student?.name} className="h-10 w-10 text-xs cursor-pointer shadow-md shadow-black/25 hover:opacity-90 transition-opacity" />
      </div>
    </header>
  );
}
