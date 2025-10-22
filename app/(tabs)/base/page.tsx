
"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Table } from "@/components/Table";

type Stats = {
  total_transactions?: string | number;
  transactions_today?: string | number;
  avg_block_time?: string | number;
  total_addresses?: string | number;
  total_blocks?: string | number;
  total_contracts?: string | number;
  transactions_24h?: string | number;
  transactions_1w?: string | number;
  avg_gas_price?: string | number;
};

export default function BaseTab() {
  const [data, setData] = useState<Stats | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setErr(null);
      const r = await fetch("https://base.blockscout.com/api/v2/stats", { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const d = await r.json();
      setData(d);
    } catch (e: any) {
      setErr(e?.message ?? "Unknown error");
    }
  }

  useEffect(() => { load(); const id = setInterval(load, 10000); return () => clearInterval(id); }, []);

  const rows = [
    { label: "Total blocks", value: normalize(data?.total_blocks) },
    { label: "Contracts", value: normalize(data?.total_contracts) },
    { label: "Tx 24h", value: normalize(data?.transactions_24h) },
    { label: "Tx 7d", value: normalize(data?.transactions_1w) },
    { label: "Avg gas price", value: normalize(data?.avg_gas_price) }
  ];

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Base — Key Indicators (Blockscout API)</h1>
      {err && <div className="rounded-2xl bg-red-900/40 p-4">Error: {err}</div>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total transactions" value={normalize(data?.total_transactions)} color="base" subtitle="Cumulative transactions on Base." />
        <Card title="Transactions today" value={normalize(data?.transactions_today)} color="base" subtitle="Since 00:00 UTC." />
        <Card title="Avg block time (s)" value={normalize(data?.avg_block_time)} color="base" subtitle="Block production pace." />
        <Card title="Total addresses" value={normalize(data?.total_addresses)} color="base" subtitle="Unique observed addresses." />
      </div>
      <Table rows={rows} />
    </div>
  );
}

function normalize(v: any) {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : String(v);
}
