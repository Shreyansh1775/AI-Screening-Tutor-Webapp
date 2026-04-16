# 🚀 AI Interview Screener — Intelligent Voice-Based Interview Platform

An AI-powered **real-time interview simulation platform** that evaluates candidates through  **voice interaction, conversational AI, and behavioral analysis** . The system mimics a real interview environment where users speak naturally while an AI interviewer dynamically responds, analyzes, and evaluates performance.

---

## 📌 Key Highlights

* 🎤 Real-time **voice-based AI interview system**
* 🧠 Dynamic **LLM-powered question generation**
* 🗣 Speech-to-text + text-to-speech conversational loop
* 📊 Automated **candidate evaluation system**
* 🎥 Integrated **live camera module for behavioral tracking**
* 🔐 Secure authentication with session-based login system
* ⚡ Full-stack production-ready architecture (Next.js + Node.js + MongoDB)

---

## 🧱 Tech Stack

### 🖥 Frontend

* **Next.js (App Router)**
* **React.js**
* **TypeScript**
* **Tailwind CSS**
* Web Speech API (SpeechRecognition + SpeechSynthesis)

### ⚙ Backend

* **Node.js**
* **Next.js API Routes**
* **Express-style API architecture (within Next.js)**
* REST APIs

### 🗄 Database

* **MongoDB**
* **Mongoose ODM**
* GridFS (for future media storage support)

### 🔐 Authentication & Security

* Session-based authentication
* `express-session` + secure cookie handling
* Protected routes using middleware
* Input validation to prevent unnecessary DB calls

---

## 🧠 Core Features

### 🎤 AI Interview Engine

* Conversational interview flow
* AI generates contextual follow-up questions
* Maintains conversation history for contextual understanding

### 🗣 Voice Interaction System

* Real-time speech recognition
* Continuous transcript streaming
* AI voice responses using speech synthesis
* Natural interview-like flow

### 📹 Camera Integration Module

* Live webcam feed during interview
* UI-ready emotion/behavior analysis panel (extensible)
* Square 1:1 responsive camera frame
* Designed for future ML-based expression detection

### 📊 Evaluation System

* AI-generated performance evaluation
* Stores full transcript history
* Produces structured feedback report
* Saves results to MongoDB for future retrieval

### 🔐 Authentication System

* Secure login/register flow
* Email format validation
* Password strength validation
* Prevention of unnecessary API calls (frontend validation layer)

### 🧭 UX / UI Enhancements

* Responsive split-panel layout
* Real-time interview status indicators:
  * Listening 🎤
  * Thinking 🧠
  * Speaking 🔊
* Clean dashboard-like interface
* Background blur + modern UI card system

---

## 🏗 System Architecture

<pre class="overflow-visible! px-0!" data-start="2893" data-end="3101"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>User (Browser)</span><br/><span>   ↓</span><br/><span>Next.js Frontend (React UI + Voice Engine)</span><br/><span>   ↓</span><br/><span>API Routes (Next.js Backend Layer)</span><br/><span>   ↓</span><br/><span>AI Interview Engine (Question Generation Logic)</span><br/><span>   ↓</span><br/><span>MongoDB (User + Interview Data Storage)</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## 📂 Project Structure

<pre class="overflow-visible! px-0!" data-start="3133" data-end="3445"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"></div><div class="relative"><div class="pe-11 pt-3"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼ5 ͼj"><div class="cm-scroller"><div class="cm-content q9tKkq_readonly"><span>app/</span><br/><span> ├── (protected)/</span><br/><span> │    ├── interview/</span><br/><span> │    ├── component/</span><br/><span> │    │     ├── CameraPanel.tsx</span><br/><span> │</span><br/><span> ├── login/</span><br/><span> ├── register/</span><br/><span> ├── home/</span><br/><span> ├── report/</span><br/><span> ├── api/</span><br/><span> │    ├── auth/</span><br/><span> │    ├── interview/</span><br/><span> │    ├── evaluate/</span><br/><br/><span>lib/</span><br/><span> ├── speech.ts</span><br/><span> ├── mongodb.ts</span><br/><span> ├── auth.ts</span><br/><br/><span>models/</span><br/><span> ├── User.ts</span><br/><span> ├── Report.ts</span></div></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

## 🔄 Interview Flow

1. User logs in / registers
2. Enters interview dashboard
3. AI starts interview with greeting question
4. User responds via voice
5. Speech is converted to text in real-time
6. AI processes response and generates next question
7. Loop continues for defined number of questions
8. Final evaluation is generated
9. Report stored and displayed

---

## 🧪 Input Validation & Optimization

* Email format validation using regex
* Password strength enforcement
* Prevents empty API requests
* Button disabled until valid form state
* Reduces unnecessary MongoDB traffic

---

## 🎯 Performance Considerations

* Optimized React state management using `useRef` for stable references
* Reduced re-renders during speech streaming
* Controlled API calls based on interview state
* Lazy speech processing for smooth UX

---

## 🔐 Security Considerations

* Protected interview routes via middleware
* Session-based authentication (no token leakage)
* Server-side validation for auth endpoints
* Input sanitization before database operations
* No direct frontend DB access

---

## 📈 Future Enhancements

* 🎭 Emotion detection via webcam (ML integration)
* 📊 Advanced analytics dashboard
* 🧠 Multi-model AI interviewer support
* 📁 Resume-based adaptive questioning
* 🌐 Multi-language interview support
* 📡 Real-time interview monitoring panel for admins

---

## 🖼 UI Design Philosophy

* Minimalistic interview environment
* Focus on user speaking experience
* Dual-panel layout:
  * Left: Conversation stream
  * Right: Control + Camera + Insights
* Designed to simulate real interview pressure

---

## 👨‍💻 Author

**Shreyansh Kumar Jha**

AI Interview Screener Project

Built for recruitment evaluation and technical assessment

---

## 📜 License

This project is intended for educational and evaluation purposes.
