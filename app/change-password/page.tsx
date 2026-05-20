"use client";

import { changePassword } from "@/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { FaLock, FaKey, FaArrowRight } from "react-icons/fa";

export default function ChangePasswordPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    otp: "",
    password: "",
    confirm_password: "",
  });

  /* ================= PASSWORD VALIDATION ================= */

  const passwordRules = {
    minLength: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  const strength = Object.values(passwordRules).filter(Boolean).length;

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Password does not meet requirements");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        otp: Number(formData.otp),
        password: formData.password,
        confirm_password: formData.confirm_password,
      });

      toast.success("Password changed successfully");

      router.push("/login");
    } catch (error: any) {
      console.log(error);

      toast.error(error.message || "Failed to change password");
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
          Change Password
        </h1>

        <p className="text-center text-gray-600 mb-2">
          Enter OTP and new password
        </p>

        {email && (
          <p className="text-center text-sm text-gray-500 mb-6">{email}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* OTP */}
          <div className="relative">
            <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="number"
              name="otp"
              placeholder="OTP Code"
              value={formData.otp}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* PASSWORD REQUIREMENTS */}
          <div className="text-sm space-y-1 mt-2 ml-1">
            <p
              className={
                passwordRules.minLength ? "text-green-600" : "text-red-500"
              }
            >
              • At least 8 characters
            </p>

            <p
              className={
                passwordRules.uppercase ? "text-green-600" : "text-red-500"
              }
            >
              • One uppercase letter
            </p>

            <p
              className={
                passwordRules.lowercase ? "text-green-600" : "text-red-500"
              }
            >
              • One lowercase letter
            </p>

            <p
              className={
                passwordRules.number ? "text-green-600" : "text-red-500"
              }
            >
              • One number
            </p>

            <p
              className={
                passwordRules.special ? "text-green-600" : "text-red-500"
              }
            >
              • One special character
            </p>

            {/* STRENGTH BAR */}
            <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  strength <= 2
                    ? "bg-red-500 w-1/3"
                    : strength <= 4
                      ? "bg-yellow-500 w-2/3"
                      : "bg-green-500 w-full"
                }`}
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-4 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? (
              "Updating..."
            ) : (
              <>
                Change Password
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
