import React from "react";
import MainLayout from "../layouts/MainLayout";
import LedgerCard from "../components/results/LedgerCard";
import ResultsStatGrid from "../components/results/ResultsStatGrid";
import ResultsTimeline from "../components/results/ResultsTimeline";
import { useAuth } from "../context/AuthContext";
import { getAcademicSummary } from "../utils/academicMetrics";

export default function Results() {
  const { academicProfile, isLoading } = useAuth();

const loading = isLoading || !academicProfile;

const summary = getAcademicSummary(academicProfile);
  const { completedCount, totalCourses, completionPercentage } = summary;

  // Evaluate dynamic support tagline text
  let supportText = "Keep building milestones toward your degree completion.";
  if (completedCount === totalCourses && totalCourses > 0) {
    supportText = "Congratulations! You have completed all curriculum courses.";
  } else if (completionPercentage >= 50) {
    supportText = "You're over halfway through your degree.";
  }

  return (
    <MainLayout>
      <div className="flex flex-col">
        {/* Results page Hero */}
        <div>
          <span className="font-mono-label text-[var(--text-muted)] uppercase block mb-4 select-none">
            Degree progress
          </span>
          <h1 className="font-section-title text-white mb-4">
            {completedCount} of {totalCourses} courses complete
          </h1>
          <p className="font-body text-[#9098B0] mb-8 font-medium">
            {supportText}
          </p>
        </div>

        {/* Ledger blocks visual card */}
        <div className="mt-14">
          <LedgerCard completedCount={completedCount} totalCourses={totalCourses} />
        </div>

        {/* Dynamic statistics grid */}
        <div className="mt-14">
          <ResultsStatGrid loading={loading} />
        </div>

        {/* Completed course milestones listing */}
        <div className="mt-16">
          <div className="flex justify-between items-center select-none">
            <div>
              <h2 className="font-section-title text-[#F5F3FF]">
                Academic Journey
              </h2>
              <p className="font-caption text-[#5C6478] mt-1 font-medium mb-4">
                Milestones from your academic journey.
              </p>
            </div>
            <span
              tabIndex={0}
              role="button"
              aria-disabled="true"
              title="Coming soon"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") e.preventDefault();
              }}
              className="font-mono-label text-[var(--primary)] opacity-40 hover:opacity-50 focus:opacity-100 transition-opacity outline-none cursor-not-allowed select-none font-bold"
            >
              View Full Journey →
            </span>
          </div>

          <ResultsTimeline loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
}
