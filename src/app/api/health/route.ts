import { NextResponse } from "next/server";

/**
 * Health check endpoint for resume-renderer.
 * Used by Uptime Kuma to monitor service availability.
 */
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "resume-renderer",
    timestamp: new Date().toISOString(),
  });
}
