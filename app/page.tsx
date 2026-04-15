"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-xl px-6">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">
          AI Tutor Interview
        </h1>
        <p className="text-gray-600 mb-8">
          A short voice-based screening to assess your teaching and communication skills.
        </p>
        <button
          onClick={() => router.push("/interview")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 transition"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}