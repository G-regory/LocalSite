/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { INITIAL_SYSTEM_PROMPT } from "@/lib/prompts";

async function callOpenRouter(messages: any[], model: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  console.log("[BACKEND] Using OpenRouter API Key:", apiKey ? `sk...${apiKey.slice(-4)}` : "NOT FOUND");
  const baseUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
  const endpoint = "/chat/completions";

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || process.env.OPENROUTER_MODEL,
      messages,
      stream: false, // NO STREAMING
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("[BACKEND] OpenRouter API Error:", errorBody);
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, provider, model, html } = body;
    console.log(`[BACKEND] Received request. Provider: ${provider}, Model: ${model}`);

    if (!model || !prompt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const messages = [
      { role: "system", content: INITIAL_SYSTEM_PROMPT },
      { role: "user", content: html ? `Here is my current HTML code:\\n\\n\\`\\`\\`html\\n${html}\\n\\`\\`\\`\\n\\nNow, please create a new design based on this HTML and my prompt: ${prompt}` : prompt },
    ];

    if (provider === "openrouter") {
      console.log("[BACKEND] Calling OpenRouter (non-streaming)...");
      const openRouterResponse = await callOpenRouter(messages, model);
      const content = openRouterResponse.choices?.[0]?.message?.content || "";
      console.log("[BACKEND] Received content from OpenRouter.");
      return NextResponse.json({ ok: true, html: content });
    } else {
      // The PUT request logic can be removed or adapted if needed, for now we focus on POST
      return NextResponse.json({ error: `Provider ${provider} not supported` }, { status: 400 });
    }

  } catch (error: any) {
    console.error("[BACKEND] CRITICAL ERROR in POST handler:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// The PUT handler is no longer used by the simplified frontend, so it can be removed or ignored.
// To avoid build errors if it's referenced elsewhere, we can leave a placeholder.
export async function PUT(request: NextRequest) {
    return NextResponse.json({ ok: true, html: "PUT method is disabled in this version.", updatedLines: [] });
}
