"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Validation
  const isValidEmail = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.trim().length > 0;
  const isPasswordMatch = password === confirmPassword;

  const isFormValid =
    isValidEmail && isPasswordValid && isPasswordMatch;

  const handleRegister = async () => {
    // ✅ Prevent unnecessary API call
    if (loading || !isFormValid) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setSuccess("Account created successfully 🎉");

        // slight delay for UX before redirect
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setError("Registration failed. Try a different email.");
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
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-5">
          
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h1>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-2 rounded text-center">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-100 text-green-600 text-sm p-2 rounded text-center">
              {success}
            </div>
          )}

          {/* Email */}
          <div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-5 pr-4 py-3 border rounded-none focus:outline-none focus:ring-2 transition ${
                email && !isValidEmail
                  ? "border-red-400 focus:ring-red-400"
                  : "focus:ring-black"
              }`}
            />
            {email && !isValidEmail && (
              <p className="text-xs text-red-500 mt-1">
                Enter a valid email
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-5 pr-4 py-3 border rounded-none focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full pl-5 pr-4 py-3 border rounded-none focus:outline-none focus:ring-2 transition ${
                confirmPassword && !isPasswordMatch
                  ? "border-red-400 focus:ring-red-400"
                  : "focus:ring-black"
              }`}
            />
            {confirmPassword && !isPasswordMatch && (
              <p className="text-xs text-red-500 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={handleRegister}
            disabled={loading || !isFormValid}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-all duration-150 flex items-center justify-center
            ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : !isFormValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-700 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating Account...
              </span>
            ) : (
              "Register"
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
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