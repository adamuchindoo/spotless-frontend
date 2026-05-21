"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { FaTrophy, FaMedal } from "react-icons/fa";

import { getLeaderboard } from "@/services/auth";
import { getGarments } from "@/services/auth";
/* ================= TYPES ================= */

type LeaderboardUser = {
  customer__id: string;
  customer__full_name: string;
  total_points: number;
  total_orders: number;
};

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
 const [garments, setGarments] = useState<any[]>([]);

  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  /* ================= FETCH ================= */
 const fetchGarments = async () => {
    try {
      const response = await getGarments(1, 100);
      setGarments(response.data || []);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGarments();
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
        <p className="text-2xl font-bold text-black">Loading Price...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-yellow-400 p-4 md:p-8">
     

      {/* TABLE */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* TABLE HEADER */}
            <thead className="bg-black text-white">
              <tr>
                <th className="text-left p-4">#</th>

                <th className="text-left p-4">Garments</th>

                <th className="text-left p-4">Price</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {garments.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition"
                >
                  {/* POSITION */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-bold text-black">
                     #
                      {index + 1}
                    </div>
                  </td>

                  {/* FULL NAME */}
                  <td className="p-4 text-black font-semibold">
                    {item.name}
                  </td>

                  {/* POINTS */}
                  <td className="p-4 text-black font-bold">
                    &#8358;{item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {garments.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No price data found
          </div>
        )}
      </div>
    </main>
  );
}
