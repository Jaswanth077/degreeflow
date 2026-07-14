import React from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import PageContainer from "./PageContainer";

export default function AppShell({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--text)] font-sans">
      {/* Background glow animations - Restrained */}
      <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-[var(--primary)]/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-[var(--primary)]/[0.02] blur-[180px] pointer-events-none" />

      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main horizon container */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        {/* Dynamic header */}
        <TopHeader />

        {/* Auth page containers */}
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}
