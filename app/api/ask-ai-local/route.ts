import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log("--- MINIMAL API TEST ---");
  console.log("Si vous voyez ce message, le fichier a bien été mis à jour.");

  const testHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test de Réponse</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-blue-100 flex items-center justify-center h-screen">
      <h1 class="text-4xl font-bold text-blue-800">Si vous voyez ce texte, l'API fonctionne !</h1>
    </body>
    </html>
  `;

  return NextResponse.json({ ok: true, html: testHtml });
}

export async function PUT() {
    return NextResponse.json({ ok: false, error: "PUT method is not used in this test." });
}
