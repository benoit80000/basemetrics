
"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Table } from "@/components/Table";

type ChainRow = { name: string; total: number | null };

type APIResponse = {
  base: { total_transactions: number; raw: any };
  opstack: { total_transactions_sum: number; per_chain: ChainRow[] };
  ratios: { base_vs_opstack: number | null };
};

export default function OpTab() {
  const [data, setData] = useState<APIResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setErr(null);
      const r = await fetch("/api/opstack", { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const d = (await r.json()) as APIResponse;
      setData(d);
    } catch (e: any) {
      setErr(e?.message ?? "Unknown error");
    }
  }

  useEffect(() => { load(); const id = setInterval(load, 10000); return () => clearInterval(id); }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">OP Stack — Aggregates & Ratio</h1>
      {err && <div className="rounded-2xl bg-red-900/40 p-4">Error: {err}</div>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Base — total transactions" value={data?.base.total_transactions} color="base" subtitle="Cumulative from Base explorer." />
        <Card title="OP Stack — total (sum)" value={data?.opstack.total_transactions_sum} color="op" subtitle="Sum across OP chains with Blockscout." />
        <Card
          title="Base share in OP Stack"
          value={data?.ratios.base_vs_opstack != null ? (data!.ratios.base_vs_opstack * 100).toFixed(1) + " %" : "—"}
          color="base"
          subtitle="Relative weight of Base among OP chains."
        />
      </div>
      <Table rows={(data?.opstack.per_chain ?? []).map((c) => ({ label: c.name, value: c.total ?? null }))} />
    </div>
  );
}
