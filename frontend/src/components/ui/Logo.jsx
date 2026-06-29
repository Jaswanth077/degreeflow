import { GraduationCap } from "lucide-react";

export default function Logo({ size = "default" }) {
  const titleClass =
    size === "large" ? "text-4xl" : "text-2xl";

  const subtitleClass =
    size === "large" ? "text-base" : "text-sm";

  const iconSize =
    size === "large" ? "h-8 w-8" : "h-6 w-6";

  return (
    <div className="flex items-center gap-4">
      <div
        className="
          flex h-14 w-14 items-center justify-center
          rounded-2xl
          bg-gradient-to-br
          from-indigo-500
          via-violet-500
          to-purple-600
          shadow-lg shadow-indigo-500/30
        "
      >
        <GraduationCap className={`${iconSize} text-white`} />
      </div>

      <div>
        <h1
          className={`
            ${titleClass}
            font-bold
            tracking-tight
          `}
        >
          DegreeFlow
        </h1>

        <p className={`text-slate-400 ${subtitleClass}`}>
          Your Academic Companion
        </p>
      </div>
    </div>
  );
}