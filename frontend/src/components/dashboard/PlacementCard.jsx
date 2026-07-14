import React from "react";
import { Briefcase } from "lucide-react";
import StatCard from "./StatCard";

export default function PlacementCard({
  placement,
  isLoading = false,
  isError = false,
}) {
  const score = placement?.score ?? 0;
  const subtitle =
    placement?.subtitle ?? "Needs Attention";
  const hasDbms = placement?.hasDbms ?? false;

  return (
    <StatCard
      title="Placement Readiness"
      value={`${score}%`}
      subtitle={subtitle}
      icon={<Briefcase size={16} />}
      delay={0.4}
      isLoading={isLoading}
      isError={isError}
    >
      {!hasDbms && (
        <div className="mt-4 select-none">
          <span className="inline-block rounded border border-[var(--accent-warm)]/10 bg-[var(--accent-warm)]/5 px-2 py-1 text-[11px] font-mono text-[var(--accent-warm)]">
            +15% by clearing DBMS
          </span>
        </div>
      )}
    </StatCard>
  );
}