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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ---------------- VALIDATION ----------------
  const isValidEmail = /\S+@\S+\.\S+/.test(email);

  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strengthScore =
    [hasMinLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean)
      .length;

  const getStrengthLabel = () => {
    if (password.length === 0) return "";
    if (strengthScore <= 2) return "🔴 Weak password";
    if (strengthScore === 3 || strengthScore === 4)
      return "🟠 Medium strength";
    return "🟢 Strong password";
  };

  const isPasswordStrong =
    hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;

  const isPasswordMatch = password === confirmPassword;

  const isFormValid =
    isValidEmail && isPasswordStrong && isPasswordMatch;

  // ---------------- REGISTER ----------------
  const handleRegister = async () => {
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

      {/* LEFT */}
      <div className="hidden md:flex w-[65%] relative">
        <img
          src="/login-ai.jpg"
          alt="AI Interview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-[35%] items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-5">

          <h1 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h1>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-2 rounded text-center">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="bg-green-100 text-green-600 text-sm p-2 rounded text-center">
              {success}
            </div>
          )}

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-5 pr-10 py-3 border rounded-none focus:outline-none focus:ring-2 focus:ring-black transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁"}
            </button>

            {/* STRENGTH INDICATOR */}
            {password && (
              <p className="text-xs mt-1 text-gray-600">
                {getStrengthLabel()}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full pl-5 pr-10 py-3 border rounded-none focus:outline-none focus:ring-2 transition ${
                confirmPassword && !isPasswordMatch
                  ? "border-red-400 focus:ring-red-400"
                  : "focus:ring-black"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </button>

            {confirmPassword && !isPasswordMatch && (
              <p className="text-xs text-red-500 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading || !isFormValid}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium flex items-center justify-center transition
              ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : !isFormValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-700 active:scale-[0.98]"
              }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          {/* FOOTER */}
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