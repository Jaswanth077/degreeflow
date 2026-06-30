export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-[var(--surface)] p-6 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}