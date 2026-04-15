"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/home");
      } else {
        alert("Invalid login");
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
          AI Screening Tutor Login
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
          onClick={handleLogin}
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
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>

        <p
          className="mt-5 text-center cursor-pointer text-blue-500 hover:underline"
          onClick={() => router.push("/register")}
        >
          Create Account
        </p>
      </div>
    </div>
  );
}