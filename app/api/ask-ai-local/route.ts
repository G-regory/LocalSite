// app/api/ask-ai-local/route.ts
import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';

export async function POST(req: Request) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ ok: false, error: 'Missing OPENROUTER_API_KEY' }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const prompt = body.prompt ?? body.input ?? 'Hello';
    const model = body.model ?? process.env.OPENROUTER_MODEL ?? 'moonshotai/kimi-k2:free';

    // Appel vers OpenRouter
    const orRes = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.2,
      }),
    });

    console.log('[OpenRouter] status:', orRes.status, 'url:', `${OPENROUTER_BASE_URL}/chat/completions`);
    console.log('[OpenRouter] headers:', Object.fromEntries(orRes.headers.entries()));

    const rawText = await orRes.text();
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch { // 'e' unused, so it's removed
      console.warn('[OpenRouter] response is not JSON (rawText snippet):', rawText.slice(0, 500));
    }

    if (!orRes.ok) {
      return NextResponse.json(
        { ok: false, status: orRes.status, message: 'OpenRouter error', body: parsed ?? rawText },
        { status: 500 }
      );
    }

    let content = '';
    if (parsed) {
      if (parsed.choices?.[0]?.message?.content) {
        content = parsed.choices[0].message.content;
      } else if (parsed.output_text) {
        content = parsed.output_text;
      } else if (parsed.choices?.[0]?.text) {
        content = parsed.choices[0].text;
      } else {
        content = JSON.stringify(parsed).slice(0, 10000);
      }
    } else {
      content = rawText;
    }

    return NextResponse.json({ ok: true, html: content }, { status: 200 });
  } catch (err) { // removed ': any'
    console.error('[API ask-ai-local] error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
