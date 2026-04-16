"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        alert("Account created successfully");
        router.push("/login"); // keeps auto redirect
      } else {
        alert("Registration failed");
        setLoading(false);
      }
    } catch (error) {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL (IMAGE) */}
        <div className="hidden md:flex w-[65%] relative">
          <img
            src="/login-ai.jpg"
            alt="AI Interview"
            className="w-full h-full object-cover"
          />
        </div>


      {/* RIGHT PANEL ( REGISTER CARD ) */}
      <div className="flex w-full md:w-[35%] items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <input
          placeholder="Email"
          className="w-full pl-5 pr-4 py-3 border border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-black transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full pl-5 pr-4 py-3 border border-gray-700 rounded-none focus:outline-none focus:ring-2 focus:ring-black transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-150 flex items-center justify-center
          ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-700 active:scale-[0.98]"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Creating Account...
            </span>
          ) : (
            "Register"
          )}
        </button>

        {/* NEW SAFETY LINK */}
        <p
          className="mt-5 text-center text-sm text-gray-500"
        >
          Already registered?{" "}
          <span
            onClick={() => router.push("/login")}
            className="font-medium text-blue-600 cursor-pointer hover:underline"
          >
            Go to login page here
          </span>
        </p>
      </div>
    </div>
    </div>
  );
}