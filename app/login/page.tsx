// app/login/page.tsx

"use client";

import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await loginUser({
      email: formData.email,
      password: formData.password,
    });

    toast.success("Login successful");

    router.push("/dashboard");
  } catch (error: any) {
    console.log("LOGIN ERROR:", error);

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Invalid email or password";

    toast.error(message);
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
            alt="Spotless Logo"
            width={80}
            height={80}
            className="rounded-2xl"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-black mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-600 mb-8">Login to your account</p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* EMAIL */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
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

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                Login
                <FaArrowRight />
              </>
            )}
          </button>
        </form>
        <p
          onClick={() => router.push("/reset-password")}
          className="text-sm text-center text-gray-600 mt-4 cursor-pointer hover:underline"
        >
          Forgot Password?
        </p>
        {/* REGISTER */}
        <p className="text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="font-semibold text-black cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>
      </div>
    </main>
  );
}
