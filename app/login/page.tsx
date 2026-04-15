"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/interview");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-8 border rounded">
        <h1 className="text-xl mb-4">AI Screening Tutor Login</h1>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-2 w-full"
        >
          Login
        </button>

        <p
          className="mt-4 cursor-pointer text-blue-500"
          onClick={() => router.push("/register")}
        >
          Create Account
        </p>
      </div>
    </div>
  );
}