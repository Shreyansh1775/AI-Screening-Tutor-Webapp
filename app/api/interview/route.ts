import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userAnswer, history } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    const messages = [
      {
        role: "system",
        content: `You are an AI interviewer conducting a tutor screening interview.

Flow of interview:
1. Start by asking for introduction (already done)
2. Then assess teaching ability
3. Then ask situational question
4. Then ask engagement/behavior question
5. Keep total questions ≤ 5

Rules:
- Ask ONLY one question at a time
- NEVER repeat questions
- ALWAYS ask a NEW question based on previous answer
- If answer is weak, ask follow-up
- Keep tone professional and friendly
- Keep questions short and clear

IMPORTANT:
Do NOT restart interview.
Do NOT ask for introduction again.
Continue from where conversation left off.

Respond ONLY with the next question.`,
      },
      ...history.map((msg: any) => ({
  role: msg.role === "ai" ? "assistant" : "user",
  content: msg.text,
})),
      {
        role: "user",
        content: userAnswer,
      },
    ];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages,
          temperature: 0.7,          
        }),
      }
    );

    const data = await response.json();

    console.log("GROQ RESPONSE:", data); // 🔥 debug

    const aiResponse =
  data?.choices?.[0]?.message?.content?.trim() ||
  "Can you explain that with an example?";

    return NextResponse.json({
      aiResponse,
      isFinished: false,
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}