"use client";

import { useState } from "react";

interface FitResult {
  fitLevel: "strong" | "moderate" | "weak";
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

export default function FitAssessment() {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FitResult | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Analyze this job description and assess Aaron Eisler's fit. Return a JSON response with this exact structure:
{
  "fitLevel": "strong" | "moderate" | "weak",
  "summary": "2-3 sentence overall assessment",
  "strengths": ["list of 3-5 relevant strengths/experiences that match"],
  "gaps": ["list of any gaps or areas where fit is weaker"],
  "recommendation": "1-2 sentence honest recommendation about whether to pursue"
}

Job Description:
${jobDescription}

Be honest. If the fit is weak, say so. Aaron values transparency over false positives.`,
            },
          ],
          mode: "fit-assessment",
        }),
      });

      if (!response.ok) throw new Error("Failed to analyze");

      const data = await response.json();

      // Try to parse JSON from the response
      try {
        const jsonMatch = data.message.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setResult(parsed);
        } else {
          throw new Error("No JSON found");
        }
      } catch {
        // If JSON parsing fails, create a basic result
        setResult({
          fitLevel: "moderate",
          summary: data.message,
          strengths: [],
          gaps: [],
          recommendation: "Please try again with a more detailed job description.",
        });
      }
    } catch (error) {
      setResult({
        fitLevel: "moderate",
        summary: "Unable to analyze at this time. Please try again.",
        strengths: [],
        gaps: [],
        recommendation: "",
      });
    } finally {
      setIsAnalyzing(false);
    }
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

  const getFitLabel = (level: string) => {
    switch (level) {
      case "strong":
        return "Strong Fit — Let's Talk";
      case "moderate":
        return "Moderate Fit — Worth Exploring";
      case "weak":
        return "Weak Fit — Probably Not Right";
      default:
        return "";
    }
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Fit Assessment Tool</h3>
        <p className="text-sm text-[var(--secondary)]">
          Paste a job description and get an honest assessment of whether Aaron
          is a good fit. No sugar-coating — if it's not a match, we'll tell you.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-48 p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl resize-none focus:outline-none focus:border-[var(--primary)] transition-colors text-sm"
        />

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !jobDescription.trim()}
          className="w-full py-3 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--primary-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
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

        {result && (
          <div className="animate-fade-in space-y-4 pt-4 border-t border-[var(--border)]">
            {/* Fit Level Badge */}
            <div
              className={`inline-block px-4 py-2 rounded-full border font-medium ${getFitColor(
                result.fitLevel
              )}`}
            >
              {getFitLabel(result.fitLevel)}
            </div>

            {/* Summary */}
            <p className="text-sm">{result.summary}</p>

            {/* Strengths */}
            {result.strengths.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                  What Transfers
                </h4>
                <ul className="space-y-1">
                  {result.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="text-sm flex items-start gap-2"
                    >
                      <span className="text-green-500">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gaps */}
            {result.gaps.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                  Potential Gaps
                </h4>
                <ul className="space-y-1">
                  {result.gaps.map((gap, index) => (
                    <li
                      key={index}
                      className="text-sm flex items-start gap-2"
                    >
                      <span className="text-red-500">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendation */}
            {result.recommendation && (
              <div className="p-4 bg-[var(--background)] rounded-lg">
                <h4 className="text-sm font-semibold mb-1">Recommendation</h4>
                <p className="text-sm text-[var(--secondary)]">
                  {result.recommendation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
