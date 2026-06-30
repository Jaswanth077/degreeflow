export default function AvatarStack({ count = 3, size = "sm", className = "" }) {
  const sizeStyles = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const users = [
    { name: "Alex Kumar", bg: "bg-indigo-500", text: "AK" },
    { name: "Sophia R", bg: "bg-violet-500", text: "SR" },
    { name: "Jaswanth G", bg: "bg-emerald-500", text: "JG" },
    { name: "Nikhil T", bg: "bg-amber-500", text: "NT" },
  ];

  return (
    <div className={`flex -space-x-3 overflow-hidden ${className}`}>
      {users.slice(0, count).map((user, i) => (
        <div
          key={i}
          className={`
            inline-flex items-center justify-center
            rounded-full border-2 border-slate-950
            font-bold text-white
            ${user.bg}
            ${sizeStyles[size] || sizeStyles.sm}
          `}
          title={user.name}
        >
          {user.text}
        </div>
      ))}
      {users.length > count && (
        <div
          className={`
            inline-flex items-center justify-center
            rounded-full border-2 border-slate-950
            bg-slate-800 font-bold text-xs text-slate-300
            ${sizeStyles[size] || sizeStyles.sm}
          `}
        >
          +{users.length - count}
        </div>
      )}
    </div>
  );
}
