"use client";

import { startListening, stopListening, getCurrentTranscript } from "@/lib/speech";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CameraPanel from "../components/CameraPanel";

type Message = {
  role: "ai" | "user";
  text: string;
};

export default function InterviewPage() {
  const MAX_QUESTIONS = 2;

  const [status, setStatus] =
    useState<"idle" | "listening" | "thinking" | "speaking">("idle");

  const [conversation, setConversation] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello! I'm your AI interviewer for today. I'll be assessing your communication and teaching approach. Let's begin — could you please introduce yourself?",
    },
  ]);

  const router = useRouter();
  const [displayInput, setDisplayInput] = useState("");

  const conversationRef = useRef<Message[]>([]);
  const questionCountRef = useRef(0);
  const statusRef = useRef<string>("idle");

  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  const setStatusSync = (
    s: "idle" | "listening" | "thinking" | "speaking"
  ) => {
    statusRef.current = s;
    setStatus(s);
  };

  // ───────── SPEAK TEXT ─────────
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

  // ───────── MIC CONTROL ─────────
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

  // first AI message
  useEffect(() => {
    speakThenListen(conversation[0].text);
  }, []);

  // live transcript update
  useEffect(() => {
    if (status !== "listening") return;

    const interval = setInterval(() => {
      const live = getCurrentTranscript();
      if (live) setDisplayInput(live);
    }, 400);

    return () => clearInterval(interval);
  }, [status]);

  // cleanup
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      stopListening();
    };
  }, []);

  // ───────── AI RESPONSE ─────────
  const handleAIResponse = async (
    userText: string,
    updatedConversation: Message[]
  ) => {
    setStatusSync("thinking");

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAnswer: userText, history: updatedConversation }),
      });

      const data = await res.json();
      const aiText =
        data.aiResponse ||
        "Can you tell me more about your teaching approach?";

      const withAI = [...updatedConversation, { role: "ai", text: aiText }];
      setConversation(withAI);
      conversationRef.current = withAI;
      questionCountRef.current += 1;

      await speakThenListen(aiText);
    } catch (err) {
      console.error(err);
      setStatusSync("idle");
    }
  };

  // ───────── EVALUATION ─────────
  const handleEvaluation = async (finalConversation: Message[]) => {
    setStatusSync("thinking");
    window.speechSynthesis.cancel();
    stopListening();

    const res = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript: finalConversation }),
    });

    const data = await res.json();
    localStorage.setItem("evaluation", JSON.stringify(data));
    router.push("/report");
  };

  // ───────── SUBMIT ANSWER ─────────
  const handleSubmit = () => {
    if (statusRef.current !== "listening") return;

    stopListening();
    const text = displayInput.trim();

    if (!text) {
      setTimeout(openMic, 200);
      return;
    }

    const updatedConversation = [
      ...conversationRef.current,
      { role: "user", text },
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

  // ───────── UI ─────────
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <h1 className="text-lg font-semibold">AI Tutor Interview</h1>
        <button
          onClick={handleEndInterview}
          className="text-red-600 hover:underline"
        >
          End Interview
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT — CHAT */}
        <div className="w-3/5 p-6 overflow-y-auto space-y-6">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "ai"
                    ? "bg-white border text-gray-800"
                    : "bg-indigo-600 text-white"
                }`}
              >
                <p className="text-xs mb-1 opacity-60">
                  {msg.role === "ai" ? "Interviewer" : "You"}
                </p>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="w-2/5 border-l bg-white p-6 flex flex-col overflow-hidden">

          {/* CAMERA */}
          <div className="h-64 mb-4">
            <CameraPanel />
          </div>

          {/* CONTROLS */}
          <div className="flex-1 overflow-y-auto flex flex-col justify-between">

            {/* STATUS */}
            <div>
              <h2 className="text-sm text-gray-500 mb-2">Status</h2>
              <p className="text-lg font-medium">
                {status === "listening" && "🎤 Listening..."}
                {status === "thinking" && "⏳ Processing..."}
                {status === "speaking" && "🔊 AI Speaking..."}
                {status === "idle" && "✅ Ready"}
              </p>
            </div>

            {/* PROGRESS + INPUT */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <p className="font-medium">
                  Question {questionCountRef.current} of {MAX_QUESTIONS}
                </p>
              </div>

              <div className="p-3 border rounded bg-gray-50 text-sm min-h-[60px]">
                {displayInput || (
                  <span className="text-gray-400 italic">
                    {status === "listening"
                      ? "Speak now — your words appear here..."
                      : status === "speaking"
                      ? "AI is speaking..."
                      : status === "thinking"
                      ? "Processing..."
                      : "—"}
                  </span>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={status !== "listening"}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-40"
              >
                {status === "listening"
                  ? "✅ Done — Submit Answer"
                  : "Waiting..."}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}