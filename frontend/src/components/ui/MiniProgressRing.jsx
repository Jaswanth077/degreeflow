import React from "react";
import { motion } from "framer-motion";

export default function MiniProgressRing({ percent = 0, icon, size = 58, strokeWidth = 3 }) {
  const innerR = (size - strokeWidth - 8) / 2;
  const circumference = 2 * Math.PI * innerR;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div 
      className="relative flex items-center justify-center shrink-0 select-none" 
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="absolute inset-0 transform -rotate-90">
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={innerR}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={innerR}
          stroke="var(--primary)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          strokeLinecap="round"
        />
      </svg>
      {icon && <div className="text-[var(--primary)] relative z-10">{icon}</div>}
    </div>
  );
}
