"use client";

import { useEffect, useState } from "react";

import {
  FaWallet,
  FaUsers,
  FaMoneyBillWave,
  FaHashtag,
  FaCopy,
  FaArrowRight,
  FaTimes,
  FaShareAlt,
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

/* ================= SHARE MODAL ================= */

function ShareModal({
  open,
  onClose,
  url,
}: {
  open: boolean;
  onClose: () => void;
  url: string;
}) {
  if (!open) return null;

  const text = `Join me on Spotless Care and start earning: ${url}`;

  const shareWhatsApp = () => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const shareEmail = () => {
    const subject = encodeURIComponent("Join Spotless Care");
    const body = encodeURIComponent(text);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Referral link copied");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-2 text-gray-800">Share & Start Referring</h2>
        <p className="text-gray-600 mb-6">
          Invite friends and earn rewards 🚀
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={shareWhatsApp}
            className="bg-green-500 text-white p-3 rounded-xl font-semibold"
          >
            Share on WhatsApp
          </button>

          <button
            onClick={shareEmail}
            className="bg-blue-500 text-white p-3 rounded-xl font-semibold"
          >
            Share via Email
          </button>

          <button
            onClick={copyLink}
            className="bg-black text-white p-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <FaCopy />
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

export default function DashboardHome() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [openShare, setOpenShare] = useState(false);

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
            Welcome to your Spotless Care Dashboard
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            Manage your referrals, earnings, withdrawals, and laundry orders in one place.
          </p>

          {/* START REFERRING BUTTON */}
          <button
            onClick={() => setOpenShare(true)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
          >
            Start Referring
            <FaArrowRight />
          </button>
        </div>
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

      {/* MODAL */}
      <ShareModal
        open={openShare}
        onClose={() => setOpenShare(false)}
        url={referralLink}
      />
    </main>
  );
}

/* ================= CARD ================= */

function Card({ title, value, icon }: any) {
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