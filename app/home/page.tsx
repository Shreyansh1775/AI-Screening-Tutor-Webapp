"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col relative">

    {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/home-bg.jpg')" }}
        ></div>


      {/* White Blur Overlay */}
        <div className="absolute inset-0 bg-white/25 backdrop-blur-sm"></div>



      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center relative z-10 px-4">
        <div className="max-w-2xl text-center space-y-6">

          <h2 className="text-4xl font-bold text-[#0E73F6]">
            Welcome to AI Screening Interview
          </h2>

          <p className="text-[#333333] text-lg">
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