"use client";

import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-yellow-400">
      {/* NAVBAR */}
      <div className="bg-white p-4 flex justify-between items-center shadow">
        <div className="flex items-center gap-3">
          <img src="/logo.PNG" className="w-10 h-10" />
          <h1 className="font-bold text-black">Spotless Dashboard</h1>
        </div>

        <div className="flex gap-4 text-black font-medium">
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/withdraw">Withdraw</Link>
          <Link href="/dashboard/orders">Orders</Link>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="p-6">{children}</div>
    </div>
  );
}
