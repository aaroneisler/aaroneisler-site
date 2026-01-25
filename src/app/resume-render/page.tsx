"use client";

import { profile, experience, skills, education } from "@/data/profile";

/**
 * Resume Render Page - Used by Playwright for PDF generation.
 *
 * This page renders the full resume HTML that gets captured as PDF.
 * It imports from profile.ts which is injected with tailored content
 * before each render.
 *
 * DO NOT use this page for public download - use /resume instead.
 */
export default function ResumeRenderPage() {
  return (
    <>
      <style jsx global>{`
        @page {
          size: A4;
          margin: 0.6in 0.7in;
        }

        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }

        .resume-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          font-family: system-ui, -apple-system, sans-serif;
          color: #1a1a1a;
          line-height: 1.5;
        }

        .resume-header {
          text-align: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #0d9488;
        }

        .resume-header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          color: #1a1a1a;
        }

        .resume-header .subtitle {
          font-size: 1.1rem;
          color: #0d9488;
          margin: 0 0 0.5rem 0;
          font-weight: 500;
        }

        .contact-info {
          font-size: 0.9rem;
          color: #666;
        }

        .contact-info span {
          margin: 0 0.5rem;
        }

        .resume-section {
          margin-bottom: 1.5rem;
        }

        .resume-section h2 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0d9488;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 0.25rem;
          margin-bottom: 0.75rem;
        }

        .summary-text {
          font-size: 0.95rem;
          color: #333;
        }

        .achievements-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .achievements-list li {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          padding-left: 1rem;
          position: relative;
        }

        .achievements-list li::before {
          content: "•";
          color: #0d9488;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .experience-item {
          margin-bottom: 1.25rem;
          page-break-inside: avoid;
        }

        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .experience-header h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          color: #1a1a1a;
        }

        .experience-header .company {
          font-size: 0.95rem;
          color: #666;
          margin: 0;
        }

        .experience-header .period {
          font-size: 0.85rem;
          color: #888;
          white-space: nowrap;
        }

        .bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .bullet-list li {
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
          padding-left: 1rem;
          position: relative;
          color: #333;
        }

        .bullet-list li::before {
          content: "–";
          color: #999;
          position: absolute;
          left: 0;
        }

        .skills-section p {
          font-size: 0.9rem;
          margin: 0.25rem 0;
        }

        .skills-section strong {
          color: #0d9488;
        }

        .education-item {
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }
      `}</style>

      <div className="resume-container">
        {/* Header */}
        <header className="resume-header">
          <h1>{profile.name}</h1>
          <p className="subtitle">{profile.subtitle || profile.title}</p>
          <div className="contact-info">
            <span>{profile.location}</span>
            <span>|</span>
            <span>{profile.email}</span>
            <span>|</span>
            <span>{profile.phone}</span>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="resume-section">
          <h2>Executive Summary</h2>
          <p className="summary-text">{profile.summary}</p>
        </section>

        {/* Key Achievements */}
        {profile.highlights && profile.highlights.length > 0 && (
          <section className="resume-section">
            <h2>Key Achievements</h2>
            <ul className="achievements-list">
              {profile.highlights.map((h, i) => (
                <li key={i}>
                  <strong>{h.headline}</strong> — {h.story}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Professional Experience */}
        <section className="resume-section">
          <h2>Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="experience-header">
                <div>
                  <h3>{exp.role}</h3>
                  <p className="company">{exp.company}</p>
                </div>
                <span className="period">{exp.period}</span>
              </div>
              <ul className="bullet-list">
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="resume-section skills-section">
          <h2>Technical Skills</h2>
          {skills.strong && skills.strong.length > 0 && (
            <p>
              <strong>Expert:</strong> {skills.strong.join(", ")}
            </p>
          )}
          {skills.moderate && skills.moderate.length > 0 && (
            <p>
              <strong>Proficient:</strong> {skills.moderate.join(", ")}
            </p>
          )}
        </section>

        {/* Education */}
        {education && education.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {education.map((edu, i) => (
              <p key={i} className="education-item">
                <strong>{edu.degree}</strong> — {edu.institution}
                {edu.year && ` (${edu.year})`}
              </p>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
