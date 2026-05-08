"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { requestWithdrawal, getRecentWithdrawals } from "@/services/auth";

/* ================= TYPES ================= */

type Withdrawal = {
  id: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  amount: string;
  status: string;
  created_at: string;
};

export default function WithdrawPage() {
  /* ================= STATES ================= */

  const [form, setForm] = useState({
    bank_name: "",
    account_number: "",
  });

  const [loading, setLoading] = useState(false);

  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  const [fetching, setFetching] = useState(false);

  /* ================= PAGINATION ================= */

  const [page, setPage] = useState(1);

  const [pageSize] = useState(5);

  const [totalPages, setTotalPages] = useState(1);

  const [hasNext, setHasNext] = useState(false);

  const [hasPrevious, setHasPrevious] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchWithdrawals(page);
  }, [page]);

  const fetchWithdrawals = async (currentPage: number) => {
    try {
      setFetching(true);

      const res = await getRecentWithdrawals(currentPage, pageSize);

      setWithdrawals(res.data);

      setTotalPages(res.num_pages);

      setHasNext(res.has_next);

      setHasPrevious(res.has_previous);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch withdrawals");
    } finally {
      setFetching(false);
    }
  };

  /* ================= SUBMIT ================= */

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      await requestWithdrawal(form);

      toast.success("Withdrawal request sent");

      setForm({
        bank_name: "",
        account_number: "",
      });

      fetchWithdrawals(page);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAGINATION ================= */

  const nextPage = () => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (hasPrevious) {
      setPage((prev) => prev - 1);
    }
  };

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-yellow-400 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex items-center gap-4">
          <img
            src="/logo.PNG"
            alt="Spotless Logo"
            width={70}
            height={70}
            className="rounded-2xl"
          />

          <div>
            <h1 className="text-3xl font-bold text-black">Withdrawals</h1>

            <p className="text-gray-600">Request and track your withdrawals</p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-black">
            Withdraw Request
          </h2>

          <form onSubmit={submit} className="space-y-5">
            <input
              placeholder="Bank Name"
              className="w-full p-4 border border-gray-300 rounded-2xl text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-black"
              value={form.bank_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  bank_name: e.target.value,
                })
              }
              required
            />

            <input
              placeholder="Account Number"
              className="w-full p-4 border border-gray-300 rounded-2xl text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-black"
              value={form.account_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  account_number: e.target.value,
                })
              }
              required
            />

            <button className="w-full bg-black text-white py-4 rounded-2xl font-semibold">
              {loading ? "Processing..." : "Request Withdrawal"}
            </button>
          </form>
        </div>

        {/* RECENT WITHDRAWALS */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-6">
            Recent Withdrawals
          </h2>

          {fetching ? (
            <p className="text-black">Loading withdrawals...</p>
          ) : withdrawals.length === 0 ? (
            <p className="text-gray-500">No withdrawals found</p>
          ) : (
            <>
              <div className="space-y-4">
                {withdrawals.map((withdrawal, index) => (
                  <div
                    key={`${withdrawal.id}-${index}`}
                    className="border border-gray-200 rounded-2xl p-5"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* LEFT */}
                      <div className="space-y-2">
                        <div>
                          <p className="text-gray-500 text-sm">Bank Name</p>

                          <p className="text-black font-bold">
                            {withdrawal.bank_name}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            Account Number
                          </p>

                          <p className="text-black">
                            {withdrawal.account_number}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">Account Name</p>

                          <p className="text-black">
                            {withdrawal.account_name}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT */}
                      {/* RIGHT */}
                      <div className="flex flex-col items-start lg:items-end gap-3">
                        {/* AMOUNT */}
                        <div className="bg-yellow-200 text-black px-4 py-2 rounded-2xl font-bold">
                          ₦{withdrawal.amount}
                        </div>

                        {/* STATUS */}
                        <div
                          className={`px-4 py-2 rounded-2xl text-sm font-semibold capitalize ${
                            withdrawal.status === "pending"
                              ? "bg-orange-100 text-orange-700"
                              : withdrawal.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {withdrawal.status}
                        </div>

                        {/* DATE */}
                        <div className="text-sm text-gray-500">
                          {withdrawal.created_at}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevPage}
                  disabled={!hasPrevious}
                  className={`px-5 py-3 rounded-2xl font-semibold ${
                    hasPrevious
                      ? "bg-black text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Previous
                </button>

                <div className="bg-gray-100 px-5 py-3 rounded-2xl text-black font-bold">
                  Page {page} of {totalPages}
                </div>

                <button
                  onClick={nextPage}
                  disabled={!hasNext}
                  className={`px-5 py-3 rounded-2xl font-semibold ${
                    hasNext
                      ? "bg-black text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
