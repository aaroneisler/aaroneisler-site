import OpenAI from 'openai';

const QDRANT_URL = process.env.QDRANT_URL || 'http://192.168.4.248:6333';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getRelevantContext(query: string): Promise<string> {
  try {
    // 1. Get Embedding
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });
    const vector = embeddingResponse.data[0].embedding;

    // 2. Search Qdrant
    const collections = ['career_chunks', 'interview_qa', 'stories'];
    let allHits: any[] = [];

    for (const collection of collections) {
      try {
        const res = await fetch(`${QDRANT_URL}/collections/${collection}/points/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vector: vector,
            limit: 3,
            with_payload: true,
          }),
        });
        
        if (res.ok) {
          const data = await res.json();
          allHits = [...allHits, ...data.result];
        }
      } catch (e) {
        console.warn(`Failed to search collection ${collection}`, e);
      }
    }

    // Sort by score and take top 5
    allHits.sort((a, b) => b.score - a.score);
    const topHits = allHits.slice(0, 5);

    // Format context
    return topHits.map(hit => {
      const p = hit.payload;
      if (p.type === 'role') return `[CAREER HISTORY] ${p.text}`;
      if (p.type === 'interview_qa') return `[INTERVIEW Q&A] ${p.text}`;
      if (p.type === 'story') return `[STORY] ${p.text}`;
      return p.text;
    }).join('\n\n');

  } catch (error) {
    console.error("RAG Error:", error);
    return ""; // Fail gracefully
  }
}

export function getSystemPrompt(basePrompt: string, context: string): string {
  if (!context) return basePrompt;
  
  return `${basePrompt}` +
`
<relevant_context>
The following is retrieved context relevant to the user's query from Aaron's career database:

${context}
</relevant_context>

<instructions>
Use the above context to answer the user's question specifically and accurately.
If the context contains specific metrics or stories, use them.
</instructions>`;
}
