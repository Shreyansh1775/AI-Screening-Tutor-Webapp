"use client";

import { startListening, stopListening, getCurrentTranscript } from "@/lib/speech";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
type Message = {
  role: "ai" | "user";
  text: string;
};

export default function InterviewPage() {
  const startedRef = useRef(false);
  const MAX_QUESTIONS = 2;
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello! I'm your AI interviewer for today. I'll be assessing your communication and teaching approach. Let's begin — could you please introduce yourself?",
    },
  ]);

  const router = useRouter();
  const [displayInput, setDisplayInput] = useState(""); // only for display
  const conversationRef = useRef<Message[]>([]);
  const questionCountRef = useRef(0);
  const statusRef = useRef<string>("idle");

  // keep refs in sync
  useEffect(() => {
    conversationRef.current = conversation;
  }, [conversation]);

  const setStatusSync = (s: "idle" | "listening" | "thinking" | "speaking") => {
    statusRef.current = s;
    setStatus(s);
  };

  // ─── speak text, returns promise that resolves when done ───
  const speakText = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      window.speechSynthesis.cancel();

      // small delay after cancel to avoid browser glitch
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve(); // resolve even on error so flow continues
        window.speechSynthesis.speak(utterance);
      }, 150);
    });
  };

  // ─── open mic ───
  const openMic = () => {
    setDisplayInput("");
    setStatusSync("listening");

    startListening((text: string) => {
      // fires when stopListening() is called
      setDisplayInput(text);
      setStatusSync("idle");
    });
  };

  // ─── speak then open mic ───
  const speakThenListen = async (text: string) => {
    setStatusSync("speaking");
    await speakText(text);
    openMic();
  };

  // ─── on mount: speak first message then open mic ───

// ✅ FIXED intro effect (speaks then opens mic)
useEffect(() => {
  if (startedRef.current) return;

  startedRef.current = true;

  const firstMessage = conversation[0]?.text;

  if (firstMessage) {
    speakThenListen(firstMessage);
  }
}, []);

  // ─── update display while mic is open ───
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
    // cleanup when leaving page
    window.speechSynthesis.cancel();
    stopListening();
  };
}, []);

  // ─── AI response ───
  const handleAIResponse = async (userText: string, updatedConversation: Message[]) => {
    setStatusSync("thinking");

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAnswer: userText,
          history: updatedConversation,
        }),
      });

      const data = await res.json();
      const aiText = data.aiResponse || "Can you tell me more about your teaching approach?";

      const withAI: Message[] = [...updatedConversation, { role: "ai", text: aiText }];
      setConversation(withAI);
      conversationRef.current = withAI;
      questionCountRef.current += 1;

      await speakThenListen(aiText);
    } catch (error) {
      console.error("Frontend Error:", error);
      setStatusSync("idle");
    }
  };

  // ─── evaluation ───
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
      console.error("Evaluation error:", error);
      setStatusSync("idle");
    }
  };

  // ─── submit ───
  const handleSubmit = () => {
    if (statusRef.current !== "listening") return;

    // grab transcript directly from module-level var — always fresh
    stopListening();
    const text = displayInput.trim();

    if (!text) {
      // nothing captured, reopen mic
      setTimeout(() => openMic(), 200);
      return;
    }

    setDisplayInput(text);

    const updatedConversation: Message[] = [
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

  // ─── end interview manually ───
  const handleEndInterview = () => {
    window.speechSynthesis.cancel();
    stopListening();
    handleEvaluation(conversationRef.current);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <h1 className="text-lg font-semibold">AI Tutor Interview</h1>
        <button
          onClick={handleEndInterview}
          className="text-red-600 hover:underline"
        >
          End Interview
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Conversation */}
        <div className="w-3/5 p-6 overflow-y-auto">
          <div className="space-y-6">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                    msg.role === "ai"
                      ? "bg-white border border-gray-200 text-gray-800"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  <p className="text-xs font-medium mb-1 opacity-60">
                    {msg.role === "ai" ? "Interviewer" : "You"}
                  </p>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-2/5 border-l bg-white p-6 flex flex-col justify-between">
                          
          {/* Status */}
          <div>
            <h2 className="text-sm text-gray-500 mb-2">Status</h2>
            <p className="text-lg font-medium">
              {status === "listening" && "🎤 Listening..."}
              {status === "thinking" && "⏳ Processing..."}
              {status === "speaking" && "🔊 AI Speaking..."}
              {status === "idle" && "✅ Ready"}
            </p>
          </div>

        
          {/* Voice Visualizer */}
          <div className="flex items-center justify-center h-40">
            <div className="flex space-x-1 items-end">
              {[8, 14, 6, 10, 4].map((h, i) => (
                <div
                  key={i}
                  style={{ height: status === "listening" ? `${h * 4}px` : "8px" }}
                  className={`w-2 bg-indigo-500 rounded transition-all duration-300 ${
                    status === "listening" ? "animate-pulse" : "opacity-30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="space-y-4">
            {/* Progress */}
            <div>
              <p className="text-sm text-gray-500">Progress</p>
              <p className="font-medium">
                Question {questionCountRef.current} of {MAX_QUESTIONS}
              </p>
            </div>

            {/* Live transcript display */}
            <div className="p-3 border rounded bg-gray-50 text-sm text-gray-700 min-h-[60px]">
              {displayInput || (
                <span className="text-gray-400 italic">
                  {status === "listening"
                    ? "Speak now — your words appear here..."
                    : status === "speaking"
                    ? "AI is speaking, please wait..."
                    : status === "thinking"
                    ? "Processing your answer..."
                    : "—"}
                </span>
              )}
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={status !== "listening"}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-40 disabled:cursor-not-allowed font-medium"
            >
              {status === "listening"
                ? "✅ Done — Submit Answer"
                : status === "speaking"
                ? "🔊 AI is speaking..."
                : status === "thinking"
                ? "⏳ Processing..."
                : "Waiting..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}