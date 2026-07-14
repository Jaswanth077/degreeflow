import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import SealProgress from "../components/ui/SealProgress";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { placementWeights } from "../utils/placementCriteria";
import {
  Brain,
  Award,
  BookOpen,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  History,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const {
  academicProfile,
  student,
  isMockMode,
} = useAuth();

  if (!academicProfile) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020617] text-white">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mx-auto"></div>
          <p className="text-slate-400 text-sm">Loading your academic record...</p>
        </div>
      </div>
    );
  }
const {
  completed = [],
  failed = [],
  remaining = [],
  electives = [],
  summary = {},
  credits = {},
  grades = {},
} = academicProfile;

  const completedCredits = completed.reduce((sum, course) => sum + (
  course.credits || 0), 0);
  const totalCredits = 160;

  const completedCodes = new Set(completed.map((c) => c.code));

  let placementScore = 0;
  Object.keys(placementWeights).forEach((code) => {
    if (completedCodes.has(code)) {
      placementScore += placementWeights[code];
    }
  });

  const priorityBacklog = failed.find(f => placementWeights[f.code]) || failed[0];
  const priorityBacklogWeight = priorityBacklog ? (placementWeights[priorityBacklog.code] || 0) : 0;
  const potentialReadinessBoost = placementScore + priorityBacklogWeight;

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && (
        <OverviewTab
          completed={completed}
          failed={failed}
          remaining={remaining}
          completedCredits={completedCredits}
          totalCredits={totalCredits}
          placementScore={placementScore}
          priorityBacklog={priorityBacklog}
          priorityBacklogWeight={priorityBacklogWeight}
          potentialReadinessBoost={potentialReadinessBoost}
          setActiveTab={setActiveTab}
        />
      )}
      {activeTab === "courses" && <CoursesTab completed={completed} failed={failed} remaining={remaining} />}
      {activeTab === "results" && <ResultsTab completed={completed} />}
      {activeTab === "backlogs" && <BacklogsTab failed={failed} priorityBacklog={priorityBacklog} />}
      {activeTab === "advisor" && (
        <AdvisorTab
          completed={completed}
          failed={failed}
          remaining={remaining}
          completedCredits={completedCredits}
          placementScore={placementScore}
          priorityBacklog={priorityBacklog}
        />
      )}
      {activeTab === "analytics" && (
        <AnalyticsTab
          completed={completed}
          failed={failed}
          remaining={remaining}
          completedCredits={completedCredits}
          totalCredits={totalCredits}
        />
      )}
      {activeTab === "settings" && <SettingsTab student={student} isMockMode={isMockMode} />}
    </MainLayout>
  );
}

// ----------------------------------------------------
// 1. OVERVIEW TAB
// ----------------------------------------------------
function OverviewTab({
  completed,
  failed,
  remaining,
  completedCredits,
  totalCredits,
  placementScore,
  priorityBacklog,
  priorityBacklogWeight,
  potentialReadinessBoost,
  setActiveTab,
}) {
  const totalCoursesCount = completed.length + failed.length + remaining.length;
  const degreeProgressPercent = Math.round((completed.length / totalCoursesCount) * 100) || 0;

  return (
    <div className="space-y-8">
      {/* 4 Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Degree Progress */}
        <div className="rounded-xl border border-white/10 bg-[var(--surface)] p-6 flex items-center justify-between transition-all hover:border-[var(--primary)]/30">
          <div className="space-y-1.5">
            <span className="mono text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest block">Degree Progress</span>
            <h3 className="mono text-3xl font-semibold text-[var(--text)]">{degreeProgressPercent}%</h3>
            <p className="mono text-[11px] text-[var(--text-faint)] font-medium">{completed.length} / {totalCoursesCount} Courses Done</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <GraduationCap size={20} />
          </div>
        </div>

        {/* Credits Earned */}
        <div className="rounded-xl border border-white/10 bg-[var(--surface)] p-6 flex items-center justify-between transition-all hover:border-[var(--primary)]/30">
          <div className="space-y-1.5">
            <span className="mono text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest block">Credits Earned</span>
            <h3 className="mono text-3xl font-semibold text-[var(--text)]">
              {completedCredits} <span className="text-xs text-[var(--text-faint)] font-normal">/ {totalCredits}</span>
            </h3>
            <p className="text-[11px] text-[var(--text-faint)] font-medium">Dynamic Academic Value</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <BookOpen size={18} />
          </div>
        </div>

        {/* Backlogs */}
        <div className="rounded-xl border border-white/10 bg-[var(--surface)] p-6 flex items-center justify-between transition-all hover:border-[var(--primary)]/30">
          <div className="space-y-1.5">
            <span className="mono text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest block">Backlogs</span>
            <h3 className={`mono text-3xl font-semibold ${failed.length > 0 ? "text-[var(--accent-warm)]" : "text-emerald-400"}`}>
              {failed.length}
            </h3>
            <p className="text-[11px] text-[var(--text-faint)] font-medium">Courses to Clear</p>
          </div>
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${failed.length > 0 ? "bg-[var(--accent-warm)]/10 text-[var(--accent-warm)]" : "bg-emerald-500/10 text-emerald-400"}`}>
            <AlertTriangle size={18} />
          </div>
        </div>

        {/* Placement Readiness */}
        <div className="rounded-xl border border-white/10 bg-[var(--surface)] p-6 flex items-center justify-between transition-all hover:border-[var(--primary)]/30">
          <div className="space-y-1.5">
            <span className="mono text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest block">Placement Readiness</span>
            <h3 className="mono text-3xl font-semibold text-[var(--text)]">{placementScore}%</h3>
            <p className="text-[11px] text-[var(--text-faint)] font-medium">{placementScore >= 70 ? "Keep it up!" : "Needs work"}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <Award size={20} />
          </div>
        </div>

      </div>

      {/* Two Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN - Today's Insights & AI Recommendations */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">

          {/* Today's Insights Card */}
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 text-indigo-400/10 pointer-events-none">
              <Sparkles size={100} />
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Brain size={16} />
              </span>
              <h3 className="serif text-lg font-bold text-white">Today's Insights</h3>
            </div>

            <div className="space-y-4 max-w-xl">
              <div className="flex items-start gap-3">
                <span className="text-base mt-0.5">🎉</span>
                <p className="text-sm text-slate-300">
                  You completed <strong className="text-white">{completed.length} courses</strong> successfully.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-base mt-0.5">📚</span>
                <p className="text-sm text-slate-300">
                  You have earned <strong className="text-white">{completedCredits} credits</strong> towards your graduation threshold.
                </p>
              </div>
              {priorityBacklog && (
                <>
                  <div className="flex items-start gap-3">
                    <span className="text-base mt-0.5">⚠</span>
                    <p className="text-sm text-slate-300">
                      <strong className="text-red-400">{priorityBacklog.name}</strong> is your highest priority backlog.
                    </p>
                  </div>
                  {priorityBacklogWeight > 0 && (
                    <div className="flex items-start gap-3">
                      <span className="text-base mt-0.5">🚀</span>
                      <p className="text-sm text-slate-300">
                        Clearing {priorityBacklog.code} increases your Placement Readiness to <strong className="text-indigo-400">{potentialReadinessBoost}%</strong>.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* AI Recommendation Card */}
          <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  🤖
                </span>
                <h3 className="serif text-lg font-bold text-white">AI Recommendation</h3>
              </div>
              <Badge variant="high">High Priority</Badge>
            </div>

            <div className="space-y-4">
              <h4 className="serif text-base font-bold text-white">
                Complete Database Management Systems (DBMS)
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                DBMS is a core computer science discipline. Clearing this backlog unlocks advanced databases, and is highly requested during upcoming placement drives.
              </p>

              {/* Bullets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2.5 rounded-2xl bg-white/[0.02] border border-white/5 p-3.5 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span>Remove 1 backlog</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl bg-white/[0.02] border border-white/5 p-3.5 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span>Unlock placement skills</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl bg-white/[0.02] border border-white/5 p-3.5 text-xs font-semibold text-slate-300">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span>Help interview preparation</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                className="w-auto text-xs py-2 px-5"
                onClick={() => setActiveTab("advisor")}
              >
                <span>View Details</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - Recent Results, Backlogs & Placement Breakdown */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-8">

          {/* Placement Readiness Breakdown */}
          <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <h3 className="serif text-sm font-bold text-white">Placement Readiness</h3>
              <button onClick={() => setActiveTab("advisor")} className="mono text-[10px] uppercase font-bold tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors">
                Details
              </button>
            </div>

            <div className="flex justify-center py-2">
              <SealProgress
                percent={placementScore}
                radius={64}
                strokeWidth={3}
                text="DEGREE FLOW · PLACEMENT READY · DEGREE FLOW ·"
              />
            </div>

            <div className="space-y-4">
              <div>
                <span className="mono block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Strong Areas</span>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-xl bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">Java</span>
                  <span className="rounded-xl bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">Python</span>
                  <span className="rounded-xl bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">AI / ML</span>
                  <span className="rounded-xl bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">OOP</span>
                </div>
              </div>

              <div>
                <span className="mono block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Needs Improvement</span>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-xl bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400">DBMS</span>
                  <span className="rounded-xl bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400">DSA</span>
                  <span className="rounded-xl bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400">Operating Systems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Results */}
          <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <h3 className="serif text-sm font-bold text-white">Recent Results</h3>
              <button onClick={() => setActiveTab("results")} className="mono text-[10px] uppercase font-bold tracking-wider text-slate-400 hover:text-white transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Computer Vision</h4>
                  <p className="text-[10px] text-slate-500">Core Elective</p>
                </div>
                <div className="text-right">
                  <span className="mono block text-xs font-extrabold text-white">A- <span className="text-[10px] text-slate-400 font-semibold">(9.2)</span></span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Software Engineering</h4>
                  <p className="text-[10px] text-slate-500">Core Subject</p>
                </div>
                <div className="text-right">
                  <span className="mono block text-xs font-extrabold text-white">A- <span className="text-[10px] text-slate-400 font-semibold">(8.7)</span></span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Python Programming</h4>
                  <p className="text-[10px] text-slate-500">Programming Lab</p>
                </div>
                <div className="text-right">
                  <span className="mono block text-xs font-extrabold text-white">B+ <span className="text-[10px] text-slate-400 font-semibold">(7.8)</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Backlogs */}
          <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <h3 className="serif text-sm font-bold text-white">Backlogs</h3>
              <button onClick={() => setActiveTab("backlogs")} className="mono text-[10px] uppercase font-bold tracking-wider text-slate-400 hover:text-white transition-colors">
                View All
              </button>
            </div>

            {failed.length === 0 ? (
              <div className="text-center py-4 space-y-1">
                <span className="text-lg">🎉</span>
                <p className="text-xs text-slate-500 font-semibold">Zero backlogs! Excellent job.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {failed.map((course, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{course.name}</h4>
                      <p className="mono text-[10px] text-slate-500">{course.code} • {course.credits} Credits</p>
                    </div>
                    <Badge variant="high">Grade: {course.grade || "RA"}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. COURSES TAB
// ----------------------------------------------------
function CoursesTab({ completed, failed, remaining }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const allCourses = [
    ...completed.map((c) => ({ ...c, status: "completed" })),
    ...failed.map((c) => ({ ...c, status: "failed" })),
    ...remaining.map((c) => ({ ...c, status: "remaining" })),
  ];

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "all") return matchesSearch;
    return matchesSearch && course.status === filterType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="serif text-2xl font-bold text-white">Course Curriculum</h2>
          <p className="text-xs text-slate-400 font-medium">Browse and search all subjects in your program</p>
        </div>

        {/* Filter Categories */}
        <div className="flex gap-1.5 rounded-2xl bg-white/[0.02] border border-white/5 p-1.5 self-stretch md:self-auto">
          {["all", "completed", "remaining", "failed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`
                flex-1 md:flex-none rounded-xl px-4 py-2 text-xs font-bold capitalize transition-all
                ${
                  filterType === type
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Search box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search courses by name or code (e.g. DBMS, CSA05)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-white/5 bg-slate-900/40 px-5 py-4 text-sm font-semibold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 text-white"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500 font-medium">
            No courses found matching your criteria.
          </div>
        ) : (
          filteredCourses.map((course, idx) => (
            <div
              key={idx}
              className={`
                rounded-3xl border p-5 space-y-4 hover:-translate-y-1 transition-all duration-300
                ${
                  course.status === "completed"
                    ? "border-emerald-500/10 bg-emerald-500/[0.01] hover:border-emerald-500/30"
                    : course.status === "failed"
                    ? "border-red-500/10 bg-red-500/[0.01] hover:border-red-500/30"
                    : "border-white/5 bg-slate-900/20 hover:border-indigo-500/20"
                }
              `}
            >
              <div className="flex justify-between items-start">
                <span className="mono text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  {course.code}
                </span>

                {course.status === "completed" && (
                  <Badge variant="low">Completed</Badge>
                )}
                {course.status === "failed" && (
                  <Badge variant="high">Backlog</Badge>
                )}
                {course.status === "remaining" && (
                  <Badge variant="new">Remaining</Badge>
                )}
              </div>

              <div>
                <h4 className="font-bold text-white text-sm line-clamp-1" title={course.name}>
                  {course.name}
                </h4>
                <p className="mono text-xs text-slate-500 font-medium mt-1">
                  {course.credits} Credits Academic Value
                </p>
              </div>

              {course.status === "completed" && (
                <div className="flex justify-between items-center pt-3 border-t border-white/5 text-xs text-slate-400">
                  <span>Grade Received</span>
                  <strong className="mono text-emerald-400 font-bold">{course.grade || "PASS"}</strong>
                </div>
              )}

              {course.status === "failed" && (
                <div className="flex justify-between items-center pt-3 border-t border-white/5 text-xs text-slate-400">
                  <span>Last Grade</span>
                  <strong className="mono text-red-400 font-bold">{course.grade || "RA"}</strong>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. RESULTS TAB
// ----------------------------------------------------
function ResultsTab({ completed }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="serif text-2xl font-bold text-white">All Completed Courses</h2>
        <p className="text-xs text-slate-400 font-medium">Verify your grades and course credits earned</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-xs font-extrabold uppercase tracking-widest text-slate-400">
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4 text-center">Credits</th>
                <th className="px-6 py-4 text-center">Grade</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Completion Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-semibold text-slate-300">
              {completed.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    No completed courses found.
                  </td>
                </tr>
              ) : (
                completed.map((course, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4">
                      <span className="mono block text-xs font-extrabold text-slate-500 uppercase">{course.code}</span>
                      <span className="text-white text-xs font-bold">{course.name}</span>
                    </td>
                    <td className="mono px-6 py-4 text-center text-xs font-bold text-slate-400">
                      {course.credits || 0}
                    </td>
                    <td className="mono px-6 py-4 text-center font-extrabold text-white">
                      {course.grade || "PASS"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex rounded-xl bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                        PASS
                      </span>
                    </td>
                    <td className="mono px-6 py-4 text-center text-xs text-slate-500">
                      {idx % 2 === 0 ? "May 2026" : "December 2025"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. BACKLOGS TAB
// ----------------------------------------------------
function BacklogsTab({ failed, priorityBacklog }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="serif text-2xl font-bold text-white">Backlog Planning</h2>
        <p className="text-xs text-slate-400 font-medium">Overview of failed courses and backlog mitigation</p>
      </div>

      {failed.length === 0 ? (
        <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-12 text-center space-y-3">
          <span className="text-4xl">🎉</span>
          <h3 className="serif text-lg font-bold text-white">No active backlogs!</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Congratulations! You are on a clear path to graduation. Keep up the high standard!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* List of Backlogs */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <h3 className="mono text-sm font-bold text-white uppercase tracking-widest">Active Backlogs ({failed.length})</h3>

            <div className="space-y-4">
              {failed.map((course, idx) => {
                const isPriority = priorityBacklog && priorityBacklog.code === course.code;
                return (
                  <div
                    key={idx}
                    className={`
                      rounded-3xl border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4
                      ${isPriority ? "border-red-500/20 bg-red-500/[0.01]" : "border-white/5 bg-slate-900/20"}
                    `}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="mono text-xs font-extrabold text-slate-500 uppercase">{course.code}</span>
                        {isPriority && <Badge variant="high">Highest Priority</Badge>}
                      </div>
                      <h4 className="font-bold text-white text-sm">{course.name}</h4>
                      <p className="mono text-xs text-slate-500 font-semibold">Program Requirement • {course.credits} Credits</p>
                    </div>

                    <div className="flex items-center gap-4 self-stretch md:self-auto justify-between border-t border-white/5 md:border-t-0 pt-3 md:pt-0">
                      <div className="text-left md:text-right">
                        <span className="mono block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Attempt Grade</span>
                        <strong className="mono text-red-400 font-extrabold text-sm">{course.grade || "RA"}</strong>
                      </div>
                      <Button
                        variant="secondary"
                        className="w-auto text-xs py-2 px-4 whitespace-nowrap"
                        onClick={() => toast.success(`Exam registration for ${course.code} is open.`)}
                      >
                        Register Exam
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guidelines Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <h3 className="mono text-sm font-bold text-white uppercase tracking-widest">AI Backlog Blueprint</h3>

            <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 space-y-6">
              <div className="flex items-center gap-2.5">
                <Brain size={18} className="text-indigo-400" />
                <h4 className="serif text-sm font-bold text-white">Suggested Strategy</h4>
              </div>

              <div className="space-y-4 text-xs font-semibold text-slate-400">
                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">1</span>
                  <p className="leading-relaxed">
                    Prioritize <strong className="text-white">DBMS (CSA05)</strong> as it is critical for both placement readiness score and advanced curricula.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">2</span>
                  <p className="leading-relaxed">
                    Allocate 4 hours per week for <strong className="text-white">Computer Architecture (CSA12)</strong> review sessions.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">3</span>
                  <p className="leading-relaxed">
                    Register for the supplementary exams inside the academic portal.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 5. AI ACADEMIC ADVISOR TAB
// ----------------------------------------------------
function AdvisorTab({
  completed,
  failed,
  remaining,
  completedCredits,
  placementScore,
  priorityBacklog,
}) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your AI Academic Advisor. I am here to help you plan your degree completion, clear backlogs, and advice you on placement readiness.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputValue("");

    setTimeout(() => {
      let aiResponse = "I'm analyzing your academic record. Let me know if you want specific advice on backlogs, placements, or graduation timelines!";

      const query = userMsg.toLowerCase();
      if (query.includes("backlog") || query.includes("clear") || query.includes("dbms")) {
        aiResponse = failed.length > 0
          ? `Your priority backlog is ${failed[0].name}. Clearing it will increase your Placement Readiness by ${placementWeights[failed[0].code] || 15}%. I suggest studying SQL queries and normalization forms first.`
          : "You currently have 0 active backlogs! You are fully on track to graduate.";
      } else if (query.includes("placement") || query.includes("job") || query.includes("readiness")) {
        aiResponse = `Your Placement Readiness score is currently ${placementScore}%. To unlock additional readiness, focus on completing remaining core modules like Data Structures (DSA) or Artificial Intelligence.`;
      } else if (query.includes("credit") || query.includes("graduate") || query.includes("how close")) {
        aiResponse = `You have completed ${completedCredits} of the required 160 credits. You are on track to graduate once all remaining core syllabus units are cleared.`;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    }, 600);
  };

  const suggestedPrompts = [
    "What's my priority backlog?",
    "How's my placement readiness?",
    "How many credits until graduation?",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="serif text-2xl font-bold text-white">AI Academic Advisor</h2>
        <p className="text-xs text-slate-400 font-medium">Personalized academic guidance, backlog mitigation strategies, and placement advice</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Side: Advisor features */}
        <div className="lg:col-span-4 space-y-6">

          {/* Degree Guidance widget */}
          <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400">🎓</span>
              <h4 className="mono text-xs font-bold uppercase tracking-wider text-slate-300">Degree Guidance</h4>
            </div>
            <div className="space-y-2 text-xs font-semibold text-slate-400">
              <div className="mono flex justify-between">
                <span>Credits Completed</span>
                <span className="text-white">{completedCredits} / 160</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-500 h-full" style={{ width: `${(completedCredits/160)*100}%` }}></div>
              </div>
              <div className="mono flex justify-between pt-1">
                <span>Completed courses</span>
                <span className="text-white">{completed.length} / 37</span>
              </div>
            </div>
          </div>

          {/* Backlog Planner widget */}
          <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-red-400">⚠</span>
              <h4 className="mono text-xs font-bold uppercase tracking-wider text-slate-300">Backlog Planning</h4>
            </div>
            {failed.length > 0 ? (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                  Primary target: <strong className="text-white">{failed[0].name}</strong>.
                </p>
                <div className="mono rounded-xl bg-red-500/5 border border-red-500/10 p-3 text-[10px] text-red-400 font-bold">
                  Recommended exam attempt: August 2026.
                </div>
              </div>
            ) : (
              <p className="text-xs text-emerald-400 font-bold">Zero active backlogs. Clean slate!</p>
            )}
          </div>

          {/* Placement Advice widget */}
          <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">💼</span>
              <h4 className="mono text-xs font-bold uppercase tracking-wider text-slate-300">Placement Advice</h4>
            </div>
            <div className="space-y-2 text-xs text-slate-400 font-semibold leading-relaxed">
              <p>
                Your skills list shows strong expertise in <strong className="text-white">Java & Python</strong>.
              </p>
              <p>
                Highlight these in your resume. If you clear DBMS, you increase your readiness to <strong className="text-indigo-400">87%</strong>.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Conversation Chat interface */}
        <div className="lg:col-span-8 flex flex-col h-[500px] rounded-3xl border border-white/5 bg-slate-900/20 overflow-hidden">

          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.01] p-4 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Brain size={18} />
            </div>
            <div>
              <h4 className="serif text-xs font-bold text-white">AI Academic Advisor</h4>
              <p className="mono text-[9px] text-slate-500 uppercase tracking-widest font-extrabold">Degree Companion</p>
            </div>
          </div>

          {/* Messages box */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-semibold">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`
                  flex max-w-[80%] flex-col rounded-2xl p-4 leading-relaxed
                  ${
                    msg.sender === "ai"
                      ? "bg-slate-900/80 text-slate-300 self-start border border-white/5"
                      : "bg-indigo-600 text-white self-end"
                  }
                `}
              >
                {msg.text}
              </div>
            ))}

            {/* Suggested prompt chips — shown only while the conversation is just the greeting,
                so the empty space under a single message has a clear next action */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setInputValue(prompt);
                    }}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] font-semibold text-slate-300 hover:border-indigo-500/40 hover:text-white transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message input */}
          <form onSubmit={handleSendMessage} className="border-t border-white/5 bg-slate-950/40 p-4 flex gap-3 shrink-0">
            <input
              type="text"
              placeholder="Ask about backlogs, placement weightings, or degree credits..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 rounded-2xl border border-white/5 bg-[#020617] px-4 py-3.5 text-xs font-semibold outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600"
            />
            <button
              type="submit"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 transition-all shadow-md"
            >
              <Send size={16} />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// 6. ANALYTICS TAB
// ----------------------------------------------------
function AnalyticsTab({ completed, failed, remaining, completedCredits, totalCredits }) {

  const categories = {
    "Math & Sciences": completed.filter(c => c.code.startsWith("UB") || c.code.startsWith("BT")),
    "Core CS & AI": completed.filter(c => c.code.startsWith("CS") || c.code.startsWith("DS") || c.code.startsWith("ML") || c.code.startsWith("IT")),
    "EE & Systems": completed.filter(c => c.code.startsWith("EE") || c.code.startsWith("EC")),
    "Internships & Projects": completed.filter(c => c.code.startsWith("SP")),
  };

  const getCategoryCredits = (courses) => courses.reduce((sum, c) => sum + (c.credits || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="serif text-2xl font-bold text-white">Degree Analytics</h2>
        <p className="text-xs text-slate-400 font-medium">Visual breakdown of your academic requirements and course distributions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Card: Credit Distribution */}
        <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 space-y-6">
          <h3 className="mono text-sm font-bold text-white uppercase tracking-widest pb-3 border-b border-white/5">
            Credit Distribution by Category
          </h3>

          <div className="space-y-4">
            {Object.keys(categories).map((catName, idx) => {
              const catCredits = getCategoryCredits(categories[catName]);
              const percentage = Math.round((catCredits / completedCredits) * 100) || 0;
              return (
                <div key={idx} className="space-y-2 text-xs font-semibold">
                  <div className="flex justify-between text-slate-300">
                    <span>{catName}</span>
                    <span className="mono">{catCredits} Credits ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Grade Distribution */}
        <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 space-y-6">
          <h3 className="mono text-sm font-bold text-white uppercase tracking-widest pb-3 border-b border-white/5">
            Academic Grade Breakdown
          </h3>

          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
              <span className="mono block text-2xl font-extrabold text-white">
                {completed.filter((c) => c.grade === "A").length}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Grade A</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
              <span className="mono block text-2xl font-extrabold text-white">
                {completed.filter((c) => c.grade === "A-").length}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Grade A-</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
              <span className="mono block text-2xl font-extrabold text-white">
                {completed.filter((c) => c.grade === "B+" || c.grade === "B").length}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Grade B/B+</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
              <span className="mono block text-2xl font-extrabold text-red-400">
                {failed.length}
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Grade RA</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.01] border border-white/5 p-4 flex justify-between items-center text-xs font-semibold">
            <div className="space-y-1">
              <span className="block text-slate-400">Cumulative GPA (Est.)</span>
              <h4 className="mono text-lg font-bold text-white">8.54 / 10.00</h4>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <TrendingUp size={18} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// 7. SETTINGS TAB
// ----------------------------------------------------
function SettingsTab({ student, isMockMode }) {
  const handleClearCache = () => {
    localStorage.clear();
    toast.success("Cache cleared! Reloading page...");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="serif text-2xl font-bold text-white">Settings</h2>
        <p className="text-xs text-slate-400 font-medium">Manage credentials, theme, and system caches</p>
      </div>

      <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-6 space-y-6">

        {/* Profile segment */}
        <div className="space-y-4">
          <h3 className="mono text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-white/5">
            Student Profile Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div className="space-y-1">
              <span className="block text-slate-500">Full Name</span>
              <span className="text-white">{student?.name || "Student"}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-slate-500">Register Number</span>
              <span className="mono text-white">{student?.registerNumber || "N/A"}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-slate-500">Academic Batch</span>
              <span className="mono text-white">2024 - 2028</span>
            </div>
            <div className="space-y-1">
              <span className="block text-slate-500">Discipline Stream</span>
              <span className="text-white">CSE - Artificial Intelligence</span>
            </div>
          </div>
        </div>

        {/* Integration Mode */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <h3 className="mono text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-white/5">
            Integration Settings
          </h3>
          <div className="flex justify-between items-center text-xs font-semibold">
            <div className="space-y-1">
              <span className="block text-slate-300">Database Connection Mode</span>
              <p className="text-[11px] text-slate-500 font-medium max-w-md">
                Indicates if data is actively scraped from ARMS portal or running mock credentials.
              </p>
            </div>
            <Badge variant={isMockMode ? "medium" : "low"}>
              {isMockMode ? "Mock / Demo Mode" : "Portal Integrated"}
            </Badge>
          </div>
        </div>

        {/* System tools */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <h3 className="mono text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-white/5">
            System Cache
          </h3>
          <div className="flex justify-between items-center text-xs font-semibold">
            <div className="space-y-1">
              <span className="block text-slate-300">Clear cached data</span>
              <p className="text-[11px] text-slate-500 font-medium max-w-md">
                Deletes stored academic records from local session caches. Next reload will require authentication.
              </p>
            </div>
            <Button
              variant="danger"
              className="w-auto text-xs py-2 px-4 whitespace-nowrap bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
              onClick={handleClearCache}
            >
              Clear Cache
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}