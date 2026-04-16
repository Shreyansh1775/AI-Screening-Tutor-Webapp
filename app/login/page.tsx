"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 👁 password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Validation
  const isValidEmail = /\S+@\S+\.\S+/.test(email);
  const isFormValid = isValidEmail && password.trim().length > 0;

  const handleLogin = async () => {
    if (loading || !isFormValid) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/home");
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-[65%] relative">
        <img
          src="/login-ai.jpg"
          alt="AI Interview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full md:w-[35%] items-center justify-center bg-gray-50 px-6">
        
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Login to continue your interview journey
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md text-center">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className={`w-full px-5 py-3 border rounded-none focus:outline-none focus:ring-2 transition ${
                email && !isValidEmail
                  ? "border-red-400 focus:ring-red-400"
                  : "focus:ring-black"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {email && !isValidEmail && (
              <p className="text-xs text-red-500">
                Enter a valid email address
              </p>
            )}
          </div>

          {/* Password WITH EYE ICON */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-5 py-3 pr-10 border rounded-none focus:outline-none focus:ring-2 focus:ring-black transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading || !isFormValid}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : !isFormValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-700 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          {/* Footer */}
          <p
            className="text-center text-sm text-gray-500 cursor-pointer hover:text-black transition"
            onClick={() => router.push("/register")}
          >
            Don’t have an account?{" "}
            <span className="font-medium text-blue-600 hover:underline">
              Sign up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}