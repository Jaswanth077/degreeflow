export default function Input({
  label,
  icon,
  rightIcon,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2.5">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </label>

      <div
        className="
          flex items-center
          rounded-2xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          px-4.5
          h-[52px]
          transition-all
          duration-300
          focus-within:border-indigo-500
          focus-within:ring-2
          focus-within:ring-indigo-500/30
          has-[:disabled]:opacity-50
          has-[:disabled]:cursor-not-allowed
        "
      >
        {icon && (
          <div className="mr-3.5 text-indigo-400">
            {icon}
          </div>
        )}

        <input
          className={`
            w-full
            bg-transparent
            outline-none
            text-sm
            placeholder:text-slate-400
            text-white
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="ml-3.5 text-slate-500">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
