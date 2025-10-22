
import "@/styles/globals.css";
import type { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Base / OP Stack Analytics Dashboard",
  description: "Corporate analytics dashboard for Base and OP Stack chains."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="py-3 shadow-md" style={{background: "linear-gradient(90deg,#0052FF 0%,#FF0420 100%)"}}>
          <div className="container flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-white">
            <h1 className="text-xl sm:text-2xl font-bold">Base / OP Stack Analytics Dashboard</h1>
            <nav className="flex gap-4 mt-2 sm:mt-0 text-sm">
              <Link href="/base" className="hover:opacity-90">Base</Link>
              <Link href="/op" className="hover:opacity-90">OP Stack</Link>
              <Link href="/evm" className="hover:opacity-90">EVM Global</Link>
              <Link href="/frames" className="hover:opacity-90">Mini‑App</Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="text-center text-xs opacity-60 py-6">
          Built by Base / OP Stack Community · Data: Blockscout, Optimism, DefiLlama
        </footer>
      </body>
    </html>
  );
}
