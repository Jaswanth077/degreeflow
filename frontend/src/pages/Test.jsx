import FeatureCard from "../components/ui/FeatureCard";
import {
  Brain,
  BarChart3,
  RefreshCcw,
} from "lucide-react";

export default function Test() {
  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">

        <FeatureCard
          icon={<RefreshCcw size={24} />}
          title="Live Portal Sync"
          description="Automatically sync your latest academic records from the university portal."
        />

        <FeatureCard
          icon={<Brain size={24} />}
          title="AI Academic Insights"
          description="Receive personalized recommendations based on your academic progress."
        />

        <FeatureCard
          icon={<BarChart3 size={24} />}
          title="Degree Progress"
          description="Understand exactly how far you've come and what's left to complete."
        />

      </div>
    </div>
  );
}