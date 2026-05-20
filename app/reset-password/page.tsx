"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { FaEnvelope, FaArrowRight } from "react-icons/fa";

import { resetPassword } from "@/services/auth";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await resetPassword(email);

      toast.success("OTP sent successfully");

      router.push(`/change-password?email=${email}`);
    } catch (error: any) {
      console.log(error);

      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-yellow-400 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-black">
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.PNG"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-2xl"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-black mb-2">
          Reset Password
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Enter your email address
        </p>

        {/* FORM */}
        <form onSubmit={handleReset} className="space-y-5">
          {/* EMAIL */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                Send OTP
                <FaArrowRight />
              </>
            )}
          </button>
        </form>

        {/* BACK */}
        <p className="text-center text-gray-600 mt-6">
          Back to{" "}
          <span
            onClick={() => router.push("/login")}
            className="font-semibold text-black cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </main>
  );
}
