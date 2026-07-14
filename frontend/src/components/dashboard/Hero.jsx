import React from "react";
import { useAuth } from "../../context/AuthContext";
import { getGreeting } from "../../utils/getGreeting";

export default function Hero() {
  const { student } = useAuth();
  const firstName = student?.name?.split(" ")[0] || "Student";

  return (
    <div className="animate-fade-up select-none max-w-3xl py-7">
      <p className="mono text-[13px]
tracking-[0.24em]
text-[var(--text-faint)]
uppercase
text-[var(--text-faint)] uppercase mb-5">
        {getGreeting()}, {firstName} 👋
      </p>
      <h1 className="serif text-4xl font-medium leading-tight  tracking-tight mb-3">
        Let's check your progress.
      </h1>
    </div>
  );
}
