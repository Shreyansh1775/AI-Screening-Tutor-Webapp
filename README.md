# **AI Tutor Screener — Project Report**

## **1. Project Overview**

**Project Title:**

**AI Tutor Screener — Intelligent Voice-Based Interview & Evaluation System**

**Selected Problem:**

**Problem 3 — The AI Tutor Screener**

This project implements an AI-powered interviewer capable of conducting structured tutor screening conversations through voice interaction and automatically evaluating candidates based on communication quality, teaching ability, and interview behaviour.

The system simulates the first round of tutor interviews traditionally conducted by human interviewers at scale. Instead of manual screening calls, candidates interact with an AI interviewer that:

* asks adaptive questions,
* listens to spoken responses,
* analyzes behavioural signals,
* evaluates teaching capability,
* generates a structured hiring recommendation.

The application is fully deployed and accessible via a public URL, meeting the core requirement of the assignment.

---

# **2. Problem Understanding**

Cuemath hires hundreds of tutors monthly. Manual screening introduces several operational challenges:

* High interviewer cost
* Limited scalability
* Inconsistent evaluation criteria
* Time delays in candidate processing
* Difficulty assessing soft skills objectively

The key insight behind this project is:

> Tutor quality depends more on **communication clarity, patience, warmth, and explanation ability** than pure subject knowledge.

Therefore, the solution focuses on  **human-centric evaluation** , not academic testing.

---

# **3. Objectives**

The system aims to:

1. Conduct natural AI-driven interviews.
2. Enable real voice interaction (not chat).
3. Evaluate soft teaching skills.
4. Analyze confidence and expression.
5. Produce structured hiring feedback.
6. Deliver a professional candidate experience.

---

# **4. System Features**

---

## **4.1 Conversational AI Interview**

The application simulates a real interview environment.

### Capabilities

* AI introduces itself professionally.
* Asks pedagogically meaningful questions.
* Maintains conversational continuity.
* Responds dynamically based on answers.
* Supports follow-up questioning.

Example prompts:

* Explain fractions to a child.
* Handle a confused student scenario.
* Describe teaching methodology.

This aligns directly with Cuemath's screening goals.

---

## **4.2 Voice Interaction System**

A core design decision was prioritizing  **speech over typing** , reflecting real tutoring conditions.

### Implemented Features

* Browser microphone capture
* Continuous speech recognition
* Real-time transcript display
* Manual **Submit Answer** control
* AI voice responses via speech synthesis

### Interview Flow

1. AI speaks question.
2. Microphone activates automatically.
3. Candidate answers naturally.
4. Transcript appears live.
5. Candidate submits when ready.

This avoids premature submission issues common in voice systems.

---

## **4.3 Intelligent Interview State Management**

The system maintains a controlled interview lifecycle:

* Speaking State
* Listening State
* Thinking/Evaluating State
* Idle/Ready State

This prevents:

* overlapping speech,
* interrupted recording,
* frozen listening sessions.

---

## **4.4 Facial Expression & Camera Evaluation (Advanced Feature)**

A live camera panel runs alongside the interview.

### Purpose

To approximate human interviewer observations such as:

* Confidence
* Eye contact
* Engagement level
* Emotional expressiveness
* Speaking comfort

### Implementation

* Browser webcam access
* Live video preview
* Real-time interview presence simulation
* Architecture ready for facial signal extraction

This feature directly enhances realism and interviewer signal quality.

---

## **4.5 Structured AI Evaluation Engine**

After completion, the interview conversation is sent to an evaluation service.

### Assessment Dimensions

The AI generates structured feedback across:

* Communication Clarity
* Teaching Simplicity
* Patience
* Warmth & Empathy
* English Fluency
* Confidence Indicators

### Output Includes

* Score breakdown
* Qualitative observations
* Supporting conversational evidence
* Hiring recommendation

This transforms subjective interviews into consistent evaluations.

---

## **4.6 Candidate Experience Design**

Special attention was given to candidate psychology.

### Design Goals

* Welcoming introduction
* Non-robotic interaction
* Clear status indicators
* Visual feedback during listening
* Reduced anxiety during speaking

Interview UX mimics a professional online assessment platform.

---

## **4.7 Progress Tracking**

The system displays:

* Current question number
* Interview completion status
* Active interaction state

This keeps candidates oriented and reduces confusion.

---

## **4.8 Error Handling & Edge Cases**

Real interview conditions are messy. The system handles:

* Interrupted audio
* Speech recognition abort events
* Navigation away and back
* Empty responses
* Partial speech capture
* Browser speech conflicts

Cleanup logic ensures microphone and speech systems reset safely.

---

## **4.9 Security Considerations**

Security was treated as a core requirement.

Implemented safeguards:

* API keys stored in server environment variables
* No credentials exposed to browser
* Backend-only AI API communication
* Secure evaluation requests
* Clean public repository compliance

The deployed application follows secure production practices.

---

# **5. Technical Architecture**

---

## **Frontend**

* Next.js App Router
* TypeScript
* React Hooks
* Web Speech API
* Web Camera API
* Tailwind CSS UI system

---

## **Backend**

* API Routes
  * `/api/interview` — conversational response generation
  * `/api/evaluate` — final assessment engine

---

## **AI Components**

* Speech-to-Text processing
* Conversational LLM reasoning
* Structured rubric evaluation
* Evidence extraction from dialogue

---

## **Deployment**

* Cloud deployed
* Publicly accessible live URL
* Production build environment

---

# **6. Key Design Decisions & Tradeoffs**

---

### Decision 1 — Voice First, Not Chat

**Why:** Tutoring happens verbally.

**Tradeoff:** Increased complexity managing speech states.

---

### Decision 2 — Manual Submit Button

**Why:** Prevents cutting off candidates mid-answer.

**Result:** Better candidate control and fairness.

---

### Decision 3 — Camera Integration

**Why:** Human interviewers judge non-verbal behaviour.

**Impact:** Moves system closer to real screening conditions.

---

### Decision 4 — Structured Evaluation Instead of Pass/Fail

**Why:** Hiring decisions need explainability.

---

### Decision 5 — Interview State Machine

**Why:** Avoid asynchronous audio bugs common in voice apps.

---

# **7. Development Process (SDLC Approach)**

The project followed a structured engineering process:

### 1. Analysis

* Studied all three problem statements.
* Selected highest impact system (Tutor Screener).

### 2. Requirement Understanding

* Identified evaluation dimensions.
* Mapped human interviewer behaviour.

### 3. System Design

* Conversation engine
* Voice pipeline
* Evaluation pipeline
* UX flow

### 4. Implementation

* Interview UI
* Speech handling
* Backend APIs
* Camera integration

### 5. Testing

* Navigation edge cases
* Speech interruptions
* Submission timing issues
* Audio lifecycle cleanup

### 6. Deployment

* Secure environment setup
* Public accessibility testing

---

# **8. Challenges Faced**

### Speech Recognition Stability

Browsers frequently abort recognition sessions.

**Solution:** Implemented controlled start/stop lifecycle.

---

### Synchronizing AI Speech & Listening

AI speaking while mic active caused conflicts.

**Solution:** Explicit speech state machine.

---

### Candidate Control

Auto-submission degraded experience.

**Solution:** Manual submission design.

---

### Navigation Errors

Returning from report page caused audio crashes.

**Solution:** Cleanup hooks on component unmount.

---

# **9. What Makes This Solution Strong**

* Real interview simulation
* Human-centric evaluation focus
* Voice-native interaction
* Behavioural assessment layer
* Professional candidate UX
* Scalable screening architecture

This is not a demo chatbot — it functions as an  **operational hiring tool prototype** .

---

# **10. Future Improvements**

With more time, the following would be added:

* Facial emotion detection scoring
* Eye-contact tracking
* Speech pace & pause analysis
* Tutor personality profiling
* Multi-question adaptive interviews
* Dashboard for hiring managers
* Candidate analytics database
* Bias monitoring system
* Multi-language support

---

# **11. Impact & Vision**

The AI Tutor Screener demonstrates how AI can:

* Reduce hiring costs
* Increase screening scale
* Improve evaluation consistency
* Deliver fairer candidate assessments
* Enhance first interaction with Cuemath

The long-term vision is an **AI-assisted hiring pipeline** where human interviewers focus only on high-potential candidates.

---

# **12. Conclusion**

This project successfully builds a deployed AI interviewer capable of conducting voice-based tutor screening aligned with Cuemath’s educational philosophy.

It combines conversational AI, voice technology, behavioural evaluation, and thoughtful UX design to create a scalable hiring solution.

The system reflects both **engineering execution** and  **product thinking** , demonstrating how AI can meaningfully augment real educational workflows.

---

If you want next, I can also generate:

✅ **2–5 minute walkthrough script** (HIGHLY IMPORTANT for selection)

✅ **Perfect README.md for GitHub**

✅ **Recruiter-impressing submission email draft**

✅ **Architecture diagram (interview-level polish)**

✅ **What Cuemath interviewers secretly look for checklist**

Just tell me.

Create a github readme for this project

Here is a **professional, recruiter-level GitHub README** specifically optimized to impress evaluators reviewing your Cuemath assignment.

You can  **copy-paste this directly into `README.md`** .

---

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
