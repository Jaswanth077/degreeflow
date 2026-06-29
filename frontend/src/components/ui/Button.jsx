const variants = {
  primary:
    "bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/30",

  secondary:
    "bg-slate-800 text-white hover:bg-slate-700",

  outline:
    "border border-slate-700 bg-transparent hover:bg-slate-800",

  danger:
    "bg-red-500 hover:bg-red-600 text-white",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        w-full
        flex items-center justify-center gap-2
        rounded-2xl
        px-6 py-3
        font-semibold
        transition-all duration-300
        hover:scale-[1.02]
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}