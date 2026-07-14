import React from "react";

export default function LedgerCard({ completedCount = 0, totalCourses = 35 }) {
  const percent = totalCourses > 0 ? Math.round((completedCount / totalCourses) * 100) : 0;
  const remainingCount = totalCourses - completedCount;

  return (
    <div className="bg-[#12151F] border border-[#252B3B] rounded-2xl p-8 flex flex-col lg:flex-row gap-10 items-stretch lg:items-center min-h-[176px] w-full select-none shadow-md shadow-black/25 transition-all duration-200 hover:border-white/20 hover:shadow-lg hover:shadow-black/40">
      {/* Left statistics figures */}
      <div className="flex-shrink-0 text-left min-w-[150px] flex flex-col justify-center">
        <div className="serif text-5xl font-semibold leading-none text-[#8B7FF2]">
          {percent}%
        </div>
        <div className="text-xs text-[#9098B0] mt-3 font-semibold">
          of your degree cleared
        </div>
        <div className="text-[10px] text-[#5C6478] font-mono mt-1 uppercase tracking-wider">
          {remainingCount} courses remaining
        </div>
      </div>

      {/* Right blocks strip indicator */}
      <div className="flex-1 flex flex-col justify-center w-full">
        {/* Ledger blocks row */}
        <div className="flex gap-[3px] h-[42px] mb-2.5 w-full flex-wrap sm:flex-nowrap">
          {Array.from({ length: totalCourses }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm min-w-[4px] h-full ${i < completedCount ? "bg-[#8B7FF2]" : "bg-[#212739]"}`}
            />
          ))}
        </div>
        
        {/* Strip metadata markers */}
        <div className="flex justify-between text-[11px] text-[#5C6478] font-mono select-none">
          <span>Course 1</span>
          <span>Course {totalCourses}</span>
        </div>

        {/* Swatches Legend */}
        <div className="flex gap-4 mt-4 select-none">
          <div className="flex items-center gap-2 text-xs text-[#9098B0] font-medium">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#8B7FF2]" />
            Completed
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9098B0] font-medium">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#212739]" />
            Remaining
          </div>
        </div>
      </div>
    </div>
  );
}
