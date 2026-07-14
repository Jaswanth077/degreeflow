import React from "react";
import { GraduationCap } from "lucide-react";
import StatCard from "./StatCard";

export default function ProgressCard({
  summary,
  isLoading = false,
  isError = false,
}) {
  const completed = summary?.completed ?? 0;
  const totalCourses = summary?.total ?? 0;
  const percent = Math.round(summary?.progress ?? 0);

  const r = 14;
  const stroke = 2.5;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const sz = 36;

  return (
    <StatCard
      title="Degree Progress"
      value={`${percent}%`}
      subtitle={`${completed} of ${totalCourses} Courses Done`}
      icon={<GraduationCap size={16} />}
      delay={0.1}
      isLoading={isLoading}
      isError={isError}
    >
      <div className="flex items-center gap-2.5 mt-1">
        <svg
          width={sz}
          height={sz}
          style={{
            transform: "rotate(-90deg)",
            flexShrink: 0,
          }}
        >
          <circle
            cx={sz / 2}
            cy={sz / 2}
            r={r}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
            fill="transparent"
          />

          <circle
            cx={sz / 2}
            cy={sz / 2}
            r={r}
            stroke="var(--primary)"
            strokeWidth={stroke}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition:
                "stroke-dashoffset 0.6s ease",
            }}
          />
        </svg>

        <span className="mono text-[11px] text-[var(--text-faint)]">
          {100 - percent}% remaining
        </span>
      </div>
    </StatCard>
  );
}