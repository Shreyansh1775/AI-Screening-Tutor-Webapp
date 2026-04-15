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
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 border rounded-xl shadow-md bg-white w-[350px]">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h1>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-2 rounded text-white transition-all duration-300
          ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
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
          className="mt-5 text-center text-sm text-gray-600"
        >
          Already registered?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Go to login page here
          </span>
        </p>
      </div>
    </div>
  );
}