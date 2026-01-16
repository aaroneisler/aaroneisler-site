"use client";

import { useState } from "react";

interface AIContext {
  situation: string;
  approach: string;
  results: string;
  lessonsLearned: string;
}

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  aiContext: AIContext;
}

export default function ExperienceCard({
  company,
  role,
  period,
  bullets,
  aiContext,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="overflow-hidden transition-all"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Header */}
      <div style={{ padding: 'var(--space-lg)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3
              className="font-semibold"
              style={{ fontSize: 'var(--text-lg)' }}
            >
              {role}
            </h3>
            <p style={{ color: 'var(--accent)' }}>{company}</p>
          </div>
          <span
            className="text-sm"
            style={{ color: 'var(--secondary)' }}
          >
            {period}
          </span>
        </div>

        {/* Bullet points */}
        <ul className="space-y-2 mb-4">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span style={{ color: 'var(--accent)', marginTop: '0.25rem' }}>•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium transition-all"
          style={{ color: 'var(--accent)' }}
        >
          <svg
            className="w-4 h-4 transition-transform"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          {isExpanded ? "Hide AI Context" : "View AI Context"}
        </button>
      </div>

      {/* Expanded AI Context */}
      {isExpanded && (
        <div
          className="animate-fade-in"
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--surface-variant)',
            padding: 'var(--space-lg)'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'var(--accent)' }}
            >
              <svg
                className="w-4 h-4"
                style={{ color: 'var(--on-accent)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--secondary)' }}
            >
              AI-Enhanced Context
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h4
                className="text-sm font-semibold mb-1"
                style={{ color: 'var(--accent)' }}
              >
                Situation
              </h4>
              <p
                className="text-sm"
                style={{ color: 'var(--secondary)', lineHeight: 'var(--phi)' }}
              >
                {aiContext.situation}
              </p>
            </div>

            <div>
              <h4
                className="text-sm font-semibold mb-1"
                style={{ color: 'var(--accent)' }}
              >
                Approach
              </h4>
              <p
                className="text-sm"
                style={{ color: 'var(--secondary)', lineHeight: 'var(--phi)' }}
              >
                {aiContext.approach}
              </p>
            </div>

            <div>
              <h4
                className="text-sm font-semibold mb-1"
                style={{ color: 'var(--accent)' }}
              >
                Results
              </h4>
              <p
                className="text-sm"
                style={{ color: 'var(--secondary)', lineHeight: 'var(--phi)' }}
              >
                {aiContext.results}
              </p>
            </div>

            <div>
              <h4
                className="text-sm font-semibold mb-1"
                style={{ color: 'var(--accent)' }}
              >
                Lessons Learned
              </h4>
              <p
                className="text-sm"
                style={{ color: 'var(--secondary)', lineHeight: 'var(--phi)' }}
              >
                {aiContext.lessonsLearned}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
