import React from "react";
import { Check } from "lucide-react";
import Badge from "../ui/Badge";

export default function ResultRow({ course, relativeTime }) {
  const grade = course.grade || "PASS";

  const getGradeBadge = () => {
    const isA = grade.startsWith("A");
    const isB = grade.startsWith("B");
    const isPass = grade.toUpperCase() === "PASS";

    if (isA) {
      return <Badge variant="success">Grade {grade}</Badge>;
    }
    if (isB) {
      return <Badge variant="primary">Grade {grade}</Badge>;
    }
    if (isPass) {
      return (
        <span className="inline-flex items-center rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#212739] text-[#9098B0] border border-white/5">
          Pass
        </span>
      );
    }
    return <Badge variant="warning">{grade}</Badge>;
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4 px-6 md:px-8 border-b border-[#252B3B] hover:bg-white/[0.01] transition-colors last:border-b-0 select-none">
      {/* Left Check Icon */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-xs p-1">
        <Check size={14} strokeWidth={3} />
      </div>

      {/* Course Title & Description */}
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-semibold text-[#EDEFF5] truncate">
          {course.name}
        </div>
        <div className="text-[11.5px] text-[#5C6478] font-medium mt-0.5">
          Course completed · earned {course.credits || 0} credits
        </div>
      </div>

      {/* Grade Badge & Time label */}
      <div className="flex items-center gap-4 shrink-0">
        {getGradeBadge()}
        <div className="text-[11px] text-[#5C6478] font-mono w-16 text-right">
          {relativeTime}
        </div>
      </div>
    </div>
  );
}
