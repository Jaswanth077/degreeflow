import React from "react";
import { motion } from "framer-motion";

export default function SplashScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0B0B14] text-[#F5F3FF] select-none overflow-hidden relative z-50 font-sans">
      {/* Ambient background glow */}
      <div 
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(124,92,252,0.06) 0%, transparent 70%)",
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="text-center space-y-4 relative z-10 flex flex-col items-center"
      >
        <h1 className="serif text-5xl font-medium tracking-wide text-[#F5F3FF]">
          DegreeFlow
        </h1>
        <p className="text-sm font-mono tracking-widest text-[#6B6489] uppercase">
          Preparing your dashboard...
        </p>
      </motion.div>
    </div>
  );
}
