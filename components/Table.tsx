
export function Table({ rows }: { rows: { label: string; value: string | number | null; color?: string }[] }) {
  return (
    <div className="rounded-2xl bg-[#111623]/70 p-4 shadow-xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400">
            <th className="py-2 pr-4">Indicator</th>
            <th className="py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-slate-800/70">
              <td className="py-2 pr-4 flex items-center gap-2">
                {r.color && <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />}
                {r.label}
              </td>
              <td className="py-2 tabular-nums">{r.value ?? "n/a"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
