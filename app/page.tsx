"use client";

import { useRouter } from "next/navigation";
import { getGarments } from "@/services/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [garments, setGarments] = useState<any[]>([]);

  const fetchGarments = async () => {
    try {
      const response = await getGarments(1, 100);
      setGarments(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGarments();
  }, []);

  return (
    <main className="min-h-screen bg-yellow-400 text-gray-900 scroll-smooth">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.PNG" alt="Spotless Logo" width={40} height={40} />
            <span className="font-bold text-lg">Spotless</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 font-medium">
            <a href="#referral" className="hover:text-yellow-500">
              Referral Bonus
            </a>

            <a href="#pricing" className="hover:text-yellow-500">
              Pricing
            </a>

            <a href="/leaderboard" className="hover:text-yellow-500">
              Leaderboard
            </a>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu?.classList.toggle("hidden");
            }}
          >
            ☰
          </button>

          {/* CTA Desktop */}
          <button
            onClick={() => router.push("/register")}
            className="hidden md:block bg-black text-white px-4 py-2 rounded-xl"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden px-6 pb-4 space-y-3">
          <a href="#referral" className="block">
            Referral Bonus
          </a>

          <a href="#pricing" className="block">
            Pricing
          </a>

          <a href="#contact" className="block">
            Contact
          </a>

          <button
            onClick={() => router.push("/register")}
            className="block bg-black text-white px-4 py-2 rounded-xl text-center w-full"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="flex justify-center mb-6">
          <img
            src="/big_logo.png"
            alt="Spotless Logo"
            width={220}
            height={220}
            className="rounded-xl"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Spotless Care Laundry Services
        </h1>

        <p className="text-lg md:text-xl mb-8">
          Premium laundry service for Nile & Baze University students. Fast,
          reliable, and stress-free.
        </p>

        <button
          onClick={() => router.push("/register")}
          className="bg-black text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
        >
          Get Started
        </button>
      </section>

      {/* Referral */}
      <section id="referral" className="py-16 bg-yellow-300 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">🎁 Referral Bonus</h2>

          <p className="text-lg mb-6">
            Earn 1% commission on every laundry order your referrals make.
          </p>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="mb-4">Share your link and earn unlimited income.</p>

            <button
              onClick={() => router.push("/register")}
              className="bg-black text-white px-6 py-3 rounded-2xl"
            >
              Refer a Friend
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl shadow">
            <h3 className="font-bold text-xl mb-2">Free & Fast Delivery</h3>
            <p>No delivery cost. We handle everything for you.</p>
          </div>

          <div className="p-6 rounded-2xl shadow">
            <h3 className="font-bold text-xl mb-2">Custom Duffel Bags</h3>
            <p>Premium, secure, and stylish laundry handling.</p>
          </div>

          <div className="p-6 rounded-2xl shadow">
            <h3 className="font-bold text-xl mb-2">Flexible Payment</h3>
            <p>Pay per wash or semester plan.</p>
          </div>

          <div className="p-6 rounded-2xl shadow">
            <h3 className="font-bold text-xl mb-2">Tested & Trusted</h3>
            <p>Over a year of proven service quality.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Pricing</h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Pay Per Wash */}
          <div className="bg-white p-8 rounded-2xl shadow w-full max-w-sm">
            <h3 className="font-bold text-xl mb-4">Pay Per Wash</h3>

            <p className="mb-4">Flexible option</p>

            <button
              onClick={() =>
                document
                  .getElementById("pay-per-wash")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              Choose
            </button>
          </div>

          {/* Unlimited Plan */}
          <div className="bg-black text-white p-8 rounded-2xl shadow w-full max-w-sm">
            <h3 className="font-bold text-xl mb-4">Unlimited Plan</h3>

            <p className="text-2xl font-bold mb-4">₦92,000 / semester</p>

            <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Pay Per Wash */}
      <section id="pay-per-wash" className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Pay Per Wash Pricing
          </h2>

          <div className="space-y-4">
            {garments.map((item, index) => (
              <div
                key={index}
                className="flex justify-between bg-yellow-100 p-4 rounded-xl"
              >
                <span>{item.name}</span>

                <span className="font-bold">&#8358;{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Could be you today!</h2>

        <p className="mb-6">Join students enjoying stress-free laundry.</p>

        <button
          onClick={() => router.push("/register")}
          className="bg-black text-white px-6 py-3 rounded-2xl"
        >
          Contact Us
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6">
        <p>📞 +234 916 066 0543</p>
        <p>Instagram: @spotlesscare_</p>
        <p>Free Delivery: Student Residences</p>
      </footer>
    </main>
  );
}
