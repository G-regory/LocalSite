import { NextResponse, NextRequest } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

const INITIAL_SYSTEM_PROMPT = `You are an expert web developer who ONLY responds with a single, complete, self-contained HTML file. RULES: - Your ENTIRE response must be ONLY HTML code. - Start with <!DOCTYPE html> and end with </html>. - Do NOT use markdown, do NOT explain your work, do NOT write any text outside of the HTML structure. - All CSS must be inside <style> tags in the <head>. - All JS must be inside <script> tags. - Use TailwindCSS for styling by including this script in the <head>: <script src="https://cdn.tailwindcss.com"></script>. - Create a beautiful, responsive, and unique UI based on the user's prompt.`;

async function callOpenRouter(messages: any[], model: string) {
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'LocalSite'
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      max_tokens: 4000
    }),
  });

  console.log(`[OpenRouter] Status: ${response.status}`);
  console.log(`[OpenRouter] Content-Type: ${response.headers.get('content-type')}`);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[OpenRouter] Error Response:', errorText.substring(0, 200));
    throw new Error(`OpenRouter API Error: ${response.status}`);
  }

  const text = await response.text();
  console.log(`[OpenRouter] Raw response (100 chars): ${text.substring(0, 100)}`);

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('[OpenRouter] Invalid JSON received:', text.substring(0, 500));
    throw new Error('OpenRouter returned invalid JSON');
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ ok: false, error: 'Missing API Key' }, { status: 500 });
    }

    const body = await req.json();
    const { prompt, model } = body;

    console.log(`[API] Processing request with model: ${model}`);

    const messages = [
      { role: 'system', content: INITIAL_SYSTEM_PROMPT }, 
      { role: 'user', content: prompt }
    ];

    const openRouterResponse = await callOpenRouter(messages, model || 'moonshotai/kimi-dev-72b:free');
    let rawContent = openRouterResponse.choices?.[0]?.message?.content || "Pas de réponse";

    // Extraction du HTML
    const htmlBlockRegex = /```html\s*([\s\S]*?)\s*```/;
    const markdownMatch = rawContent.match(htmlBlockRegex);
    
    let finalHtml = rawContent;
    if (markdownMatch) {
      finalHtml = markdownMatch[1].trim();
      console.log('[API] HTML extracted from markdown');
    } else {
      const doctypeRegex = /(<!DOCTYPE\s+html>[\s\S]*?<\/html>)/i;
      const directMatch = rawContent.match(doctypeRegex);
      if (directMatch) {
        finalHtml = directMatch[1].trim();
        console.log('[API] Direct HTML detected');
      }
    }

    return NextResponse.json({ ok: true, html: finalHtml });

  } catch (err: any) {
    console.error('[API] Error:', err.message);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
