"use client";

import { useState, useEffect } from "react";

interface GenerationResult {
  id: string;
  timestamp: string;
  jobTitle: string;
  company: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  fitScore?: number;
}

interface FitResult {
  fitLevel: "strong" | "moderate" | "weak";
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}

interface GenerateResponse {
  success: boolean;
  resumeUrl?: string;
  coverLetterUrl?: string;
  coverLetterContent?: string;
  matchScore?: number;
  error?: string;
}

export default function JobHunterPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [fitResult, setFitResult] = useState<FitResult | null>(null);
  const [history, setHistory] = useState<GenerationResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [coverLetterContent, setCoverLetterContent] = useState<string | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("jobhunter_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("jobhunter_history", JSON.stringify(history));
    }
  }, [history]);

  const extractJobInfo = (description: string) => {
    // Try to extract job title and company from description
    const lines = description.split("\n").filter((l) => l.trim());
    const firstLine = lines[0] || "";

    // Common patterns: "Job Title at Company" or "Job Title - Company"
    const atMatch = firstLine.match(/^(.+?)\s+at\s+(.+?)$/i);
    const dashMatch = firstLine.match(/^(.+?)\s*[-–—]\s*(.+?)$/i);

    if (atMatch) {
      return { title: atMatch[1].trim(), company: atMatch[2].trim() };
    }
    if (dashMatch) {
      return { title: dashMatch[1].trim(), company: dashMatch[2].trim() };
    }

    return { title: "", company: "" };
  };

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);

    // Auto-extract if title/company are empty
    if (!jobTitle && !company) {
      const extracted = extractJobInfo(value);
      if (extracted.title) setJobTitle(extracted.title);
      if (extracted.company) setCompany(extracted.company);
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setFitResult(null);
    setError(null);

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
      const jsonMatch = data.message.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setFitResult(parsed);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateResume = async () => {
    if (!jobDescription.trim() || isGeneratingResume) return;

    setIsGeneratingResume(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/jobhunter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "resume",
          jobDescription,
          jobTitle: jobTitle || "Executive Role",
          company: company || "Company",
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Resume generation failed");
      }

      const data: GenerateResponse = await response.json();

      if (data.success && data.resumeUrl) {
        // Add to history
        const newEntry: GenerationResult = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          jobTitle: jobTitle || "Executive Role",
          company: company || "Company",
          resumeUrl: data.resumeUrl,
          fitScore: data.matchScore,
        };
        setHistory((prev) => [newEntry, ...prev].slice(0, 20)); // Keep last 20
        setSuccessMessage("Resume generated! Check history below.");
      } else {
        throw new Error(data.error || "Resume generation failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Resume generation failed");
    } finally {
      setIsGeneratingResume(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!jobDescription.trim() || isGeneratingCoverLetter) return;

    setIsGeneratingCoverLetter(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/jobhunter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "cover-letter",
          jobDescription,
          jobTitle: jobTitle || "Executive Role",
          company: company || "Company",
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Cover letter generation failed");
      }

      const data: GenerateResponse = await response.json();

      if (data.success && data.coverLetterUrl) {
        // Save content for display (optional preview)
        if (data.coverLetterContent) {
          setCoverLetterContent(data.coverLetterContent);
        }

        // Add to history - check if we already have a resume entry for this job
        const existingIndex = history.findIndex(
          (h) =>
            h.company === (company || "Company") &&
            h.jobTitle === (jobTitle || "Executive Role") &&
            !h.coverLetterUrl
        );

        if (existingIndex >= 0) {
          // Update existing entry with cover letter URL
          setHistory((prev) => {
            const updated = [...prev];
            updated[existingIndex] = {
              ...updated[existingIndex],
              coverLetterUrl: data.coverLetterUrl,
            };
            return updated;
          });
        } else {
          // Create new entry
          const newEntry: GenerationResult = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            jobTitle: jobTitle || "Executive Role",
            company: company || "Company",
            coverLetterUrl: data.coverLetterUrl,
          };
          setHistory((prev) => [newEntry, ...prev].slice(0, 20));
        }

        setSuccessMessage("Cover letter generated! Check history below.");
      } else {
        throw new Error(data.error || "Cover letter generation failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cover letter generation failed");
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const getFitColor = (level: string) => {
    switch (level) {
      case "strong":
        return "text-green-600 bg-green-50 border-green-200";
      case "moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "weak":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "";
    }
  };

  const getFitLabel = (level: string) => {
    switch (level) {
      case "strong":
        return "Strong Fit";
      case "moderate":
        return "Moderate Fit";
      case "weak":
        return "Weak Fit";
      default:
        return "";
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("jobhunter_history");
  };

  const isGenerating = isGeneratingResume || isGeneratingCoverLetter;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Job Hunter</h1>
            <p className="text-sm text-gray-500">Private tool - not indexed</p>
          </div>
          <a
            href="/"
            className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
          >
            Back to main site
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Job Description Input */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Job Description
          </h2>

          {/* Optional: Job Title and Company */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title (optional)
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Chief Technology Officer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 bg-white"
                style={{ color: '#111827', backgroundColor: '#ffffff' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company (optional)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., Acme Corp"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 bg-white"
                style={{ color: '#111827', backgroundColor: '#ffffff' }}
              />
            </div>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => handleJobDescriptionChange(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-gray-900 bg-white"
            style={{ color: '#111827', backgroundColor: '#ffffff' }}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || isAnalyzing || isGenerating}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Analyzing...
                </span>
              ) : (
                "Analyse Fit"
              )}
            </button>

            <button
              onClick={handleGenerateResume}
              disabled={!jobDescription.trim() || isGenerating || isAnalyzing}
              className="flex-1 px-4 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGeneratingResume ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Generating...
                </span>
              ) : (
                "Create Resume"
              )}
            </button>

            <button
              onClick={handleGenerateCoverLetter}
              disabled={!jobDescription.trim() || isGenerating || isAnalyzing}
              className="flex-1 px-4 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGeneratingCoverLetter ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Generating...
                </span>
              ) : (
                "Create Cover Letter"
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
              {successMessage}
            </div>
          )}
        </section>

        {/* Fit Analysis Result */}
        {fitResult && (
          <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Fit Analysis
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getFitColor(
                  fitResult.fitLevel
                )}`}
              >
                {getFitLabel(fitResult.fitLevel)}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{fitResult.summary}</p>

            {fitResult.strengths.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-green-700 mb-2">
                  Strengths
                </h3>
                <ul className="space-y-1">
                  {fitResult.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-green-500">+</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {fitResult.gaps.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-red-700 mb-2">
                  Gaps
                </h3>
                <ul className="space-y-1">
                  {fitResult.gaps.map((g, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-red-500">-</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {fitResult.recommendation && (
              <div className="p-3 bg-gray-50 rounded-md">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  Recommendation
                </h3>
                <p className="text-sm text-gray-600">{fitResult.recommendation}</p>
              </div>
            )}
          </section>
        )}

        {/* Cover Letter Content */}
        {coverLetterContent && (
          <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Generated Cover Letter
              </h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(coverLetterContent);
                  setSuccessMessage("Cover letter copied to clipboard!");
                }}
                className="px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
              >
                Copy to Clipboard
              </button>
            </div>
            <div className="prose prose-sm max-w-none">
              {coverLetterContent.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-700 mb-3" style={{ color: '#374151' }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <button
              onClick={() => setCoverLetterContent(null)}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Dismiss
            </button>
          </section>
        )}

        {/* History */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Generation History
            </h2>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                Clear history
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No documents generated yet. Create a resume or cover letter to see
              them here.
            </p>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.jobTitle} at {item.company}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {item.fitScore && (
                        <span className="ml-2 text-teal-600">
                          Match: {item.fitScore}%
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {item.resumeUrl && (
                      <a
                        href={item.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-sm bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200 transition-colors"
                      >
                        Resume
                      </a>
                    )}
                    {item.coverLetterUrl && (
                      <a
                        href={item.coverLetterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                      >
                        Cover Letter
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
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
  );
}
