"use client";

import { profile, experience, skills, education } from "@/data/profile";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print button - hidden when printing */}
      <div className="print:hidden fixed top-6 right-6 z-50 flex gap-3">
        <a
          href="/"
          className="px-4 py-2 text-sm font-medium transition-all hover:scale-105"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          Back to Site
        </a>
        <button
          onClick={handlePrint}
          className="px-4 py-2 text-sm font-medium transition-all hover:scale-105"
          style={{
            background: 'var(--accent)',
            color: 'var(--on-accent)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          Save as PDF
        </button>
      </div>

      {/* Resume Content */}
      <div className="resume-container">
        {/* Header */}
        <header className="resume-header">
          <div className="header-content">
            <img
              src="/headshot.png"
              alt="Aaron Eisler"
              className="resume-photo"
            />
            <div className="header-text">
              <h1>{profile.name}</h1>
              <p className="subtitle">{profile.subtitle}</p>
              <div className="contact-info">
                <span>{profile.location}</span>
                <span className="divider">|</span>
                <span>{profile.email}</span>
                <span className="divider">|</span>
                <span>{profile.phone}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="resume-section">
          <h2>Executive Summary</h2>
          <p className="summary-text">{profile.summary}</p>
        </section>

        {/* Key Achievements */}
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

        {/* Experience */}
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
        <section className="resume-section">
          <h2>Core Competencies</h2>
          <div className="skills-grid">
            <div>
              <h4>Strong</h4>
              <p>{skills.strong.join(" • ")}</p>
            </div>
            <div>
              <h4>Proficient</h4>
              <p>{skills.moderate.join(" • ")}</p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="resume-section">
          <h2>Education & Certifications</h2>
          <div className="education-grid">
            {education.map((edu, i) => (
              <div key={i} className="education-item">
                <strong>{edu.degree}</strong>
                {edu.institution && <span> — {edu.institution}</span>}
                <span className="year"> ({edu.year})</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media screen {
          .resume-container {
            max-width: 850px;
            margin: 0 auto;
            padding: 60px 40px;
            background: white;
            min-height: 100vh;
          }
        }

        @media print {
          @page {
            size: A4;
            margin: 0.6in 0.7in;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .resume-container {
            padding: 0;
          }
        }

        .resume-container {
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1a1a1a;
          line-height: 1.5;
          font-size: 10.5pt;
        }

        .resume-header {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #1a1a1a;
        }

        .resume-header .header-content {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .resume-header .resume-photo {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e5e5e5;
        }

        .resume-header .header-text {
          flex: 1;
        }

        .resume-header h1 {
          font-size: 28pt;
          font-weight: 700;
          margin: 0 0 4px 0;
          letter-spacing: 0.02em;
          color: #0a0a0a;
        }

        .resume-header .subtitle {
          font-size: 12pt;
          color: #0d9488;
          font-weight: 500;
          margin: 0 0 8px 0;
          letter-spacing: 0.05em;
        }

        .resume-header .contact-info {
          font-size: 9.5pt;
          color: #444;
        }

        .resume-header .contact-info .divider {
          margin: 0 8px;
          color: #999;
        }

        .resume-section {
          margin-bottom: 20px;
        }

        .resume-section h2 {
          font-size: 11pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #0d9488;
          margin: 0 0 10px 0;
          padding-bottom: 4px;
          border-bottom: 1px solid #e5e5e5;
        }

        .summary-text {
          margin: 0;
          text-align: justify;
          color: #333;
        }

        .achievements-list {
          margin: 0;
          padding-left: 18px;
        }

        .achievements-list li {
          margin-bottom: 6px;
          color: #333;
        }

        .achievements-list li strong {
          color: #1a1a1a;
        }

        .experience-item {
          margin-bottom: 16px;
          page-break-inside: avoid;
        }

        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 6px;
        }

        .experience-header h3 {
          font-size: 11pt;
          font-weight: 700;
          margin: 0;
          color: #1a1a1a;
        }

        .experience-header .company {
          font-size: 10.5pt;
          color: #0d9488;
          margin: 0;
          font-weight: 500;
        }

        .experience-header .period {
          font-size: 9.5pt;
          color: #666;
          white-space: nowrap;
        }

        .bullet-list {
          margin: 0;
          padding-left: 18px;
        }

        .bullet-list li {
          margin-bottom: 3px;
          color: #333;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .skills-grid h4 {
          font-size: 10pt;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #1a1a1a;
        }

        .skills-grid p {
          margin: 0;
          color: #444;
          font-size: 9.5pt;
        }

        .education-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 24px;
        }

        .education-item {
          font-size: 10pt;
          color: #333;
        }

        .education-item strong {
          color: #1a1a1a;
        }

        .education-item .year {
          color: #666;
        }
      `}</style>
    </>
  );
}
