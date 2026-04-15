"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
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