"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { FaTrophy, FaMedal } from "react-icons/fa";

import { getLeaderboard } from "@/services/auth";

/* ================= TYPES ================= */

type LeaderboardUser = {
  customer__id: string;
  customer__full_name: string;
  total_points: number;
  total_orders: number;
};

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      const response = await getLeaderboard();

      setUsers(response || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-yellow-400 flex items-center justify-center">
        <p className="text-2xl font-bold text-black">Loading leaderboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-yellow-400 p-4 md:p-8">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="bg-white rounded-3xl shadow-xl p-6 flex items-center gap-4">
          <div className="bg-black text-white p-4 rounded-2xl">
            <FaTrophy className="text-3xl" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-black">Top Leaderboard</h1>

            <p className="text-gray-600">Top users ranked by points</p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* TABLE HEADER */}
            <thead className="bg-black text-white">
              <tr>
                <th className="text-left p-4">Position</th>

                <th className="text-left p-4">Full Name</th>

                <th className="text-left p-4">Points</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.customer__id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  {/* POSITION */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-bold text-black">
                      {index < 3 && <FaMedal className="text-yellow-500" />}#
                      {index + 1}
                    </div>
                  </td>

                  {/* FULL NAME */}
                  <td className="p-4 text-black font-semibold">
                    {user.customer__full_name}
                  </td>

                  {/* POINTS */}
                  <td className="p-4 text-black font-bold">
                    {user.total_points.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {users.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No leaderboard data found
          </div>
        )}
      </div>
    </main>
  );
}
