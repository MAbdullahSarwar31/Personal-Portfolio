import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chatContext";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: CHAT_SYSTEM_PROMPT,
      messages,
      temperature: 0.7,
    });

    return new Response(JSON.stringify({ message: text }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to process chat request." 
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
