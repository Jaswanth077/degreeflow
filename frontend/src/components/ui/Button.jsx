const variants = {
  primary:
    "bg-[var(--primary)] text-[#0B0B14] hover:bg-[var(--primary-hover)]",

  secondary:
    "bg-white/5 text-white hover:bg-white/10 border border-white/10",

  outline:
    "border border-white/14 bg-transparent text-white hover:border-white/30",

  danger:
    "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={`w-full h-[54px] flex items-center justify-center gap-2 rounded-[10px] px-6 font-semibold text-sm tracking-[0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}