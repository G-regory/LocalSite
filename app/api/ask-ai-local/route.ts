import { NextResponse, NextRequest } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
const INITIAL_SYSTEM_PROMPT = `ONLY USE HTML, CSS AND JAVASCRIPT. If you want to use ICON make sure to import the library first. Try to create the best UI possible by using only HTML, CSS and JAVASCRIPT. MAKE IT RESPONSIVE USING TAILWINDCSS. Use as much as you can TailwindCSS for the CSS, if you can't do something with TailwindCSS, then use custom CSS (make sure to import <script src="https://cdn.tailwindcss.com"></script> in the head). Also, try to ellaborate as much as you can, to create something unique. ALWAYS GIVE THE RESPONSE INTO A SINGLE HTML FILE. AVOID CHINESE CHARACTERS IN THE CODE IF NOT ASKED BY THE USER.`;

async function callOpenRouter(messages: any[], model: string) {
  const orRes = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000', // Header d'identification
      'X-Title': 'LocalSite' // Header d'identification
    },
    body: JSON.stringify({ model, messages }),
  });

  console.log(`[OpenRouter] Request to model ${model} returned status: ${orRes.status}`);
  const rawText = await orRes.text();

  if (!orRes.ok) {
    console.error('[OpenRouter] Error Response:', rawText);
    throw new Error(`Failed to fetch from OpenRouter: ${orRes.status}`);
  }

  try {
    const parsed = JSON.parse(rawText);
    return parsed;
  } catch (e) {
    console.error('[API Error] Failed to parse JSON from OpenRouter:', rawText);
    throw new Error('Invalid JSON response from AI service');
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ ok: false, error: 'Server configuration error: Missing API Key' }, { status: 500 });
    }
    const body = await req.json();
    const { prompt, model, html } = body;
    const userContent = html ? `Current HTML:\n\`\`\`html\n${html}\n\`\`\`\n\nUser request: ${prompt}` : prompt;
    const messages = [{ role: 'system', content: INITIAL_SYSTEM_PROMPT }, { role: 'user', content: userContent }];

    const openRouterResponse = await callOpenRouter(messages, model);
    const content = openRouterResponse.choices?.[0]?.message?.content || "";
    return NextResponse.json({ ok: true, html: content });

  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function PUT() {
    return NextResponse.json({ ok: false, error: "PUT method is not implemented." }, { status: 405 });
}
