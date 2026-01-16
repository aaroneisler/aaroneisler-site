"use client";

interface SkillsMatrixProps {
  skills: {
    strong: string[];
    moderate: string[];
    gaps: string[];
  };
}

export default function SkillsMatrix({ skills }: SkillsMatrixProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Strong */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <h3 className="font-semibold text-green-600 dark:text-green-400">
            Strong
          </h3>
        </div>
        <ul className="space-y-2">
          {skills.strong.map((skill, index) => (
            <li
              key={index}
              className="text-sm flex items-start gap-2"
            >
              <svg
                className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Moderate */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">
            Moderate
          </h3>
        </div>
        <ul className="space-y-2">
          {skills.moderate.map((skill, index) => (
            <li
              key={index}
              className="text-sm flex items-start gap-2"
            >
              <svg
                className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Gaps */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <h3 className="font-semibold text-red-600 dark:text-red-400">
            Gaps (Honest Assessment)
          </h3>
        </div>
        <ul className="space-y-2">
          {skills.gaps.map((skill, index) => (
            <li
              key={index}
              className="text-sm flex items-start gap-2"
            >
              <svg
                className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-[var(--secondary)] mt-4 italic">
          Transparency builds trust. These are areas where I'd lean on team expertise.
        </p>
      </div>
    </div>
  );
}
