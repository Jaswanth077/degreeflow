import React from "react";
import { motion } from "framer-motion";
import { Route } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import JourneyCard from "./JourneyCard";
import JourneyItem from "./JourneyItem";
import { buildJourneyTimeline } from "../../utils/buildJourneyTimeline";

export default function AcademicJourney() {
  const { academicProfile, isLoading } = useAuth();

  const {
    groupedEvents = {},
    footerMessage = "",
  } = buildJourneyTimeline(academicProfile);

  // Month groups returned by buildJourneyTimeline()
  const monthGroups = Object.entries(groupedEvents);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="w-full"
    >
      <JourneyCard footerMessage={footerMessage}>
        {/* Loading */}
        {isLoading ? (
          <div className="space-y-5 py-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex gap-4"
              >
                <div className="h-8 w-8 rounded-full bg-white/5 animate-pulse shrink-0" />

                <div className="flex-1 space-y-2 animate-pulse">
                  <div className="h-3 w-20 rounded bg-white/5" />
                  <div className="h-4 w-52 rounded bg-white/5" />
                  <div className="h-3 w-36 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : monthGroups.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-[var(--text-faint)]">
              <Route size={20} />
            </div>

            <h3 className="serif mt-4 text-base font-medium text-[#F5F3FF]">
              Your academic journey starts here.
            </h3>

            <p className="mt-2 max-w-xs text-xs leading-relaxed text-[var(--text-muted)]">
              As your results are published, your academic history will appear here automatically.
            </p>
          </div>
        ) : (
          /* Timeline */
          <div className="py-2">
            {monthGroups.map(([month, events]) => (
              <div key={month}>
                {/* Month Header */}
                <div className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-faint)] mt-6 mb-4 first:mt-0">
                  {month}
                </div>

                {events.map((event, index) => (
                  <JourneyItem
                    key={event.id}
                    item={event}
                    isLast={index === events.length - 1}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </JourneyCard>
    </motion.section>
  );
}