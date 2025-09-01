import { NextResponse, NextRequest } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
const INITIAL_SYSTEM_PROMPT = `You are an expert web developer who ONLY responds with a single, complete, self-contained HTML file. RULES: - Your ENTIRE response must be ONLY HTML code. - Start with <!DOCTYPE html> and end with </html>. - Do NOT use markdown, do NOT explain your work, do NOT write any text outside of the HTML structure. - All CSS must be inside <style> tags in the <head>. - All JS must be inside <script> tags. - Use TailwindCSS for styling by including this script in the <head>: <script src="https://cdn.tailwindcss.com"></script>. - Create a beautiful, responsive, and unique UI based on the user's prompt.`;

async function callOpenRouter(messages: any[], model: string) {
  const orRes = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'LocalSite'
    },
    body: JSON.stringify({ model, messages, max_tokens: 4000 }),
  });

  if (!orRes.ok) {
    const errorText = await orRes.text();
    throw new Error(`Failed to fetch from OpenRouter: ${orRes.status} ${errorText}`);
  }
  return orRes.json();
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
    let rawContent = openRouterResponse.choices?.[0]?.message?.content || "";

    // --- LOGIQUE D'EXTRACTION AMÉLIORÉE ---
    let finalHtml = rawContent;

    // 1. Chercher d'abord un bloc markdown HTML
    const htmlBlockRegex = /```html\s*([\s\S]*?)\s*```/;
    const markdownMatch = rawContent.match(htmlBlockRegex);

    if (markdownMatch) {
      finalHtml = markdownMatch[1].trim();
      console.log('🎯 HTML extrait depuis markdown');
    } else {
      // 2. Chercher directement un document HTML complet
      const doctypeRegex = /(<!DOCTYPE\s+html>[\s\S]*?<\/html>)/i;
      const directMatch = rawContent.match(doctypeRegex);
      
      if (directMatch) {
        finalHtml = directMatch[1].trim();
        console.log('🎯 HTML détecté directement');
      } else {
        console.log('⚠️ Aucun HTML valide trouvé, contenu brut utilisé');
      }
    }
    // --- FIN DE LA LOGIQUE ---

    return NextResponse.json({ ok: true, html: finalHtml });

  } catch (err: any) {
    console.error('[API ask-ai-local] Unhandled error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function PUT() {
    return NextResponse.json({ ok: false, error: "PUT method is not implemented." }, { status: 405 });
}
