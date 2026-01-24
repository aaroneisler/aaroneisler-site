import { NextRequest, NextResponse } from 'next/server';
import { assessFit } from '@/lib/career-rag';

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, jobTitle, company } = await request.json();

    if (!jobDescription?.trim()) {
      return NextResponse.json(
        { error: 'Job description required' },
        { status: 400 }
      );
    }

    const result = await assessFit(jobDescription, jobTitle, company);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Assess API error:', error);

    // Return a user-friendly error
    const message = error instanceof Error ? error.message : 'Assessment failed';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
