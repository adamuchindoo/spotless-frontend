"use client";

import { registerUser } from "@/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaGift,
} from "react-icons/fa";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    full_name: "",
    address: "",
    phone_number: "",
    referral_code: "",
  });

  /* ================= AUTO FILL REF ================= */

  useEffect(() => {
    const ref = searchParams.get("ref");

    if (ref) {
      setFormData((prev) => ({
        ...prev,
        referral_code: ref,
      }));
    }
  }, [searchParams]);

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

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await registerUser(formData);

      toast.success("Account created successfully");

      router.push("/verify-otp");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-yellow-400 text-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.PNG"
            alt="Logo"
            width={70}
            height={70}
            className="rounded-xl"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

        <p className="text-center text-gray-600 mb-8">Register your account</p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FULL NAME */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-3 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-3 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* PHONE */}
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-3 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* ADDRESS */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-3 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* REFERRAL CODE */}
          <div className="relative">
            <FaGift className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              name="referral_code"
              placeholder="Referral Code (Optional)"
              value={formData.referral_code}
              onChange={handleChange}
              readOnly={!!searchParams.get("ref")}
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-3 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
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
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-3 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
              required
            />
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
              className="w-full border border-gray-300 bg-white text-black placeholder:text-gray-500 p-3 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* LOGIN */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
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
