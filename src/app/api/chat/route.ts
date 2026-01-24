import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { getSystemPrompt, getRelevantContext } from "@/lib/career-rag";
import { SYSTEM_PROMPT } from "@/data/system_prompt";

// Rate limiting configuration
const RATE_LIMIT_REQUESTS = 10; // max requests
const RATE_LIMIT_WINDOW = 60; // per 60 seconds

// Input validation limits
const MAX_MESSAGE_LENGTH = 5000;
const MAX_MESSAGES = 10;

// Get client IP from request headers
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  return "anonymous";
}

// Rate limiting using Vercel KV
async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const key = `ratelimit:${ip}`;

  try {
    const current = await kv.incr(key);

    // Set expiry on first request
    if (current === 1) {
      await kv.expire(key, RATE_LIMIT_WINDOW);
    }

    const remaining = Math.max(0, RATE_LIMIT_REQUESTS - current);
    return { allowed: current <= RATE_LIMIT_REQUESTS, remaining };
  } catch {
    // If KV is not configured, allow the request but log warning
    console.warn("Rate limiting unavailable - Vercel KV not configured");
    return { allowed: true, remaining: RATE_LIMIT_REQUESTS };
  }
}

// Validate incoming messages
function validateMessages(messages: unknown): { valid: boolean; error?: string } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "At least one message is required" };
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Too many messages (max ${MAX_MESSAGES})` };
  }

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (!msg || typeof msg !== "object") {
      return { valid: false, error: `Invalid message at index ${i}` };
    }

    if (typeof msg.role !== "string" || !["user", "assistant"].includes(msg.role)) {
      return { valid: false, error: `Invalid role at index ${i}` };
    }

    if (typeof msg.content !== "string") {
      return { valid: false, error: `Invalid content at index ${i}` };
    }

    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message too long at index ${i} (max ${MAX_MESSAGE_LENGTH} chars)` };
    }
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const { allowed, remaining } = await checkRateLimit(clientIp);

    if (!allowed) {
      return NextResponse.json(
        { message: "Too many requests. Please wait a moment and try again." },
        {
          status: 429,
          headers: {
            "Retry-After": String(RATE_LIMIT_WINDOW),
            "X-RateLimit-Remaining": "0",
          }
        }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { messages } = body;
    const lastUserMessage = messages[messages.length - 1].content;

    // RAG: get relevant context for the query
    const context = await getRelevantContext(lastUserMessage);
    const systemPrompt = getSystemPrompt(SYSTEM_PROMPT, context);

    // Input validation
    const validation = validateMessages(messages);
    if (!validation.valid) {
      return NextResponse.json(
        { message: validation.error },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: "AI service not configured. Please add your API key." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system: systemPrompt,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      return NextResponse.json(
        { message: "Failed to get response from AI service." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const message = data.content[0]?.text || "I apologize, I couldn't generate a response.";

    return NextResponse.json(
      { message },
      {
        headers: {
          "X-RateLimit-Remaining": String(remaining),
        }
      }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}