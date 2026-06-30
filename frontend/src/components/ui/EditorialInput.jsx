import { useState } from "react";

export default function EditorialInput({
  label,
  type = "text",
  rightSlot, // pass custom JSX (e.g. SHOW/HIDE toggle) for full control
  isPassword = false,
  className = "",
  marginBottom = "22px",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={className} style={{ marginBottom }}>
      {label && (
        <label
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "#6B6489",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 8,
          }}
        >
          {label}
        </label>
      )}

      <div
        className="editorial-input-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.14)",
          transition: "border-color 0.2s ease",
        }}
      >
        <input
          type={resolvedType}
          disabled={props.disabled}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            padding: "8px 2px",
            color: "#F5F3FF",
            fontSize: 15,
            outline: "none",
            fontFamily: type === "text" && !isPassword ? "'JetBrains Mono', monospace" : "inherit",
          }}
          onFocus={(e) => {
            e.currentTarget.parentElement.style.borderBottomColor = "#7C5CFC";
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.parentElement.style.borderBottomColor = "rgba(255,255,255,0.14)";
            props.onBlur?.(e);
          }}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            disabled={props.disabled}
            className="mono"
            style={{
              background: "none",
              border: "none",
              color: "#6B6489",
              fontSize: 11,
              cursor: props.disabled ? "not-allowed" : "pointer",
              opacity: props.disabled ? 0.5 : 1,
            }}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </button>
        ) : (
          rightSlot
        )}
      </div>
    </div>
  );
}
