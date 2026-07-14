import React from "react";
import {
  Award,
  AlertTriangle,
  Briefcase,
  TrendingUp,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { placementWeights } from "../../utils/placementCriteria";

export default function ResultsStatGrid({
  loading = false,
}) {
  const { academicProfile } = useAuth();

  if (loading || !academicProfile) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="min-h-[176px] animate-pulse rounded-2xl border border-[#252B3B] bg-[#12151F] p-6"
          >
            <div className="flex justify-between">
              <div className="h-3.5 w-24 rounded bg-white/5" />
              <div className="h-8 w-8 rounded bg-white/5" />
            </div>

            <div className="mt-6 h-8 w-16 rounded bg-white/5" />

            <div className="mt-5 h-3 w-28 rounded bg-white/5" />

            <div className="mt-6 h-1.5 w-full rounded bg-white/5" />
          </div>
        ))}
      </div>
    );
  }

  // -----------------------------
  // Academic Profile
  // -----------------------------

  const completed = academicProfile.completed || [];
  const failed = academicProfile.failed || [];
  const summary = academicProfile.summary || {};
  const credits = academicProfile.credits || {};

  // -----------------------------
  // Credits
  // -----------------------------

  const completedCredits =
    credits.completedCredits ??
    completed.reduce(
      (sum, course) => sum + (course.credits || 0),
      0
    );

  const totalCredits =
    credits.totalCredits ??
    academicProfile.curriculum?.requirements
      ?.mandatoryCredits ??
    160;

  const creditPercent =
    totalCredits > 0
      ? Math.min(
          100,
          Math.round(
            (completedCredits / totalCredits) * 100
          )
        )
      : 0;

  // -----------------------------
  // Backlogs
  // -----------------------------

  const backlogCount = failed.length;

  const priorityBacklog =
    failed.find(
      (course) => placementWeights[course.code]
    ) || failed[0];

  // -----------------------------
  // Placement Readiness
  // -----------------------------

  const placementScore = Math.min(
    100,
    completed.reduce(
      (score, course) =>
        score +
        (placementWeights[course.code] || 0),
      0
    )
  );

  const improvement =
    priorityBacklog
      ? placementWeights[priorityBacklog.code] || 0
      : 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 select-none">

      {/* Credits */}

      <div className="flex min-h-[176px] flex-col justify-between rounded-2xl border border-[#252B3B] bg-[#12151F] p-6 shadow-md shadow-black/25 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg hover:shadow-black/40">

        <div className="flex items-start justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5C6478]">
            Credits Earned
          </span>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4FD1A5]/10 text-[#4FD1A5]">
            <Award size={15} />
          </div>
        </div>

        <div>
          <div className="serif text-4xl font-medium text-[#EDEFF5]">
            {completedCredits}
          </div>

          <div className="mt-1.5 text-[12px] font-medium text-[#9098B0]">
            of {totalCredits} credits
          </div>
        </div>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#212739]">
          <div
            className="h-full rounded-full bg-[#4FD1A5]"
            style={{
              width: `${creditPercent}%`,
            }}
          />
        </div>
      </div>

      {/* Backlogs */}

      <div className="flex min-h-[176px] flex-col justify-between rounded-2xl border border-[#252B3B] bg-[#12151F] p-6 shadow-md shadow-black/25 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg hover:shadow-black/40">

        <div className="flex items-start justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5C6478]">
            Backlogs
          </span>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2A93B]/10 text-[#F2A93B]">
            <AlertTriangle size={15} />
          </div>
        </div>

        <div className="serif text-4xl font-medium text-[#EDEFF5]">
          {backlogCount}
        </div>

        <div className="mt-4">

          {priorityBacklog ? (
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#F2A93B]/20 bg-[#F2A93B]/10 px-3 py-1.5 text-xs font-medium text-[#F2A93B]">
              <AlertTriangle size={12} />
              {priorityBacklog.name}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#4FD1A5]/20 bg-[#4FD1A5]/10 px-3 py-1.5 text-xs font-medium text-[#4FD1A5]">
              No Active Backlogs 🎉
            </div>
          )}

        </div>
      </div>

      {/* Placement */}

      <div className="flex min-h-[176px] flex-col justify-between rounded-2xl border border-[#252B3B] bg-[#12151F] p-6 shadow-md shadow-black/25 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg hover:shadow-black/40">

        <div className="flex items-start justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5C6478]">
            Placement Readiness
          </span>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8B7FF2]/10 text-[#8B7FF2]">
            <Briefcase size={15} />
          </div>
        </div>

        <div className="serif text-4xl font-medium text-[#EDEFF5]">
          {placementScore}%
        </div>

        <div className="mt-4">

          <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-[#212739]">
            <div
              className="h-full rounded-full bg-[#8B7FF2]"
              style={{
                width: `${placementScore}%`,
              }}
            />
          </div>

          {priorityBacklog && improvement > 0 && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#4FD1A5]/20 bg-[#4FD1A5]/10 px-3 py-1.5 text-xs font-medium text-[#4FD1A5]">
              <TrendingUp size={12} />
              Clearing {priorityBacklog.code} could raise this by{" "}
              {improvement}%
            </div>
          )}

        </div>

      </div>
    </div>
  );
}