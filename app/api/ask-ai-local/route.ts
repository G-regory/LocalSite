/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { INITIAL_SYSTEM_PROMPT } from "@/lib/prompts";

async function callOpenRouter(messages: any[], model: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
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
      stream: false,
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

    if (!model || !prompt) {
      return new NextResponse(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const messages = [
      { role: "system", content: INITIAL_SYSTEM_PROMPT },
      { role: "user", content: html ? `Here is my current HTML code:\n\n\`\`\`html\n${html}\n\`\`\`\n\nNow, please create a new design based on this HTML and my prompt: ${prompt}` : prompt },
    ];

    if (provider === "openrouter") {
      const openRouterResponse = await callOpenRouter(messages, model);
      const content = openRouterResponse.choices?.[0]?.message?.content || "";
      
      // Explicitly return a JSON response
      return new NextResponse(JSON.stringify({ ok: true, html: content }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new NextResponse(JSON.stringify({ error: `Provider ${provider} not supported` }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

  } catch (error: any) {
    console.error("[BACKEND] CRITICAL ERROR in POST handler:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT() {
    // This function is not used in the simplified flow
    return new NextResponse(JSON.stringify({ ok: true, html: "PUT method is disabled in this version." }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
