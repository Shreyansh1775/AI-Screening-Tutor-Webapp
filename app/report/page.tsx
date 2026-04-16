"use client";

import { useEffect, useState } from "react";

export default function ReportPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("evaluation");

      if (stored) {
        const parsed = JSON.parse(stored);
        console.log("Loaded evaluation:", parsed);
        setData(parsed);
      }
    } catch (err) {
      console.error("Failed to parse evaluation:", err);
    }
  }, []);

  // 🚨 HARD GUARD
  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading report...</p>
      </div>
    );
  }

  // SAFE ACCESS
  const scores = data?.scores || {};
  const analysis = data?.analysis || {};
  const strengths = data?.strengths || [];
  const improvements = data?.improvements || [];
  const evidence = data?.evidence || [];
  const finalVerdict = data?.finalVerdict || "N/A";

  return (
    <div className="min-h-screen relative">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/home-bg.jpg')" }}
      ></div>

      {/* White Blur Overlay */}
      <div className="absolute inset-0 bg-white/25 backdrop-blur-sm"></div>

      {/* Page Content */}
      <div className="relative z-10 p-6">

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-6">
          <h1 className="text-2xl font-semibold mb-2">Interview Report</h1>
          <p className="text-gray-600">
            Final Verdict:{" "}
            <span className="font-medium text-indigo-600">
              {finalVerdict}
            </span>
          </p>
        </div>

        {/* Scores */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 mb-6">
          {Object.keys(scores).length === 0 ? (
            <p>No scores available</p>
          ) : (
            Object.entries(scores).map(([key, value]: any) => (
              <div key={key} className="bg-white p-4 rounded shadow">
                <p className="text-sm text-gray-500 capitalize">{key}</p>
                <p className="text-xl font-semibold">{value}/10</p>
              </div>
            ))
          )}
        </div>

        {/* Analysis */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow mb-6">
          <h2 className="font-semibold mb-3">Detailed Analysis</h2>
          {Object.keys(analysis).length === 0 ? (
            <p>No analysis available</p>
          ) : (
            Object.entries(analysis).map(([key, value]: any) => (
              <p key={key} className="mb-2">
                <span className="font-medium capitalize">{key}: </span>
                {value}
              </p>
            ))
          )}
        </div>

        {/* Strengths */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow mb-6">
          <h2 className="font-semibold mb-3">Strengths</h2>
          {strengths.length === 0 ? (
            <p>No strengths available</p>
          ) : (
            <ul className="list-disc pl-5">
              {strengths.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Improvements */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow mb-6">
          <h2 className="font-semibold mb-3">Areas of Improvement</h2>
          {improvements.length === 0 ? (
            <p>No improvements available</p>
          ) : (
            <ul className="list-disc pl-5">
              {improvements.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Evidence */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-3">Evidence</h2>
          {evidence.length === 0 ? (
            <p>No evidence available</p>
          ) : (
            evidence.map((e: any, i: number) => (
              <div key={i} className="mb-3">
                <p className="italic text-gray-700">"{e.quote}"</p>
                <p className="text-sm text-gray-500">{e.insight}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}