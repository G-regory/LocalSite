import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
const INITIAL_SYSTEM_PROMPT = `ONLY USE HTML, CSS AND JAVASCRIPT. If you want to use ICON make sure to import the library first. Try to create the best UI possible by using only HTML, CSS and JAVASCRIPT. MAKE IT RESPONSIVE USING TAILWINDCSS. Use as much as you can TailwindCSS for the CSS, if you can't do something with TailwindCSS, then use custom CSS (make sure to import <script src="https://cdn.tailwindcss.com"></script> in the head). Also, try to ellaborate as much as you can, to create something unique. ALWAYS GIVE THE RESPONSE INTO A SINGLE HTML FILE. AVOID CHINESE CHARACTERS IN THE CODE IF NOT ASKED BY THE USER.`;

export async function POST(req: Request) {
  try {
    if (!OPENROUTER_API_KEY) {
      console.error('[API Error] Missing OPENROUTER_API_KEY');
      return NextResponse.json({ ok: false, error: 'Server configuration error: Missing API Key' }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const { prompt, model, html } = body;
    
    if (!prompt || !model) {
        return NextResponse.json({ ok: false, error: 'Missing prompt or model' }, { status: 400 });
    }

    const userContent = html ? `Here is my current HTML code:\n\n\`\`\`html\n${html}\n\`\`\`\n\nNow, please create a new design based on this HTML and my prompt: ${prompt}` : prompt;

    const messages = [
        { role: 'system', content: INITIAL_SYSTEM_PROMPT },
        { role: 'user', content: userContent }
    ];

    const orRes = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({ model, messages }),
    });

    console.log(`[OpenRouter] Request to model ${model} returned status: ${orRes.status}`);

    const rawText = await orRes.text();
    
    if (!orRes.ok) {
      console.error('[OpenRouter] Error Response:', rawText);
      return NextResponse.json({ ok: false, error: 'Failed to fetch from OpenRouter', details: rawText }, { status: orRes.status });
    }

    try {
        const parsed = JSON.parse(rawText);
        const content = parsed.choices?.[0]?.message?.content || '';
        return NextResponse.json({ ok: true, html: content });
    } catch (e) {
        console.error('[API Error] Failed to parse JSON from OpenRouter:', rawText);
        return NextResponse.json({ ok: false, error: 'Invalid JSON response from AI service' }, { status: 500 });
    }

  } catch (err: any) {
    console.error('[API ask-ai-local] Unhandled error:', err);
    return NextResponse.json({ ok: false, error: err.message || 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function PUT() {
    return NextResponse.json({ ok: false, error: "PUT method is not implemented." }, { status: 405 });
}
