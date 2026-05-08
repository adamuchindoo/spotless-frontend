"use client";

import { useState } from "react";

import Link from "next/link";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaTrophy,
  FaBoxOpen,
  FaWallet,
} from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="min-h-screen bg-yellow-400">
      {/* NAVBAR */}
      <div className="bg-white shadow sticky top-0 z-50">
        <div className="p-4 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img src="/logo.PNG" alt="Logo" className="w-10 h-10 rounded-xl" />

            <h1 className="font-bold text-black text-lg">Spotless Dashboard</h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-6 text-black font-medium items-center">
            <Link
              href="/dashboard"
              className="hover:text-yellow-600 transition"
            >
              Home
            </Link>

            <Link
              href="/leaderboard"
              className="hover:text-yellow-600 transition"
            >
              Leaderboard
            </Link>

            <Link
              href="/dashboard/orders"
              className="hover:text-yellow-600 transition"
            >
              Orders
            </Link>

            <Link
              href="/dashboard/withdraw"
              className="hover:text-yellow-600 transition"
            >
              Withdraw
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden text-black text-2xl"
          >
            {openMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {openMenu && (
          <div className="md:hidden px-4 pb-4">
            <div className="bg-yellow-100 rounded-2xl p-4 flex flex-col gap-4">
              <Link
                href="/dashboard"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 text-black font-medium hover:bg-white p-3 rounded-xl transition"
              >
                <FaHome />
                Home
              </Link>

              <Link
                href="/leaderboard"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 text-black font-medium hover:bg-white p-3 rounded-xl transition"
              >
                <FaTrophy />
                Leaderboard
              </Link>

              <Link
                href="/dashboard/orders"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 text-black font-medium hover:bg-white p-3 rounded-xl transition"
              >
                <FaBoxOpen />
                Orders
              </Link>

              <Link
                href="/dashboard/withdraw"
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 text-black font-medium hover:bg-white p-3 rounded-xl transition"
              >
                <FaWallet />
                Withdraw
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* PAGE CONTENT */}
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}
