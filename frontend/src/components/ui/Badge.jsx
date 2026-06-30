export default function Badge({ children, variant = "primary", className = "" }) {
  const variants = {
    primary: "bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)]",
    success: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400",
    warning: "bg-[var(--accent-warm)]/10 border border-[var(--accent-warm)]/20 text-[var(--accent-warm)]",
    danger: "bg-red-500/10 border border-red-500/20 text-red-400",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-lg px-2.5 py-0.5 
        text-[10px] font-bold uppercase tracking-wider
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
