import { GoogleGenerativeAI } from "@google/generative-ai";
import { ragContext } from "@/lib/portfolio-data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { message, history, lang } = await request.json() as {
      message: string;
      history: Array<{ role: string; content: string }>;
      lang?: string;
    };

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const langInstruction = lang === "es"
      ? "\n\nIMPORTANT: The user's interface is set to Spanish. ALWAYS respond in Spanish regardless of what language the user writes in."
      : "\n\nIMPORTANT: The user's interface is set to English. ALWAYS respond in English regardless of what language the user writes in.";

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: ragContext + langInstruction,
    });

    // Map history to Gemini format (role must be "user" or "model")
    const geminiHistory = (history ?? []).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history: geminiHistory });

    const result = await chat.sendMessageStream(message);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[chat/route] Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
