import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('🔍 API ask-ai-local appelée');
  
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('❌ OPENROUTER_API_KEY manquant');
      return NextResponse.json({ ok: false, error: 'API key manquante' }, { status: 500 });
    }

    const body = await req.json();
    const { prompt, model } = body;
    
    console.log('📝 Prompt reçu:', prompt);
    console.log('🤖 Modèle:', model);

    // URL CORRIGÉE : utiliser /v1/chat/completions
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'LocalSite'
      },
      body: JSON.stringify({
        model: model || 'moonshotai/kimi-dev-72b:free',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
      }),
    });

    console.log('🌐 OpenRouter status:', response.status);
    console.log('🌐 Content-Type:', response.headers.get('content-type'));

    const responseText = await response.text();
    console.log('📦 Réponse brute (100 premiers caractères):', responseText.substring(0, 100));

    if (!response.ok) {
      console.error('❌ OpenRouter erreur complète:', responseText);
      return NextResponse.json({ 
        ok: false, 
        error: `OpenRouter error: ${response.status}` 
      }, { status: 500 });
    }

    const data = JSON.parse(responseText);
    const content = data.choices?.[0]?.message?.content || 'Pas de réponse';
    
    console.log('✅ Contenu extrait:', content.substring(0, 100));

    return NextResponse.json({ 
      ok: true, 
      html: content 
    });

  } catch (error) {
    console.error('❌ Erreur dans API:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error.message 
    }, { status: 500 });
  }
}
