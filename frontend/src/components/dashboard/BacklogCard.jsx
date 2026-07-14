import React from "react";
import { AlertTriangle } from "lucide-react";
import StatCard from "./StatCard";

export default function BacklogCard({
  failed = [],
  isLoading = false,
  isError = false,
}) {
  const backlogCount = failed.length;

  const hasDbms = failed.some(
    (course) => course.code === "CSA05"
  );

  const highestPriority = hasDbms
    ? "Database Management Systems"
    : failed[0]?.name || "Next Course";

  const subtitle =
    backlogCount > 0
      ? "Needs Attention"
      : "No Active Backlogs 🎉";

  return (
    <StatCard
      title="Backlogs"
      value={backlogCount}
      subtitle={subtitle}
      icon={<AlertTriangle size={16} />}
      delay={0.3}
      isLoading={isLoading}
      isError={isError}
    >
      {backlogCount > 0 && (
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-warm)]/5 border border-[var(--accent-warm)]/10 px-2 py-1 text-[11px] font-mono text-[var(--accent-warm)] w-fit mt-4 select-none">
          Highest Priority: {highestPriority}
        </div>
      )}
    </StatCard>
  );
}