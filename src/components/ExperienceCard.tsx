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
    <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--card)]">
      {/* Header */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-semibold">{role}</h3>
            <p className="text-[var(--primary)]">{company}</p>
          </div>
          <span className="text-sm text-[var(--secondary)]">{period}</span>
        </div>

        {/* Bullet points */}
        <ul className="space-y-2 mb-4">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-[var(--accent)] mt-1">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
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
        <div className="border-t border-[var(--border)] bg-[var(--background)] p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            <span className="text-sm font-medium text-[var(--secondary)]">
              AI-Enhanced Context
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-[var(--accent)] mb-1">
                Situation
              </h4>
              <p className="text-sm text-[var(--secondary)]">
                {aiContext.situation}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[var(--accent)] mb-1">
                Approach
              </h4>
              <p className="text-sm text-[var(--secondary)]">
                {aiContext.approach}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[var(--accent)] mb-1">
                Results
              </h4>
              <p className="text-sm text-[var(--secondary)]">
                {aiContext.results}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[var(--accent)] mb-1">
                Lessons Learned
              </h4>
              <p className="text-sm text-[var(--secondary)]">
                {aiContext.lessonsLearned}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
