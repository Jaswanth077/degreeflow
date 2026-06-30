export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div
      className="
      group
      rounded-3xl
      border border-white/10
      bg-slate-900/60
      p-5
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-indigo-500/40
      hover:bg-slate-900
      hover:shadow-xl
      hover:shadow-indigo-500/10
      "
    >
      <div
        className="
        mb-4
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        bg-indigo-500/10
        text-indigo-400
        transition-transform
        duration-300
        group-hover:scale-110
        "
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {description}
      </p>
    </div>
  );
}