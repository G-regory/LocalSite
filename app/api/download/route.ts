// app/api/download/route.ts

import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json();

    if (!html) {
      return NextResponse.json(
        { error: "Le contenu HTML est manquant." },
        { status: 400 }
      );
    }

    const zip = new JSZip();
    zip.file("index.html", html);

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="website.zip"`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création du ZIP:", error);
    return NextResponse.json(
      { error: "Impossible de créer le fichier ZIP." },
      { status: 500 }
    );
  }
}
