"use client";

import { useState } from "react";

interface FitResult {
  fit_score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export default function FitAssessment() {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FitResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to analyze");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to analyze at this time. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Convert numeric score to fit level for display
  const getFitLevel = (score: number): "strong" | "moderate" | "weak" => {
    if (score >= 70) return "strong";
    if (score >= 50) return "moderate";
    return "weak";
  };

  const getFitColor = (level: string) => {
    switch (level) {
      case "strong":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "moderate":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
      case "weak":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      default:
        return "";
    }
  };

  const getFitLabel = (score: number) => {
    const level = getFitLevel(score);
    switch (level) {
      case "strong":
        return `Strong Fit (${score}%) — Let's Talk`;
      case "moderate":
        return `Moderate Fit (${score}%) — Worth Exploring`;
      case "weak":
        return `Weak Fit (${score}%) — Probably Not Right`;
      default:
        return "";
    }
  };

  return (
    <div
      className="transition-all breathing-glow-strong"
      style={{
        padding: 'var(--space-lg)',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h3
          className="font-semibold"
          style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-sm)' }}
        >
          Fit Assessment Tool
        </h3>
        <p className="text-sm" style={{ color: 'var(--secondary)' }}>
          Paste a job description and get an honest assessment of whether Aaron
          is a good fit. No sugar-coating — if it's not a match, we'll tell you.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full resize-none focus:outline-none transition-colors text-sm"
          style={{
            height: '12rem',
            padding: 'var(--space-md)',
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)'
          }}
        />

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !jobDescription.trim()}
          className="w-full font-medium transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 rainbow-border"
          style={{
            padding: '0.786em 1.618em',
            background: '#1a1a2e',
            color: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analyzing...
            </span>
          ) : (
            "Analyze Fit"
          )}
        </button>

        {error && (
          <div
            className="text-sm"
            style={{
              padding: 'var(--space-md)',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: 'var(--radius-md)',
              color: '#ef4444'
            }}
          >
            {error}
          </div>
        )}

        {result && (
          <div
            className="animate-fade-in space-y-4"
            style={{ paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border)' }}
          >
            {/* Fit Level Badge */}
            <div
              className={`inline-block font-medium ${getFitColor(getFitLevel(result.fit_score))}`}
              style={{
                padding: '0.618em 1.272em',
                borderRadius: 'var(--radius-full)',
                border: '1px solid currentColor'
              }}
            >
              {getFitLabel(result.fit_score)}
            </div>

            {/* Summary */}
            <p className="text-sm" style={{ lineHeight: 'var(--phi)' }}>{result.summary}</p>

            {/* Strengths */}
            {result.strengths.length > 0 && (
              <div>
                <h4
                  className="text-sm font-semibold"
                  style={{ color: '#16a34a', marginBottom: 'var(--space-sm)' }}
                >
                  What Transfers
                </h4>
                <ul className="space-y-1">
                  {result.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="text-sm flex items-start gap-2"
                    >
                      <span style={{ color: '#22c55e' }}>+</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gaps */}
            {result.gaps.length > 0 && (
              <div>
                <h4
                  className="text-sm font-semibold"
                  style={{ color: '#dc2626', marginBottom: 'var(--space-sm)' }}
                >
                  Potential Gaps
                </h4>
                <ul className="space-y-1">
                  {result.gaps.map((gap, index) => (
                    <li
                      key={index}
                      className="text-sm flex items-start gap-2"
                    >
                      <span style={{ color: '#ef4444' }}>-</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendation */}
            {result.recommendation && (
              <div
                style={{
                  padding: 'var(--space-md)',
                  background: 'var(--surface-variant)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <h4
                  className="text-sm font-semibold"
                  style={{ marginBottom: 'var(--space-xs)' }}
                >
                  Recommendation
                </h4>
                <p className="text-sm" style={{ color: 'var(--secondary)', lineHeight: 'var(--phi)' }}>
                  {result.recommendation}
                </p>
              </div>
            )}

            {/* Download Resume Button - only show if fit_score >= 60 */}
            {result.fit_score >= 60 && (
              <a
                href="/Aaron_Eisler_Resume.pdf"
                download
                className="w-full font-medium transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                style={{
                  padding: '0.786em 1.618em',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface)',
                  marginTop: 'var(--space-md)',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex'
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
