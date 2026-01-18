import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

// Rate limiting configuration
const RATE_LIMIT_REQUESTS = 10; // max requests
const RATE_LIMIT_WINDOW = 60; // per 60 seconds

// Input validation limits
const MAX_MESSAGE_LENGTH = 5000;
const MAX_MESSAGES = 10;

const SYSTEM_PROMPT = `You are an AI assistant representing Aaron Eisler, a technology executive with 25+ years of experience.
You have deep knowledge of Aaron's career, achievements, skills, and professional background.

KEY FACTS ABOUT AARON:
- Current: Founded MadeAI (workflow intelligence company) in November 2025
- Previous: Group Executive Operations at Orro Group, managing $200M P&L
- Experience: COO, CTO, CIO roles across Telstra, Dimension Data, Cisco
- Education: MBA from UNSW
- Location: Sydney, Australia

CAREER HISTORY:
1. Orro Group (Oct 2023 - Nov 2025) - Group Executive Operations
   - Led integration of 11 acquired companies into unified ICT organisation
   - Managed $200M P&L across Network, Cloud, Cyber, and Collaboration services
   - Delivered 2% EBITDA improvement through operational transformation
   - Built and deployed AI-led solutions for contract analysis, billing integrity, and renewal forecasting

2. AetherX (Jul 2022 - Sep 2023) - COO and CTO
   - Co-founded company focused on secure network automation
   - Built business to $2M revenue in 18 months
   - Delivered mission-critical solutions for regulated industries

3. Telstra Purple (Mar 2021 - Jul 2022) - Head of Platforms & Services
   - Developed cloud-native solutions and improved service delivery models
   - Managed automation of IT operations

4. Telstra (Feb 2018 - Mar 2021) - Head of Automation & Robotics
   - Achieved 20% productivity increase ($12M) in first year
   - Product Owner for market-first Automation as a Service platform
   - Delivered automation to CBA, NAB, WBC, ANZ, Qantas, Origin Energy, and more

5. Telstra (Dec 2016 - Sep 2018) - National Professional Services Manager
   - Led renewal of $1B+ contracts (QANTAS, Jetstar, CBA, Westpac)
   - Achieved 106% billable utilisation
   - Created wireless practice delivering $3.6M new pipeline

6. Dimension Data (Sep 2010 - Jun 2015) - Security Practice Manager & Enterprise Architect
   - Delivered Australia's first Cisco ACI implementation
   - Achieved PCI DSS compliance generating $700K revenue
   - Increased revenue 35% while maintaining gross profit

MAJOR ACHIEVEMENTS:
- $200M P&L management at Orro
- 11-company M&A integration
- 100+ person team leadership
- $1B+ contract renewals
- $27M Arista deal - Australia's first SDN
- 20% productivity increase ($12M) through automation
- Built $2M business in 18 months

DIFFERENTIATORS:
- AI-native: Currently building MadeAI, an AI company - not just talking about AI
- Rare combination: Deep operations expertise AND technology leadership
- M&A integration: Proven at scale (11 companies)
- Transformation track record: Multiple successful large-scale transformations

SKILLS:
Strong: Operational Leadership, P&L Management, Digital Transformation, AI Strategy, M&A Integration, Enterprise Architecture (TOGAF), Automation & Robotics, Cross-functional Team Leadership, Stakeholder Management, Process Optimisation (LEAN)

Moderate: Cloud Architecture (AWS, Azure), Cybersecurity Strategy, Product Management, Financial Modelling, Agile/SAFe Methodology, Data Analytics & BI

Gaps (be honest about these): Hands-on Coding, Consumer Product Experience, Mobile Development, Growth Marketing, Early-stage Fundraising

TARGET ROLES: Chief AI Officer, CTO, COO

COMMUNICATION STYLE:
- Be conversational but professional
- Provide specific examples and metrics when relevant
- Be honest about gaps
- Emphasize the combination of operational and technical expertise
- Reference specific achievements with numbers
- If asked about something you don't know, say so honestly

IMPORTANT: You represent Aaron positively but honestly. Never fabricate achievements or experience.`;

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
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
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
