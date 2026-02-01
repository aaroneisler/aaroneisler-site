import { NextResponse } from "next/server";

export async function GET() {
  const CAREER_API_URL = process.env.CAREER_API_URL;
  const CAREER_API_KEY = process.env.CAREER_API_KEY;

  const debug = {
    hasUrl: !!CAREER_API_URL,
    hasKey: !!CAREER_API_KEY,
    urlPrefix: CAREER_API_URL?.substring(0, 30),
    keyPrefix: CAREER_API_KEY?.substring(0, 10),
    timestamp: new Date().toISOString(),
  };

  // If both are present, try a test request
  if (CAREER_API_URL && CAREER_API_KEY) {
    try {
      const response = await fetch(`${CAREER_API_URL}/health`, {
        headers: { 'X-API-Key': CAREER_API_KEY },
      });
      debug.healthStatus = response.status;
      debug.healthOk = response.ok;
    } catch (error) {
      debug.healthError = error instanceof Error ? error.message : 'Unknown error';
    }
  }

  return NextResponse.json(debug);
}
