"use client";

import { verifyOtp, reSendOTP } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { FaShieldAlt, FaArrowRight, FaRedo } from "react-icons/fa";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await verifyOtp({ otp });

      toast.success("OTP verified successfully");

      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);

      const email = localStorage.getItem("user_email");

      if (!email) {
        toast.error("Email not found");
        return;
      }

      await reSendOTP({ email });

      toast.success("OTP resent successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="min-h-screen bg-yellow-400 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="flex justify-center mb-4">
          <img
            src="/logo.PNG"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-2xl"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Verify OTP
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Enter the code sent to your email
        </p>

        <form onSubmit={handleVerify} className="space-y-5">
          <div className="relative">
            <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="Enter OTP"
              className="w-full border p-4 pl-12 rounded-2xl text-center text-2xl tracking-[10px] text-black"
            />
          </div>

          <button
            className="w-full bg-black text-white py-4 rounded-2xl flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              "Verifying..."
            ) : (
              <>
                Verify OTP <FaArrowRight />
              </>
            )}
          </button>
        </form>

        {/* RESEND */}
        <div className="text-center mt-6">
          <button
            onClick={handleResendOtp}
            disabled={resending}
            className="flex items-center gap-2 mx-auto text-black font-semibold hover:underline"
          >
            <FaRedo />
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </main>
  );
}
