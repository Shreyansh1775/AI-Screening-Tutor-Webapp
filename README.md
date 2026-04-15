# 🎓 AI Tutor Screener

### Intelligent Voice-Based AI Interview & Evaluation System

> An AI-powered screening platform that conducts tutor interviews through real voice interaction, analyzes communication skills, and generates structured hiring evaluations.

---

## 🚀 Project Overview

**AI Tutor Screener** simulates the first round of tutor interviews traditionally conducted by human interviewers.

Instead of manual screening calls, candidates interact with an **AI interviewer** that:

* asks interview questions,
* listens to spoken answers,
* evaluates teaching ability,
* analyzes behavioural signals,
* generates hiring feedback automatically.

This system demonstrates how AI can scale tutor recruitment while maintaining evaluation quality and consistency.

---

## 🎯 Problem Statement

Tutor screening at scale introduces challenges:

* High interviewer workload
* Inconsistent evaluations
* Slow candidate processing
* Difficulty assessing soft skills remotely

The goal was to design an AI system capable of performing **human-like preliminary interviews** focused on communication and teaching capability.

---

## ✨ Key Features

### 🗣️ Voice-Based AI Interview

* AI asks questions verbally
* Candidate responds using microphone
* Real-time speech transcription
* Natural conversation flow
* Manual submission control

---

### 🤖 Conversational AI Interviewer

* Context-aware questioning
* Maintains interview history
* Dynamic AI responses
* Teaching-focused evaluation prompts

---

### 🎥 Camera-Based Presence Panel

* Live webcam feed during interview
* Simulates real interviewer observation
* Foundation for:
  * confidence detection
  * facial expression analysis
  * engagement tracking

---

### 🧠 AI Evaluation Engine

After interview completion, the system generates structured feedback:

* Communication clarity
* Teaching explanation ability
* Confidence indicators
* Fluency assessment
* Behavioural observations
* Hiring recommendation

---

### 📊 Interview Progress Tracking

* Question progress indicator
* Live status monitoring
* Listening / Thinking / Speaking states

---

### 🔊 Speech Interaction System

* Speech-to-Text recognition
* Text-to-Speech AI responses
* Controlled microphone lifecycle
* Prevents speech interruption issues

---

### 🧩 Robust Interview State Management

Handles real-world edge cases:

* speech cancellation
* browser navigation
* microphone cleanup
* async audio conflicts
* partial responses

---

## 🏗️ System Architecture

<pre class="overflow-visible! px-0!" data-start="2711" data-end="2968"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>User (Voice + Camera)</span><br/><span>        │</span><br/><span>        ▼</span><br/><span>Next.js Frontend</span><br/><span>(Interview UI + Speech + Camera)</span><br/><span>        │</span><br/><span>        ▼</span><br/><span>API Routes</span><br/><span> ├── /api/interview</span><br/><span> └── /api/evaluate</span><br/><span>        │</span><br/><span>        ▼</span><br/><span>AI Model Evaluation</span><br/><span>        │</span><br/><span>        ▼</span><br/><span>Structured Interview Report</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## 🛠️ Tech Stack

### Frontend

* **Next.js (App Router)**
* **React + TypeScript**
* Tailwind CSS
* Web Speech API
* Web Camera API

### Backend

* Next.js API Routes
* Server-side AI processing
* Secure environment variables

### AI Capabilities

* Conversational reasoning
* Structured evaluation generation
* Evidence extraction from dialogue

---

## 📂 Project Structure

<pre class="overflow-visible! px-0!" data-start="3351" data-end="3618"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>ai-tutor-screener/</span><br/><span>│</span><br/><span>├── app/</span><br/><span>│   ├── api/</span><br/><span>│   │   ├── interview/</span><br/><span>│   │   └── evaluate/</span><br/><span>│   ├── interview/</span><br/><span>│   ├── report/</span><br/><span>│   └── components/</span><br/><span>│       └── CameraPanel.tsx</span><br/><span>│</span><br/><span>├── lib/</span><br/><span>│   └── speech.ts</span><br/><span>│</span><br/><span>├── public/</span><br/><span>├── .env.local</span><br/><span>├── package.json</span><br/><span>└── README.md</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

<pre class="overflow-visible! px-0!" data-start="3679" data-end="3776"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼd">git</span><span> clone https://github.com/YOUR_USERNAME/ai-tutor-screener.git</span><br/><span class="ͼd">cd</span><span> ai-tutor-screener</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

### 2️⃣ Install Dependencies

<pre class="overflow-visible! px-0!" data-start="3813" data-end="3836"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼd">npm</span><span> install</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

### 3️⃣ Configure Environment Variables

Create `.env.local`

<pre class="overflow-visible! px-0!" data-start="3905" data-end="3948"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>OPENAI_API_KEY=your_api_key_here</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

### 4️⃣ Run Development Server

<pre class="overflow-visible! px-0!" data-start="3987" data-end="4010"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span class="ͼd">npm</span><span> run dev</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

Open:

<pre class="overflow-visible! px-0!" data-start="4019" data-end="4048"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>http://localhost:3000</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## 🧑‍💻 How the Interview Works

1. AI greets candidate.
2. AI speaks interview question.
3. Microphone activates automatically.
4. Candidate answers verbally.
5. Live transcript appears.
6. Candidate clicks  **Submit Answer** .
7. AI asks next question.
8. Final evaluation report generated.

---

## 🎯 Evaluation Criteria

The AI analyzes:

* Clarity of explanation
* Teaching friendliness
* Communication structure
* Confidence level
* Student empathy
* Language fluency

---

## 🔐 Security Practices

* API keys stored server-side
* No secrets exposed to client
* Backend-only AI communication
* Production-safe environment configuration

---

## 🧪 Engineering Challenges Solved

* Synchronizing speech recognition & AI speech
* Preventing microphone conflicts
* Handling browser speech abort errors
* Managing async interview lifecycle
* Maintaining conversation context reliably

---

## 🌟 Why This Project Stands Out

✅ Voice-first interaction (not chatbot UI)

✅ Real interview simulation

✅ Behavioural evaluation focus

✅ Production-like UX

✅ Scalable hiring concept

This project demonstrates both **software engineering execution** and  **product thinking** .

---

## 🔮 Future Improvements

* Facial emotion recognition
* Eye-contact analysis
* Speech pace scoring
* Recruiter dashboard
* Candidate analytics database
* Multi-language interviews
* Adaptive questioning

---

## 📸 Demo

👉 Live Application: *(Add deployed link here)*

👉 Demo Video: *(Optional)*

---

## 👤 Author

**Shreyansh Kumar Jha**

B.Tech Engineering Graduate
