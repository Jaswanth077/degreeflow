import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EditorialInput from "../ui/EditorialInput";
import Button from "../ui/Button";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState("Continue");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registerNumber.trim()) {
      return toast.error("Please enter your Register Number.");
    }
    if (!password) {
      return toast.error("Please enter your password.");
    }

    setLocalLoading(true);
    setLoadingStepText("Authenticating...");
    await sleep(600);
    setLoadingStepText("Connecting to University Portal...");
    await sleep(750);
    setLoadingStepText("Fetching Academic Records...");
    await sleep(750);
    setLoadingStepText("Preparing Dashboard...");
    await sleep(600);
    setLoadingStepText("Welcome 👋");
    await sleep(400);

    const toastId = toast.loading("Syncing with university portal...");
    
    const result = await login(registerNumber, password);
    setLocalLoading(false);

    if (result.success) {
      if (result.mode === "mock") {
        toast.success("Welcome, Jaswanth G! (Demo Mode)", { id: toastId });
      } else if (result.mode === "fallback") {
        toast.success(`Demo mode activated. (Portal issue: ${result.message})`, {
          id: toastId,
          duration: 4000,
        });
      } else {
        toast.success("University portal synced successfully!", { id: toastId });
      }
      navigate("/dashboard");
    } else {
      toast.error(result.message || "Failed to authenticate.", { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto animate-fade-up">
      
      {/* Header greetings */}
      <div>
        <h2 
          className="serif text-3xl font-medium text-[#F5F3FF]"
          style={{ marginBottom: "12px" }}
        >
          Welcome back
        </h2>
        <p 
          className="text-sm text-[#6B6489]"
          style={{ marginBottom: "24px" }}
        >
          Sign in to continue your academic journey.
        </p>
      </div>

      {/* Actual Form */}
      <form onSubmit={handleSubmit} className="w-full">
        
        {/* Register Number Input */}
        <div>
          <EditorialInput
            label="Register Number"
            type="text"
            placeholder="21CS1042"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            disabled={isLoading || localLoading}
            marginBottom="20px"
          />
          {registerNumber === "12345678" && (
            <div className="animate-fade-up flex items-center gap-1.5 text-[10px] font-extrabold text-[#7C5CFC] bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 px-2 py-0.5 rounded-md w-fit mono uppercase tracking-wider mb-4">
              ✨ Demo Mode Active
            </div>
          )}
        </div>

        {/* Password Input (32px margin bottom) */}
        <EditorialInput
          label="Password"
          isPassword={true}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading || localLoading}
          marginBottom="32px"
        />

        {/* Action Button */}
        <Button type="submit" variant="primary" disabled={isLoading || localLoading}>
          {localLoading ? loadingStepText : (isLoading ? "Portal Syncing..." : "Continue")}
        </Button>

      </form>

      {/* Footer system details */}
      <div className="flex justify-between items-center text-[12px] h-8" style={{ marginTop: "20px" }}>
        <a href="#" className="text-[#6B6489] transition-opacity duration-200 cursor-pointer opacity-55 hover:opacity-90 select-none">
          Forgot password?
        </a>
        <span className="mono text-[10px] tracking-[0.05em] text-[#6B6489] uppercase opacity-55 select-none">
          Encrypted
        </span>
      </div>

    </div>
  );
}
