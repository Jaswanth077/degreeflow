import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#020617] text-white p-6">
      <div className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-6 max-w-md">
        <h1 className="text-9xl font-extrabold tracking-widest text-indigo-500">
          404
        </h1>
        <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs uppercase tracking-widest text-indigo-400 font-bold rounded-full inline-block">
          Page Not Found
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track with your degree progress.
        </p>
        <div className="pt-4">
          <Link to="/dashboard">
            <Button variant="primary">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}