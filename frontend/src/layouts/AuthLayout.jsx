import Logo from "../components/ui/Logo";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background Glow */}
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[170px]" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[180px]" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden flex-col justify-between p-16 lg:flex">

          <Logo size="large" />

          <div>

            <h1 className="text-6xl font-bold leading-tight">
              Graduate
              <br />
              Smarter.
            </h1>

            <p className="mt-6 max-w-md text-lg text-slate-400">
              DegreeFlow helps students monitor their academic progress,
              clear backlogs, and stay placement ready.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <div className="rounded-full border border-slate-700 px-5 py-2">
                🎯 Live Portal Sync
              </div>

              <div className="rounded-full border border-slate-700 px-5 py-2">
                📈 Degree Analytics
              </div>

              <div className="rounded-full border border-slate-700 px-5 py-2">
                🤖 AI Insights
              </div>

            </div>

          </div>

          <p className="text-slate-500">
            © 2026 DegreeFlow
          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center p-8">

          {children}

        </div>

      </div>

    </div>
  );
}