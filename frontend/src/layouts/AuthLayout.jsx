import Logo from "../components/ui/Logo";
import { motion } from "framer-motion";
import { forYouMessages } from "../constants/forYouMessages";
import { getForYouMessage } from "../utils/getForYouMessage";

export default function AuthLayout({ children }) {
  const dailyQuote = getForYouMessage(forYouMessages);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0B14] text-[#F5F3FF]">
      
      {/* Restrained Editorial Ambient Glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "-10%",
          left: "-10%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(124,92,252,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-12">
        
        <div 
          className="hidden lg:flex lg:col-span-7 xl:col-span-7 flex-col justify-center border-r border-white/5 overflow-y-auto min-h-screen"
          style={{ padding: "0 7vw" }}
        >
          
          <div style={{ position: "relative", maxWidth: 540 }}>
            
            <p
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "#9A93B8",
                marginBottom: 28,
                textTransform: "uppercase",
              }}
            >
              DegreeFlow — Academic Companion
            </p>

            <h1
              className="serif"
              style={{
                fontSize: "clamp(40px, 4.4vw, 60px)",
                lineHeight: 1.08,
                fontWeight: 500,
                color: "#F5F3FF",
                marginBottom: 22,
                letterSpacing: "-0.01em",
              }}
            >
              Finish what you started.
              <br />
              <span style={{ color: "#9A8CFF" }}>We'll keep track.</span>
            </h1>

            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "#9A93B8",
                maxWidth: 380,
                marginBottom: 56,
              }}
            >
              DegreeFlow transforms your university portal data into clear progress, smart insights, and personalized academic guidance.
            </p>

            {/* FOR YOU section replacing demo progress */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="py-6 flex flex-col items-center mx-auto lg:mx-0"
              style={{ maxWidth: 320 }}
            >
              {/* Top Divider (65-70% of quote width) */}
              <div className="w-[200px] h-[1px] bg-white/10 mb-8" />

              <div 
                className="mono text-[12px] font-medium text-slate-400 uppercase text-center mb-4"
                style={{ letterSpacing: "0.28em" }}
              >
                FOR YOU
              </div>

              <div className="text-[13px] text-[#9A93B8] italic text-center mb-6">
                Today, someone wanted you to remember—
              </div>

              <p 
                className="italic text-center text-white/90"
                style={{ fontSize: "18px", lineHeight: "1.8" }}
              >
                “{dailyQuote.text}”
              </p>

              <div className="mono text-[11px] text-slate-500 text-center mt-4">
                — DegreeFlow
              </div>

              {/* Bottom Divider (65-70% of quote width) */}
              <div className="w-[200px] h-[1px] bg-white/10 mt-8" />
            </motion.div>

          </div>

        </div>

        {/* RIGHT SIDE PANEL - Quiet Login Form */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-5 flex items-center justify-center p-8 bg-[#0E0E18]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full max-w-[420px]"
          >
            {children}
          </motion.div>
        </div>

      </div>

    </div>
  );
}
