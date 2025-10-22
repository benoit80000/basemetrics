
"use client";
import { useEffect, useState } from "react";
import { Table } from "@/components/Table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Cell } from "recharts";

type LlamaChain = { name: string; tvl?: number };

const COLORS = { baseBlue: "#0052FF", opRed: "#FF0420", green: "#01C853" };
const OP_CHAINS = ["Base", "OP Mainnet", "Zora", "Mode", "Fraxtal"];

export default function EvmTab() {
  const [rows, setRows] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [opCount, setOpCount] = useState<number>(0);

  async function load() {
    try {
      setErr(null);
      const r = await fetch("https://api.llama.fi/chains", { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const d = (await r.json()) as LlamaChain[];
      const evm = d.filter((c) => Number.isFinite(Number(c.tvl)));
      const top = evm.sort((a, b) => Number(b.tvl ?? 0) - Number(a.tvl ?? 0)).slice(0, 10);
      const total = top.reduce((acc, c) => acc + Number(c.tvl ?? 0), 0);
      const formatted = top.map((c) => {
        const tvl = Number(c.tvl ?? 0);
        const isOP = OP_CHAINS.includes(c.name);
        const isBase = c.name === "Base";
        const color = isBase ? COLORS.baseBlue : (isOP ? COLORS.opRed : COLORS.green);
        return { name: c.name, tvl, formatted: formatTVL(tvl), pct: total > 0 ? ((tvl / total) * 100).toFixed(1) + " %" : "0 %", color, isOP, isBase };
      });
      setOpCount(formatted.filter((c) => c.isOP).length);
      setRows(formatted);
    } catch (e: any) {
      setErr(e?.message ?? "Unknown error");
    }
  }

  function formatTVL(v: number) {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(2) + " M $";
    if (v >= 1_000) return (v / 1_000).toFixed(2) + " k $";
    return v.toFixed(0) + " $";
  }

  useEffect(() => { load(); const id = setInterval(load, 60000); return () => clearInterval(id); }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Top 10 EVM Chains by TVL ({opCount} OP Stack Chains included)</h1>
      {err && <div className="rounded-2xl bg-red-900/40 p-4">Error: {err}</div>}
      <div className="rounded-2xl bg-[#111623]/70 p-4 shadow-xl h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} layout="vertical" margin={{ left: 110, right: 40 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={160} tick={{ fill: "white", fontSize: 12 }} />
            <Tooltip formatter={(v: number) => formatTVL(v)} />
            <Bar dataKey="tvl" radius={[0, 6, 6, 0]}>
              {rows.map((entry, idx) => (<Cell key={idx} fill={entry.color} />))}
              <LabelList dataKey="formatted" position="right" style={{ fill: "white", fontSize: 12 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs opacity-70">
        Legend — <span style={{ color: COLORS.baseBlue }}>● Base</span> · <span style={{ color: COLORS.opRed }}>● Other OP chains</span> · <span style={{ color: COLORS.green }}>● Non‑OP chains</span>
      </div>
      <Table rows={rows.map((c) => ({ label: `${c.name} · ${c.pct}`, value: c.formatted, color: c.color }))} />
    </div>
  );
}
