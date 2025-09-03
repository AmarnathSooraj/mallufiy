// app/api/keys/route.ts
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

// Simple demo: serve enc.key only if a token is provided
export async function GET(req) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  // TODO: validate token before returning key
  if (!token || token !== "my-secret-token") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const keyPath = path.join(process.cwd(), "public/videos/encrypted/enc.key");
  const key = fs.readFileSync(keyPath);

  return new NextResponse(key, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
}
