import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

const VOICE_DIR = path.join(process.cwd(), "voice", "lux_batch_out");
const VOICE_KEY_PATTERN = /^(?:[A-Z]-[A-Z]-\d{2}|[A-Z]-\d{2})$/;

export async function GET(request: NextRequest) {
  const rawKey = request.nextUrl.searchParams.get("key");
  const key = rawKey?.toUpperCase();

  if (!key || !VOICE_KEY_PATTERN.test(key)) {
    return NextResponse.json({ error: "invalid voice key" }, { status: 400 });
  }

  const filePath = path.join(VOICE_DIR, `${key}.wav`);

  try {
    const audioBuffer = await readFile(filePath);
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/wav",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    return NextResponse.json({ error: "voice not found" }, { status: 404 });
  }
}

