export default function Input({
  label,
  icon,
  rightIcon,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">
        {label}
      </label>

      <div
        className="
          flex items-center
          rounded-2xl
          border border-slate-700
          bg-slate-900/60
          px-4 py-4
          transition-all
          duration-300
          focus-within:border-indigo-500
          focus-within:ring-2
          focus-within:ring-indigo-500/30
        "
      >
        {icon && (
          <div className="mr-3 text-slate-400">
            {icon}
          </div>
        )}

        <input
          className={`
            w-full
            bg-transparent
            outline-none
            placeholder:text-slate-500
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="ml-3 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
