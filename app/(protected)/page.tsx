"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      <h1 className="text-3xl font-semibold">
        Welcome to AI Screening Tutor
      </h1>

      <p className="text-gray-600 text-lg leading-relaxed">
        AI Screening Tutor simulates real interview experiences using
        voice interaction and AI evaluation. Practice interviews,
        improve confidence, and receive detailed performance reports
        powered by AI analysis.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Interview Card */}
        <div className="border rounded-xl p-6 shadow-sm bg-white">
          <h2 className="text-xl font-medium mb-2">Start Interview</h2>
          <p className="text-gray-600 mb-4">
            Practice AI-driven mock interviews with real-time voice
            interaction and evaluation.
          </p>

          <button
            onClick={() => router.push("/interview")}
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Go to Interview
          </button>
        </div>

        {/* Reports Card */}
        <div className="border rounded-xl p-6 shadow-sm bg-white">
          <h2 className="text-xl font-medium mb-2">View Reports</h2>
          <p className="text-gray-600 mb-4">
            Check past interview performance, scores, and AI feedback.
          </p>

          <button
            onClick={() => router.push("/report")}
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Open Reports
          </button>
        </div>
      </div>
    </div>
  );
}