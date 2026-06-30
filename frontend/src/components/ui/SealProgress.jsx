import { motion } from "framer-motion";

export default function SealProgress({
  percent = 0,
  radius = 88,
  strokeWidth = 3,
  ringText = "DEGREE FLOW · ACADEMIC RECORD ·",
  centerLabel = "Complete",
  centerValueSize = 38,
  showCenterLabel = true,
  className = "",
}) {
  const innerR = radius - 14;
  const circumference = 2 * Math.PI * innerR;
  const offset = circumference - (percent / 100) * circumference;
  const size = radius * 2 + 24;
  const pathId = `seal-path-${radius}-${percent}`;

  return (
    <div
      className={className}
      style={{ position: "relative", width: size, height: size }}
    >
      {/* Rotating ring text */}
      <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <path
            id={pathId}
            d={`M ${12},${size / 2} a ${size / 2 - 12},${size / 2 - 12} 0 1,1 0,0.1`}
            fill="none"
          />
        </defs>
        <g className="seal-ring-text">
          <text className="mono" fontSize="9.5" letterSpacing="2.5" fill="#8079A3">
            <textPath href={`#${pathId}`} startOffset="0%">
              {ringText} {ringText}
            </textPath>
          </text>
        </g>
      </svg>

      {/* Progress arc */}
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={innerR}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={innerR}
          stroke="#7C5CFC"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>

      {/* Center value */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className="serif"
          style={{ fontSize: centerValueSize, fontWeight: 500, color: "#F5F3FF", lineHeight: 1 }}
        >
          {percent}%
        </span>
        {showCenterLabel && (
          <span
            className="mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.15em",
              color: "#6B6489",
              marginTop: 6,
              textTransform: "uppercase",
            }}
          >
            {centerLabel}
          </span>
        )}
      </div>
    </div>
  );
}
