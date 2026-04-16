"use client";

import { startListening, stopListening, getCurrentTranscript } from "@/lib/speech";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CameraPanel from "../component/CameraPanel";

type Message = {
  role: "ai" | "user";
  text: string;
};

export default function InterviewPage() {
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);
  const MAX_QUESTIONS = 2;

  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");

  const [conversation, setConversation] = useState<Message[]>(([
    {
      role: "ai",
      text: "Hello! I'm your AI interviewer for today. I'll be assessing your communication and teaching approach. Let's begin — could you please introduce yourself?",
    },
  ]));

  const router = useRouter();
  const [displayInput, setDisplayInput] = useState("");
  const conversationRef = useRef<Message[]>([]);
  const questionCountRef = useRef(0);
  const statusRef = useRef<string>("idle");

  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  const setStatusSync = (s: "idle" | "listening" | "thinking" | "speaking") => {
    statusRef.current = s;
    setStatus(s);
  };

  const speakText = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      }, 150);
    });
  };

  const openMic = () => {
    setDisplayInput("");
    setStatusSync("listening");

    startListening((text: string) => {
      setDisplayInput(text);
      setStatusSync("idle");
    });
  };

  const speakThenListen = async (text: string) => {
    setStatusSync("speaking");
    await speakText(text);
    openMic();
  };

  const handleStartInterview = async () => {
    if (startedRef.current) return;

    startedRef.current = true;
    setStarted(true);

    const firstMessage = conversation[0]?.text;
    if (firstMessage) await speakThenListen(firstMessage);
  };

  useEffect(() => {
    if (status !== "listening") return;

    const interval = setInterval(() => {
      const live = getCurrentTranscript();
      if (live) setDisplayInput(live);
    }, 400);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      stopListening();
    };
  }, []);

  const handleAIResponse = async (userText: string, updatedConversation: Message[]) => {
    setStatusSync("thinking");

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAnswer: userText, history: updatedConversation }),
      });

      const data = await res.json();
      const aiText = data.aiResponse || "Can you tell me more about your teaching approach?";

      const withAI: Message[] = [
        ...updatedConversation,
        { role: "ai", text: aiText as string }
      ];

      setConversation(withAI);
      conversationRef.current = withAI;
      questionCountRef.current += 1;

      await speakThenListen(aiText);
    } catch (error) {
      console.error(error);
      setStatusSync("idle");
    }
  };

  const handleEvaluation = async (finalConversation: Message[]) => {
    setStatusSync("thinking");
    window.speechSynthesis.cancel();
    stopListening();

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: finalConversation }),
      });

      const data = await res.json();
      localStorage.setItem("evaluation", JSON.stringify(data));
      router.push("/report");
    } catch (error) {
      console.error(error);
      setStatusSync("idle");
    }
  };

  const handleSubmit = () => {
    if (statusRef.current !== "listening") return;

    stopListening();
    const text = displayInput.trim();

    if (!text) {
      setTimeout(() => openMic(), 200);
      return;
    }

    const updatedConversation: Message[] = [
      ...conversationRef.current,
      { role: "user", text: text as string }
    ];

    setConversation(updatedConversation);
    conversationRef.current = updatedConversation;

    if (questionCountRef.current >= MAX_QUESTIONS) {
      handleEvaluation(updatedConversation);
      return;
    }

    handleAIResponse(text, updatedConversation);
  };

  const handleEndInterview = () => {
    window.speechSynthesis.cancel();
    stopListening();
    handleEvaluation(conversationRef.current);
  };

  // ---------- INTRO ----------
  if (!started) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/home-bg.jpg')" }}></div>
        <div className="absolute inset-0 bg-white/25 backdrop-blur-sm"></div>

        <div className="flex flex-1 items-center justify-center relative z-10 px-4">
          <div className="max-w-xl text-center space-y-6">
            <h2 className="text-3xl font-bold text-[#0E73F6]">AI Tutor Interview</h2>

            <p className="text-[#333333]">
              This AI interview evaluates your teaching skills, communication,
              confidence, and response quality through real-time interaction.
            </p>

            <button
              onClick={handleStartInterview}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700"
            >
              🚀 Start Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- MAIN ----------
  return (
    <div className="h-screen overflow-hidden relative flex flex-col">

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/home-bg.jpg')" }}></div>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

      <div className="flex flex-1 min-h-0 overflow-hidden relative z-10">

        {/* LEFT CHAT */}
        <div className="w-3/5 p-6 overflow-y-auto min-h-0">
          <div className="space-y-5">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-5 py-3 rounded-2xl shadow ${
                  msg.role === "ai"
                    ? "bg-white/80 backdrop-blur text-gray-800"
                    : "bg-indigo-600 text-white"
                }`}>
                  <p className="text-xs mb-1 opacity-60">
                    {msg.role === "ai" ? "Interviewer" : "You"}
                  </p>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
{/* RIGHT PANEL */}
<div className="w-2/5 p-4 h-full overflow-hidden min-h-0">

  <div className="h-full grid grid-cols-2 gap-4">

    {/* ================= LEFT COLUMN (CONTROLS) ================= */}
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow flex flex-col">

      {/* Top Section */}
      <div className="space-y-3 flex-1 overflow-hidden">

        {/* Status Header */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Status</p>
          <button
            onClick={handleEndInterview}
            className="text-red-500 text-sm hover:underline"
          >
            End
          </button>
        </div>

        <p className="text-lg font-semibold">
          {status === "listening" && "🎤 Listening"}
          {status === "thinking" && "⏳ Thinking"}
          {status === "speaking" && "🔊 Speaking"}
          {status === "idle" && "Ready"}
        </p>

        {/* Visualizer */}
        <div className="flex justify-center h-16 items-end space-x-1">
          {[8, 14, 6, 10, 4].map((h, i) => (
            <div
              key={i}
              style={{ height: status === "listening" ? `${h * 2}px` : "6px" }}
              className={`w-2 bg-indigo-500 rounded ${
                status === "listening" ? "animate-pulse" : "opacity-30"
              }`}
            />
          ))}
        </div>

        {/* Progress */}
        <p className="text-sm text-gray-600">
          Question {questionCountRef.current} / {MAX_QUESTIONS}
        </p>

        {/* Transcript (fills available space but never pushes layout) */}
        <div className="p-3 bg-gray-50 rounded text-sm flex-1 overflow-hidden min-h-[120px]">
          {displayInput || (
            <span className="text-gray-400 italic">
              {status === "listening"
                ? "Speak now..."
                : status === "speaking"
                ? "AI speaking..."
                : status === "thinking"
                ? "Processing..."
                : "Waiting..."}
            </span>
          )}
        </div>

      </div>

      {/* Submit Button (ALWAYS FIXED AT BOTTOM) */}
      <div className="pt-3">
        <button
          onClick={handleSubmit}
          disabled={status !== "listening"}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-40"
        >
          {status === "listening"
            ? "Submit Answer"
            : status === "speaking"
            ? "AI Speaking..."
            : status === "thinking"
            ? "Processing..."
            : "Waiting..."}
        </button>
      </div>

    </div>

    {/* ================= RIGHT COLUMN (CAMERA) ================= */}
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow flex flex-col">

      {/* Square Camera Frame */}
      <div className="w-full aspect-square">
        <CameraPanel />
      </div>

      {/* Divider */}
      <div className="border-t my-3"></div>

      {/* AI Insight Placeholder */}
      <div className="text-sm space-y-2 text-gray-700">
        <p><span className="font-medium">Emotion Detected:</span> ?</p>
        <p><span className="font-medium">Confidence Level:</span> ?</p>
        <p><span className="font-medium">Eye Contact:</span> ?</p>
        <p><span className="font-medium">Engagement:</span> ?</p>
      </div>

    </div>

  </div>
</div>
      </div>
    </div>
  );
}