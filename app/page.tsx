"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <h1 className="text-lg font-semibold">AI Interview Platform</h1>

        <div className="space-x-6">
          <button
            onClick={() => router.push("/")}
            className="hover:text-indigo-600"
          >
            Home
          </button>

          <button
            onClick={() => router.push("/interview")}
            className="hover:text-indigo-600"
          >
            Interview
          </button>

          <button
            onClick={() => router.push("/report")}
            className="hover:text-indigo-600"
          >
            Reports
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-2xl text-center space-y-6">

          <h2 className="text-4xl font-bold">
            Welcome to AI Screening Interview
          </h2>

          <p className="text-gray-600 text-lg">
            Practice real-time AI-powered interviews designed to evaluate
            communication skills, confidence, emotional response, and teaching
            ability just like a real interviewer.
          </p>

          <button
            onClick={() => router.push("/interview")}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700"
          >
            Start Practice Interview
          </button>

        </div>
      </div>
    </div>
  );
}