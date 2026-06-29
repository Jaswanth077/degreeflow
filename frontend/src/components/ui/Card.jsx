export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-2xl
        p-10
        max-w-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}