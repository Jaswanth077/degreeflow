import React from "react";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "./StatCard";

export default function CreditsCard({
  credits,
  isLoading = false,
  isError = false,
}) {
  const earnedCredits = credits?.earned ?? 0;
  const totalCredits = credits?.total ?? 0;
  const creditPercent = credits?.completionPercentage ?? 0;

  return (
    <StatCard
      title="Credits Earned"
      value={`${earnedCredits}`}
      subtitle={`of ${totalCredits} Credits`}
      icon={<BookOpen size={16} />}
      delay={0.2}
      isLoading={isLoading}
      isError={isError}
    >
      <div className="w-full bg-white/5 rounded-full h-[5px] overflow-hidden mt-4 select-none">
        <motion.div
          className="bg-[var(--primary)] h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${creditPercent}%` }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
        />
      </div>
    </StatCard>
  );
}