import { NextRequest, NextResponse } from "next/server";
import { getRelevantContext, getSystemPrompt } from "@/lib/career-rag";
import { SYSTEM_PROMPT } from "@/data/system_prompt";

// Career API configuration
const CAREER_API_URL = process.env.CAREER_API_URL || "http://192.168.4.240:8100";
const CAREER_API_KEY = process.env.CAREER_API_KEY || "";

// Input validation
const MAX_JD_LENGTH = 15000;

interface JobHunterRequest {
  action: "resume" | "cover-letter";
  jobDescription: string;
  jobTitle?: string;
  company?: string;
}

interface CareerApiResponse {
  success: boolean;
  match_score?: number;
  pdf_url?: string;
  cover_letter_url?: string;
  onedrive_url?: string;
  error?: string;
}

/**
 * Generate a tailored cover letter using Claude with RAG context
 */
async function generateCoverLetter(
  jobDescription: string,
  jobTitle: string,
  company: string
): Promise<{ content: string; error?: string }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return { content: "", error: "AI service not configured" };
  }

  try {
    // Get RAG context for the cover letter
    const context = await getRelevantContext(
      `cover letter for ${jobTitle} at ${company}: ${jobDescription.slice(0, 500)}`
    );

    const coverLetterPrompt = `You are writing a cover letter for Aaron Eisler applying for the role of ${jobTitle} at ${company}.

IMPORTANT GUIDELINES:
- Write in first person as Aaron
- Keep it to 300-400 words (3-4 paragraphs)
- Be confident but not arrogant
- Reference specific achievements that match the role requirements
- Show genuine interest in the company/role
- End with a clear call to action
- Use Australian English spelling
- Do NOT use generic phrases like "I am writing to express my interest"
- Do NOT start with "Dear Hiring Manager" - just start with the body

Use the following context about Aaron's background to tailor the letter:

${context}

JOB DESCRIPTION:
${jobDescription}

Write the cover letter body only (no salutation, no signature - those will be added separately).`;

    const systemPromptWithContext = getSystemPrompt(SYSTEM_PROMPT, context);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: systemPromptWithContext,
        messages: [
          {
            role: "user",
            content: coverLetterPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      return { content: "", error: "Failed to generate cover letter" };
    }

    const data = await response.json();
    const content = data.content[0]?.text || "";

    return { content };
  } catch (error) {
    console.error("Cover letter generation error:", error);
    return { content: "", error: "Cover letter generation failed" };
  }
}

/**
 * Call Career API to generate resume and save to OneDrive
 */
async function generateResume(
  jobDescription: string,
  jobTitle: string,
  company: string
): Promise<CareerApiResponse> {
  try {
    const response = await fetch(`${CAREER_API_URL}/resume/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": CAREER_API_KEY,
      },
      body: JSON.stringify({
        job_description: jobDescription,
        job_title: jobTitle,
        company: company,
        save_to_onedrive: true, // Request OneDrive save
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Career API error:", error);
      return {
        success: false,
        error: `Career API error: ${response.status}`,
      };
    }

    const data = await response.json();

    // Prefer OneDrive URL, fall back to full Career API URL
    let resumeUrl = data.onedrive_url;
    if (!resumeUrl && data.pdf_url) {
      // Construct full URL to Career API file server
      resumeUrl = `${CAREER_API_URL}${data.pdf_url}?key=${CAREER_API_KEY}`;
    }

    return {
      success: data.success,
      match_score: data.match_score,
      onedrive_url: resumeUrl,
      error: data.error,
    };
  } catch (error) {
    console.error("Resume generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Resume generation failed",
    };
  }
}

/**
 * Call Career API to generate cover letter PDF and save to OneDrive
 */
async function generateCoverLetterPDF(
  content: string,
  jobTitle: string,
  company: string
): Promise<{ success: boolean; pdfUrl?: string; onedriveUrl?: string; error?: string }> {
  try {
    const response = await fetch(`${CAREER_API_URL}/cover-letter/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": CAREER_API_KEY,
      },
      body: JSON.stringify({
        content,
        job_title: jobTitle,
        company,
        generate_pdf: true,
      }),
    });

    if (!response.ok) {
      // If endpoint doesn't exist, fall back to returning content directly
      if (response.status === 404) {
        console.warn("Cover letter save endpoint not available");
        return { success: true };
      }
      return { success: false, error: `Save failed: ${response.status}` };
    }

    const data = await response.json();

    // Prefer OneDrive URL, fall back to full Career API URL
    let coverLetterUrl = data.onedrive_url;
    if (!coverLetterUrl && data.pdf_url) {
      // Construct full URL to Career API file server
      coverLetterUrl = `${CAREER_API_URL}${data.pdf_url}?key=${CAREER_API_KEY}`;
    }

    return {
      success: data.success,
      pdfUrl: coverLetterUrl,
      onedriveUrl: data.onedrive_url,
    };
  } catch (error) {
    console.error("Cover letter PDF generation error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Cover letter generation failed" };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request
    let body: JobHunterRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { action, jobDescription, jobTitle, company } = body;

    // Validate input
    if (!action || !["resume", "cover-letter"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'resume' or 'cover-letter'" },
        { status: 400 }
      );
    }

    if (!jobDescription?.trim()) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    if (jobDescription.length > MAX_JD_LENGTH) {
      return NextResponse.json(
        { error: `Job description too long (max ${MAX_JD_LENGTH} chars)` },
        { status: 400 }
      );
    }

    const title = jobTitle || "Executive Role";
    const comp = company || "Company";

    // Handle resume generation
    if (action === "resume") {
      const result = await generateResume(jobDescription, title, comp);

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        resumeUrl: result.onedrive_url,
        matchScore: result.match_score,
      });
    }

    // Handle cover letter generation
    if (action === "cover-letter") {
      // Generate the cover letter content
      const letterResult = await generateCoverLetter(jobDescription, title, comp);

      if (letterResult.error) {
        return NextResponse.json(
          { success: false, error: letterResult.error },
          { status: 500 }
        );
      }

      // Generate PDF and save to OneDrive
      const pdfResult = await generateCoverLetterPDF(
        letterResult.content,
        title,
        comp
      );

      if (!pdfResult.success) {
        return NextResponse.json(
          { success: false, error: pdfResult.error || "Cover letter PDF generation failed" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        coverLetterUrl: pdfResult.pdfUrl,
        coverLetterContent: letterResult.content, // Include content for preview
      });
    }

    return NextResponse.json(
      { error: "Unknown action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Job hunter API error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
