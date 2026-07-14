import React from "react";

export default function PageContainer({ children, className = "" }) {
  return (
    <main className={`flex-1 overflow-y-auto bg-[var(--bg)] pt-12 px-8 pb-12 ${className}`}>
      <div className="mx-auto max-w-[1600px] w-full animate-fade-up">
        {children}
      </div>
    </main>
  );
}
