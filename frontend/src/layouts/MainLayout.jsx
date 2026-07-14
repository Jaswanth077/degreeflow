import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  Brain,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Calendar,
} from "lucide-react";

export default function MainLayout({
  children,
  activeTab,
  setActiveTab,
}) {
  const { student, logout, isMockMode } = useAuth();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      id: "courses",
      label: "Courses",
      icon: <BookOpen size={18} />,
    },
    {
      id: "results",
      label: "Results",
      icon: <GraduationCap size={18} />,
    },
    {
      id: "backlogs",
      label: "Backlogs",
      icon: <AlertTriangle size={18} />,
    },
    {
      id: "advisor",
      label: "AI Advisor",
      icon: <Brain size={18} />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 size={18} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ];

  const getFormattedDate = () => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return new Date().toLocaleDateString("en-US", options);
  };

  const getAvatarInitials = () => {
    if (!student?.name) {
      return "ST";
    }

    return student.name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--bg)] font-sans text-[var(--text)]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-[var(--primary)]/[0.04] blur-[180px]" />

      {/* Sidebar */}
      <aside className="relative z-20 flex w-52 shrink-0 flex-col border-r border-white/[0.06] bg-[var(--bg-panel)] px-3 py-5">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2.5 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] via-violet-500 to-purple-600 shadow-md">
            <span className="text-sm text-white">🎓</span>
          </div>

          <div className="min-w-0">
            <span className="serif block truncate text-base font-medium leading-tight text-[var(--text)]">
              DegreeFlow
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab?.(item.id)}
                className={`
                  flex w-full items-center gap-3 rounded-xl border-l-2
                  px-3 py-2.5 text-left text-xs font-semibold
                  transition-all duration-200
                  ${
                    isActive
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--text)]"
                      : "border-transparent text-[var(--text-faint)] hover:bg-white/[0.03] hover:text-[var(--text-muted)]"
                  }
                `}
              >
                <span
                  className={`shrink-0 ${
                    isActive ? "text-[var(--primary)]" : ""
                  }`}
                >
                  {item.icon}
                </span>

                <span className="truncate">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="mt-4 border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 transition-all hover:bg-white/[0.04]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-purple-600 text-[10px] font-bold text-white">
              {getAvatarInitials()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold leading-tight text-[var(--text)]">
                {student?.name || "Student"}
              </p>

              <p className="mono mt-0.5 truncate text-[9px] text-[var(--text-faint)]">
                {student?.registerNumber || "N/A"}
              </p>
            </div>

            <button
              onClick={logout}
              title="Logout"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[var(--text-faint)] transition-colors hover:bg-red-500/20 hover:text-red-400"
            >
              <LogOut size={13} />
            </button>
          </div>

          {isMockMode && (
            <p className="mono mt-2.5 text-center text-[9px] uppercase tracking-widest text-[var(--primary)]/50">
              Demo Mode Active
            </p>
          )}
        </div>
      </aside>

      {/* Main area */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[var(--bg-panel)]/70 px-6 backdrop-blur-xl">
          {/* Search */}
          <div className="hidden items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[var(--text-faint)] transition-all focus-within:border-[var(--primary)]/40 md:flex">
            <Search size={13} />

            <input
              type="text"
              placeholder="Search courses..."
              className="w-36 bg-transparent text-xs text-[var(--text)] outline-none placeholder:text-[var(--text-faint)]"
            />
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2.5">
            {/* Date */}
            <div className="mono hidden items-center gap-1.5 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1.5 text-[11px] font-bold text-[var(--primary)] sm:flex">
              <Calendar size={11} />
              <span>{getFormattedDate()}</span>
            </div>

            {/* Notification */}
            <button className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04] text-[var(--text-muted)] transition-colors hover:bg-white/[0.08]">
              <Bell size={15} />

              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
            </button>

            {/* Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-purple-600 text-[10px] font-bold text-white shadow-md">
              {getAvatarInitials()}
            </div>
          </div>
        </header>

        {/* Page Content */}
     <main className="flex-1 overflow-y-auto">
  <div className="mx-auto w-full max-w-[1400px] px-8 pb-16 pt-10">
    {children}
  </div>
</main>
      </div>
    </div>
  );
}