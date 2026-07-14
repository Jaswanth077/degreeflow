import React from "react";
import { useAuth } from "../../context/AuthContext";
import ProgressCard from "./ProgressCard";
import CreditsCard from "./CreditsCard";
import BacklogCard from "./BacklogCard";
import PlacementCard from "./PlacementCard";

export default function KpiGrid({
  loading = false,
  isError = false,
}) {
  const { academicProfile } = useAuth();

  const summary = academicProfile?.summary;
  const credits = academicProfile?.credits;
  const placement = academicProfile?.placement;

  const completed = academicProfile?.completed || [];
  const failed = academicProfile?.failed || [];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <ProgressCard
        summary={summary}
        isLoading={loading}
        isError={isError}
      />

      <CreditsCard
  credits={credits}
  isLoading={loading}
  isError={isError}
/>

      <BacklogCard
        failed={failed}
        isLoading={loading}
        isError={isError}
      />

      <PlacementCard
  placement={placement}
  isLoading={loading}
  isError={isError}
/>
    </div>
  );
}