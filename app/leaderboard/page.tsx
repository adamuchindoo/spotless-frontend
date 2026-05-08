"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrophy } from "react-icons/fa";

const BASE_URL = "https://api.spotlesscare.com.ng";

type LeaderboardUser = {
  username: string;
  point: number;
};

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/referral/leaderboard`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to load leaderboard");
      }

      setData(result.data || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-400">
        <p className="text-black font-bold text-xl">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-yellow-400 p-6">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow mb-6 flex items-center gap-3">
        <FaTrophy className="text-3xl text-black" />

        <div>
          <h1 className="text-2xl font-bold text-black">Top 10 Leaderboard</h1>
          <p className="text-gray-600">Users ranked by referral points</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4">Position</th>
              <th className="p-4">Username</th>
              <th className="p-4">Points</th>
            </tr>
          </thead>

          <tbody>
            {data.slice(0, 10).map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition">
                {/* POSITION */}
                <td className="p-4 font-bold text-black">#{index + 1}</td>

                {/* USERNAME */}
                <td className="p-4 text-black">{user.username}</td>

                {/* POINTS */}
                <td className="p-4 font-bold text-black">{user.point}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY STATE */}
        {data.length === 0 && (
          <p className="text-center p-6 text-gray-500">
            No leaderboard data found
          </p>
        )}
      </div>
    </main>
  );
}
