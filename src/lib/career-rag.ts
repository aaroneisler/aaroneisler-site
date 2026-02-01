/**
 * Career RAG Client
 * Interfaces with career-api for context retrieval and fit assessment.
 */

// Timeout for RAG requests (fail gracefully)
const RAG_TIMEOUT_MS = 2000;

export async function getRelevantContext(query: string): Promise<string> {
  // Read env vars at runtime, not module load time
  const CAREER_API_URL = process.env.CAREER_API_URL;
  const CAREER_API_KEY = process.env.CAREER_API_KEY;

  if (!CAREER_API_URL || !CAREER_API_KEY) {
    console.warn('Career API not configured, using fallback');
    return '';
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), RAG_TIMEOUT_MS);

    const response = await fetch(`${CAREER_API_URL}/context`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CAREER_API_KEY,
      },
      body: JSON.stringify({ query, limit: 5 }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Career API error:', response.status);
      return '';
    }

    const data = await response.json();
    return data.context || '';
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Career API timeout after', RAG_TIMEOUT_MS, 'ms');
    } else {
      console.error('Career API fetch failed:', error);
    }
    return '';
  }
}

export interface AssessmentResult {
  fit_score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export async function assessFit(
  jobDescription: string,
  jobTitle?: string,
  company?: string
): Promise<AssessmentResult> {
  // Read env vars at runtime
  const CAREER_API_URL = process.env.CAREER_API_URL;
  const CAREER_API_KEY = process.env.CAREER_API_KEY;

  if (!CAREER_API_URL || !CAREER_API_KEY) {
    throw new Error('Career API not configured');
  }

  const response = await fetch(`${CAREER_API_URL}/assess`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': CAREER_API_KEY,
    },
    body: JSON.stringify({
      job_description: jobDescription,
      job_title: jobTitle,
      company: company,
    }),
  });

  if (!response.ok) {
    throw new Error(`Assessment failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Build enhanced system prompt with RAG context.
 */
export function getSystemPrompt(basePrompt: string, context: string): string {
  if (!context) return basePrompt;

  return `${basePrompt}

<relevant_context>
The following is retrieved context relevant to the user's query from Aaron's career database:

${context}
</relevant_context>

<instructions>
Use the above context to answer the user's question specifically and accurately.
If the context contains specific metrics or stories, use them.
</instructions>`;
}
