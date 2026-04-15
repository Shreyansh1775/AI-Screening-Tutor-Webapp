import { NextResponse } from "next/server";
import Report from "@/models/Reports";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // ✅ AUTH CHECK
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    const userId = payload?.userId;

    if (!userId) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const { transcript } = await req.json();

    // ✅ FORMAT TRANSCRIPT
    const formattedTranscript = transcript
      .map((msg: any) => {
        return `${msg.role === "ai" ? "Interviewer" : "Candidate"}: ${msg.text}`;
      })
      .join("\n");

    const apiKey = process.env.GROQ_API_KEY;

    // ✅ GROQ EVALUATION PROMPT
    const prompt = `
You are an expert evaluator assessing a tutor candidate.

Evaluate based on this interview transcript:

${formattedTranscript}

Evaluate on:
- Clarity
- Warmth
- Patience
- Simplicity
- Fluency

Instructions:
- Score each from 1 to 10
- Give brief explanation for each
- List strengths (2–4)
- List improvements (2–4)
- Extract exact quotes as evidence
- Give final verdict:
  Strong Candidate / Borderline / Not Recommended

Return ONLY valid JSON:

{
  "scores": {
    "clarity": number,
    "warmth": number,
    "patience": number,
    "simplicity": number,
    "fluency": number
  },
  "analysis": {
    "clarity": "text",
    "warmth": "text",
    "patience": "text",
    "simplicity": "text",
    "fluency": "text"
  },
  "strengths": [],
  "improvements": [],
  "evidence": [
    { "quote": "text", "insight": "text" }
  ],
  "finalVerdict": "text"
}
`;

    // ✅ CALL GROQ
    const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b", // ✅ SAME MODEL AS INTERVIEW (MORE RELIABLE)
      messages: [
        {
          role: "system",
          content: `
You are a STRICT JSON generator.

RULES:
- OUTPUT ONLY VALID JSON
- NO markdown
- NO explanation
- NO text before or after JSON
- DO NOT say anything except JSON
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
    }),
  }
);

    const data = await response.json();
    console.log("EVALUATION RAW RESPONSE:", data);

    let resultText =
      data?.choices?.[0]?.message?.content || "{}";

    // ✅ CLEAN MARKDOWN (MODEL SOMETIMES ADDS IT)
    resultText = resultText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(resultText);
    } catch (err) {
      console.error("JSON parse failed:", resultText);

      parsed = {
        scores: {},
        analysis: {},
        strengths: [],
        improvements: [],
        evidence: [],
        finalVerdict: "Could not evaluate properly",
      };
    }

    // ✅ SAVE REPORT TO DATABASE
    await connectDB();

    const scores = parsed.scores || {};

    const overallScore =
      Object.values(scores).reduce(
        (sum: number, val: any) => sum + Number(val || 0),
        0
      ) / (Object.keys(scores).length || 1);

    await Report.create({
      userId,
      score: overallScore,
      feedback: JSON.stringify(parsed),
      transcript: formattedTranscript,
    });

    // ✅ SEND RESULT TO FRONTEND
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Evaluation Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}