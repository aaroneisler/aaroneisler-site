"use client";

import { useState, useEffect } from "react";

// Type definitions
interface ApplicationDates {
  advertised: string | null;
  applied: string | null;
  closing: string | null;
}

interface Application {
  id: string;
  job_url: string;
  title: string;
  company: string;
  hiring_person: string | null;
  match_score: number;
  resume_url: string | null;
  cover_letter_url: string | null;
  dates: ApplicationDates;
  status: string;
}

interface DashboardData {
  version: string;
  generated_at: string;
  total_applications: number;
  applications: Application[];
}

// Match score color coding
function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-400";
  if (score >= 80) return "text-teal-400";
  if (score >= 70) return "text-yellow-400";
  return "text-orange-400";
}

function getScoreBg(score: number): string {
  if (score >= 90) return "bg-green-500/20";
  if (score >= 80) return "bg-teal-500/20";
  if (score >= 70) return "bg-yellow-500/20";
  return "bg-orange-500/20";
}

// Format date for display
function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function AppliedJobsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/applied_jobs.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen p-8" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Dashboard</h1>
          <p className="text-gray-400">{error}</p>
          <p className="text-gray-500 mt-2 text-sm">
            Make sure applied_jobs.json exists in public/data/
          </p>
        </div>
      </main>
    );
  }

  if (!data || data.applications.length === 0) {
    return (
      <main className="min-h-screen p-8" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">No Applications Yet</h1>
          <p className="text-gray-400">
            Applications will appear here once Hunter starts applying to jobs.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-8" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Applied Jobs Dashboard</h1>
          <p className="text-gray-400 text-sm">
            {data.total_applications} applications | Last updated:{" "}
            {formatDate(data.generated_at)}
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div
            className="p-4 rounded-lg"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="text-2xl font-bold">{data.total_applications}</div>
            <div className="text-gray-400 text-sm">Total Applications</div>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="text-2xl font-bold text-green-400">
              {data.applications.filter((a) => a.match_score >= 80).length}
            </div>
            <div className="text-gray-400 text-sm">High Match (80+)</div>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="text-2xl font-bold">
              {Math.round(
                data.applications.reduce((sum, a) => sum + a.match_score, 0) /
                  data.applications.length
              )}
              %
            </div>
            <div className="text-gray-400 text-sm">Avg Match Score</div>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="text-2xl font-bold">
              {new Set(data.applications.map((a) => a.company)).size}
            </div>
            <div className="text-gray-400 text-sm">Companies</div>
          </div>
        </div>

        {/* Applications Table */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  <th className="text-left p-4 font-medium text-gray-400">Job</th>
                  <th className="text-left p-4 font-medium text-gray-400">Company</th>
                  <th className="text-left p-4 font-medium text-gray-400">Contact</th>
                  <th className="text-center p-4 font-medium text-gray-400">Match</th>
                  <th className="text-center p-4 font-medium text-gray-400">Documents</th>
                  <th className="text-left p-4 font-medium text-gray-400">Applied</th>
                </tr>
              </thead>
              <tbody>
                {data.applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b hover:bg-white/5 transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="p-4">
                      <a
                        href={app.job_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-teal-400 transition-colors"
                      >
                        {app.title}
                      </a>
                    </td>
                    <td className="p-4 text-gray-300">{app.company}</td>
                    <td className="p-4 text-gray-400">{app.hiring_person || "-"}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(
                          app.match_score
                        )} ${getScoreBg(app.match_score)}`}
                      >
                        {app.match_score}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        {app.resume_url && (
                          <a
                            href={app.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-400 hover:text-teal-300 text-sm"
                            title="Open Resume"
                          >
                            Resume
                          </a>
                        )}
                        {app.cover_letter_url && (
                          <a
                            href={app.cover_letter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-400 hover:text-teal-300 text-sm"
                            title="Open Cover Letter"
                          >
                            Letter
                          </a>
                        )}
                        {!app.resume_url && !app.cover_letter_url && (
                          <span className="text-gray-500">-</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      {formatDate(app.dates.applied)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y" style={{ borderColor: "var(--border)" }}>
            {data.applications.map((app) => (
              <div key={app.id} className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <a
                      href={app.job_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-teal-400 transition-colors"
                    >
                      {app.title}
                    </a>
                    <div className="text-gray-400 text-sm">{app.company}</div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(
                      app.match_score
                    )} ${getScoreBg(app.match_score)}`}
                  >
                    {app.match_score}%
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatDate(app.dates.applied)}</span>
                  <div className="flex gap-2">
                    {app.resume_url && (
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-400"
                      >
                        Resume
                      </a>
                    )}
                    {app.cover_letter_url && (
                      <a
                        href={app.cover_letter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-400"
                      >
                        Letter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>This page is not indexed and not linked from navigation.</p>
          <p className="mt-1">Powered by Hunter - Automated Job Application System</p>
        </div>
      </div>
    </main>
  );
}
