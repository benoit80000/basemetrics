
export function Card({ title, value, color, subtitle }: { title: string; value?: number | string | null; color?: "base" | "op"; subtitle?: string }) {
  const colorClass = color === "op" ? "text-[#FF0420]" : "text-[#0052FF]";
  return (
    <div className="rounded-2xl bg-[#111623]/70 p-4 shadow-xl">
      <div className="text-xl font-semibold text-white">{title}</div>
      <div className={`text-3xl md:text-4xl font-mono font-extrabold tabular-nums mt-1 ${colorClass}`}>
        {value != null ? (typeof value === "number" ? value.toLocaleString() : value) : "—"}
      </div>
      {subtitle && <div className="text-sm opacity-70 mt-1">{subtitle}</div>}
    </div>
  );
}
