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
import Logo from "../components/ui/Logo";

export default function MainLayout({ children, activeTab, setActiveTab }) {
  const { student, logout, isMockMode } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
    { id: "results", label: "Results", icon: <GraduationCap size={20} /> },
    { id: "backlogs", label: "Backlogs", icon: <AlertTriangle size={20} /> },
    { id: "advisor", label: "AI Academic Advisor", icon: <Brain size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  // Helper for greeting based on time of day
  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return "Good Morning";
    if (hrs < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Format current date
  const getFormattedDate = () => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  // Get initials for avatar
  const getAvatarInitials = () => {
    if (!student || !student.name) return "ST";
    return student.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--text)] font-sans">
      
      {/* Background glow animations - Restrained */}
      <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-[var(--primary)]/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-[var(--primary)]/[0.02] blur-[180px] pointer-events-none" />

      {/* SIDEBAR */}
      <aside className="relative z-20 flex w-72 flex-col justify-between border-r border-white/10 bg-[var(--bg-panel)] p-6">
        
        {/* Top Logo */}
        <div className="py-2">
          <Logo size="default" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1 py-8">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold
                  transition-all duration-200 group relative
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
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile Details */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-3 rounded-xl bg-[var(--surface)] border border-white/10 p-3.5 hover:bg-white/[0.02] transition-all">
            
            {/* Initial Avatar */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] font-bold text-[#0B0B14] text-sm">
              {getAvatarInitials()}
            </div>

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
              onClick={logout}
              title="Logout"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[var(--text-muted)] hover:bg-red-500/20 hover:text-red-400 transition-colors"
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

      </aside>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[var(--bg-panel)] px-8 shrink-0">
          
          {/* Greeting */}
          <div>
            <h2 className="serif text-2xl font-medium text-[var(--text)] flex items-center gap-2">
              {getGreeting()}, {student?.name?.split(" ")[0] || "Student"} 👋
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-medium">Here's your academic overview</p>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-4">
            
            {/* Search Bar mockup */}
            <div className="hidden md:flex items-center gap-2.5 rounded-xl border border-white/10 bg-[var(--surface)] px-4 py-2 text-[var(--text-muted)] focus-within:border-[var(--primary)] focus-within:text-[var(--text)] transition-all max-w-xs">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search subjects..."
                className="bg-transparent text-xs font-semibold outline-none placeholder:text-[var(--text-faint)] w-44 font-mono"
              />
            </div>

            {/* Date Display */}
            <div className="flex items-center gap-2 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-4 py-2 text-xs font-bold text-[var(--primary)] mono">
              <Calendar size={14} />
              <span>{getFormattedDate()}</span>
            </div>

            {/* Notifications icon */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[var(--primary)]" />
            </button>

          </div>

        </header>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto bg-[var(--bg)] p-8">
          <div className="mx-auto max-w-7xl animate-fade-up">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
