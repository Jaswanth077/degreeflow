import React from "react";
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/dashboard/Hero";
import KpiGrid from "../components/dashboard/KpiGrid";
import AcademicJourney from "../components/dashboard/AcademicJourney";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
const { academicProfile, isLoading } = useAuth();

const loading = isLoading || !academicProfile;
const isError = !loading && !academicProfile;

  return (
    <MainLayout>
      <div className="w-full">
        {/* Hero */}
        <section>
          <Hero />
        </section>

        {/* KPI Cards */}
        <section className="mt-6">
          <KpiGrid
            loading={loading}
            isError={isError}
          />
        </section>

        {/* Academic Journey */}
        <section className="mt-16">
          <AcademicJourney />
        </section>
      </div>
    </MainLayout>
  );
}