import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    const formattedTranscript = transcript
      .map((msg: any) => {
        return `${msg.role === "ai" ? "Interviewer" : "Candidate"}: ${msg.text}`;
      })
      .join("\n");

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

Return ONLY valid JSON in this format:

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
  "strengths": ["point1"],
  "improvements": ["point1"],
  "evidence": [
    {
      "quote": "text",
      "insight": "text"
    }
  ],
  "finalVerdict": "text"
}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
                role: "system",
                content: "You must respond ONLY in valid JSON. No markdown, no explanation.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.3,
           response_format: { type: "json_object" },
        }),
      }
    );

    const data = await response.json();

let resultText = data?.choices?.[0]?.message?.content || "{}";

// 🔥 CLEAN MARKDOWN (KEY FIX)
resultText = resultText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let parsed;

try {
  parsed = JSON.parse(resultText);
} catch (err) {
  console.error("JSON parse failed:", resultText);

  // fallback minimal structure
  parsed = {
    scores: {},
    analysis: {},
    strengths: [],
    improvements: [],
    evidence: [],
    finalVerdict: "Could not evaluate properly",
  };
}

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Evaluation Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}