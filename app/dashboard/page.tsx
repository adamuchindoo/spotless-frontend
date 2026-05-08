"use client";

import { useEffect, useState } from "react";

import {
  FaWallet,
  FaUsers,
  FaMoneyBillWave,
  FaHashtag,
  FaCopy,
  FaArrowRight,
} from "react-icons/fa";

import { getReferralProfile } from "@/services/auth";

import toast from "react-hot-toast";

/* ================= TYPES ================= */

type DashboardData = {
  code: string;
  ref_balance: string;
  total_earned: string;
  total_ref: number;
};

type CardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

type ActionCardProps = {
  title: string;
  desc: string;
};

export default function DashboardHome() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getReferralProfile();

      setData(res.data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load dashboard");
    }
  };

  const referralLink = data?.code
    ? `https://spotlesscare.com.ng/register?ref=${data.code}`
    : "";

  return (
    <main className="space-y-6">
      {/* HERO */}
      <div className="bg-black text-white rounded-3xl p-8 overflow-hidden relative">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Spotless Dashboard
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            Manage your referrals, earnings, withdrawals, and laundry orders in
            one place.
          </p>

          <button className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
            Start Referring
            <FaArrowRight />
          </button>
        </div>

        {/* LOGO */}
        <img
          src="/logo.PNG"
          alt="Logo"
          className="absolute right-6 bottom-6 w-28 opacity-20"
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card
          title="Referral Code"
          value={data?.code || "----"}
          icon={<FaHashtag />}
        />

        <Card
          title="Referral Balance"
          value={`₦${data?.ref_balance || "0.00"}`}
          icon={<FaWallet />}
        />

        <Card
          title="Total Earned"
          value={`₦${data?.total_earned || "0.00"}`}
          icon={<FaMoneyBillWave />}
        />

        <Card
          title="Total Referrals"
          value={data?.total_ref || 0}
          icon={<FaUsers />}
        />
      </div>

      {/* REFERRAL LINK */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-black mb-4">
          Your Referral Link
        </h2>

        <div className="bg-gray-100 rounded-2xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-black break-all">{referralLink}</p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(referralLink);

              toast.success("Referral link copied");
            }}
            className="bg-black text-white px-5 py-3 rounded-2xl flex items-center gap-2"
          >
            <FaCopy />
            Copy Link
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-5">
        <ActionCard
          title="Withdraw Earnings"
          desc="Request your referral earnings directly to your bank account."
        />

        <ActionCard
          title="Track Orders"
          desc="Monitor all laundry orders and update their status."
        />

        <ActionCard
          title="Invite Friends"
          desc="Share your referral code and earn commissions continuously."
        />
      </div>

      {/* BONUS */}
      <div className="bg-yellow-300 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-black mb-3">
          Earn More With Referrals 🎉
        </h2>

        <p className="text-black text-lg max-w-3xl">
          Every time someone signs up using your referral code and places
          laundry orders, you continue earning commissions with no limit.
        </p>
      </div>
    </main>
  );
}

/* ================= CARD ================= */

function Card({ title, value, icon }: CardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-500 font-medium">{title}</p>

        <div className="text-2xl text-black">{icon}</div>
      </div>

      <p className="text-3xl font-bold text-black break-all">{value}</p>
    </div>
  );
}

/* ================= ACTION CARD ================= */

function ActionCard({ title, desc }: ActionCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:scale-[1.02] transition">
      <h3 className="text-xl font-bold text-black mb-3">{title}</h3>

      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
