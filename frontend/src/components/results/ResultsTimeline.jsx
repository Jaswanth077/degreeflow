import React from "react";
import { useAuth } from "../../context/AuthContext";
import ResultRow from "./ResultRow";
import { getAcademicSummary } from "../../utils/academicMetrics";

export default function ResultsTimeline({
  loading = false,
}) {
  const { academicProfile } = useAuth();

  if (loading || !academicProfile) {
    return (
      <div className="min-h-[300px] overflow-hidden rounded-2xl border border-[#252B3B] bg-[#12151F] animate-pulse">
        <div className="m-6 h-4 w-24 rounded bg-white/5" />

        <div className="divide-y divide-[#252B3B]">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 p-6"
            >
              <div className="h-8 w-8 shrink-0 rounded bg-white/5" />

              <div className="flex-1 space-y-2">
                <div className="h-3 w-40 rounded bg-white/5" />
                <div className="h-2 w-24 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const summary = getAcademicSummary(academicProfile);

  const completed =
    summary.completedCourses ||
    academicProfile.completed ||
    [];

  const footerMessage =
    summary.footerMessage ||
    "Keep progressing through your academic journey.";

  // Newest first
  const timeline = [...completed].reverse();

  const recent = timeline.slice(0, 4);
  const earlier = timeline.slice(4);

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-[#252B3B] bg-[#12151F] shadow-md shadow-black/25">

      {/* Recent */}

      {recent.length > 0 && (
        <>
          <div className="border-b border-[#252B3B] bg-white/[0.01] px-8 py-3 font-mono-label uppercase text-[#5C6478]">
            Recent Achievements
          </div>

          <div className="divide-y divide-[#252B3B]">
            {recent.map((course, index) => (
              <ResultRow
                key={course.code}
                course={course}
                relativeTime={`${index + 1} week ago`}
              />
            ))}
          </div>
        </>
      )}

      {/* Earlier */}

      {earlier.length > 0 && (
        <>
          <div className="border-y border-[#252B3B] bg-white/[0.01] px-8 py-3 font-mono-label uppercase text-[#5C6478]">
            Earlier
          </div>

          <div className="divide-y divide-[#252B3B]">
            {earlier.map((course, index) => (
              <ResultRow
                key={course.code}
                course={course}
                relativeTime={`${index + 2} months ago`}
              />
            ))}
          </div>
        </>
      )}

      {completed.length === 0 && (
        <div className="p-10 text-center text-[#5C6478]">
          No completed courses found.
        </div>
      )}

      <div className="border-t border-[#252B3B] bg-white/[0.01] px-8 py-4 font-mono-label text-[#5C6478]">
        {footerMessage}
      </div>
    </div>
  );
}