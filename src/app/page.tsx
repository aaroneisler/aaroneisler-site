"use client";

import { useState } from "react";
import AIChatModal from "@/components/AIChatModal";
import ExperienceCard from "@/components/ExperienceCard";
import SkillsMatrix from "@/components/SkillsMatrix";
import FitAssessment from "@/components/FitAssessment";
import HighlightPill from "@/components/HighlightPill";
import { profile, experience, skills, education } from "@/data/profile";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8" style={{ paddingTop: '2.618rem', paddingBottom: '2.618rem' }}>
        {/* Headshot - positioned left on desktop, overlapping content */}
        <div className="hidden lg:block absolute left-[5%] xl:left-[8%] top-1/2 -translate-y-1/2">
          <img
            src="/headshot.png"
            alt="Aaron Eisler"
            className="w-72 h-72 xl:w-80 xl:h-80 rounded-full object-cover"
            style={{
              border: '3px solid var(--border)',
              boxShadow: 'var(--shadow-lg)'
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Mobile headshot - centered */}
          <div className="lg:hidden flex justify-center" style={{ marginBottom: 'var(--space-xl)' }}>
            <img
              src="/headshot.png"
              alt="Aaron Eisler"
              className="w-48 h-48 rounded-full object-cover"
              style={{
                border: '3px solid var(--border)',
                boxShadow: 'var(--shadow-lg)'
              }}
            />
          </div>

          {/* Name and title - always centered */}
          <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
            <h1
              className="font-bold tracking-tight"
              style={{ fontSize: 'clamp(2.618rem, 5vw, 4.236rem)', marginBottom: 'var(--space-sm)' }}
            >
              {profile.name}
            </h1>
            <p
              className="font-medium"
              style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--accent)',
                marginBottom: 'var(--space-sm)'
              }}
            >
              {profile.subtitle}
            </p>
            <p style={{ color: 'var(--secondary)' }}>{profile.location}</p>
          </div>

          {/* Company links */}
          <div
            className="flex justify-center items-center flex-wrap"
            style={{ gap: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}
          >
            {profile.companies.map((company, index) => (
              <button
                key={index}
                onClick={() => {
                  document.getElementById(company.experienceId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="font-medium uppercase transition-all cursor-pointer breathing-glow hover-accent"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--secondary)',
                  letterSpacing: '0.15em',
                  opacity: 0.6,
                  background: 'none',
                  border: 'none',
                  padding: '0.618em 1em',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                {company.name}
              </button>
            ))}
          </div>

          <div className="text-center">
            {/* CTA Buttons - Row 1: Links */}
            <div className="flex flex-col sm:flex-row justify-center" style={{ gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] hover-accent"
                style={{
                  padding: '0.786em 1.618em',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface)'
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/aaroneisler?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] hover-accent"
                style={{
                  padding: '0.786em 1.618em',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface)'
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                AI Agents
              </a>
              <a
                href="/resume"
                className="font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] hover-accent"
                style={{
                  padding: '0.786em 1.618em',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface)'
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
            {/* Row 2: AI Chat Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsChatOpen(true)}
                className="font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] rainbow-border"
                style={{
                  padding: '1.272em 2.618em',
                  background: '#1a1a2e',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Ask AI About Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section
        className="px-6 lg:px-8"
        style={{ background: 'var(--surface)', paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-bold text-center"
            style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)' }}
          >
            Professional Summary
          </h2>
          <p
            className="leading-relaxed text-center"
            style={{
              color: 'var(--secondary)',
              lineHeight: 'var(--phi)'
            }}
          >
            {profile.summary}
          </p>

          {/* Key highlights */}
          <div className="flex flex-wrap justify-center" style={{ gap: 'var(--space-sm)', marginTop: 'var(--space-lg)' }}>
            {profile.highlights.map((highlight, index) => (
              <HighlightPill
                key={index}
                index={index}
                headline={highlight.headline}
                story={highlight.story}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="px-6 lg:px-8" id="experience" style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2
              className="font-bold"
              style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}
            >
              Experience
            </h2>
            <p style={{ color: 'var(--secondary)' }}>
              Click "View AI Context" on any role for the full story behind the
              bullet points
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {experience.map((exp) => (
              <div key={exp.id} id={exp.id}>
                <ExperienceCard
                  company={exp.company}
                  role={exp.role}
                  period={exp.period}
                  bullets={exp.bullets}
                  aiContext={exp.aiContext}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        className="px-6 lg:px-8"
        id="skills"
        style={{ background: 'var(--surface)', paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2
              className="font-bold"
              style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}
            >
              Skills & Capabilities
            </h2>
            <p style={{ color: 'var(--secondary)' }}>
              An honest assessment — including the gaps
            </p>
          </div>

          <SkillsMatrix skills={skills} />
        </div>
      </section>

      {/* Fit Assessment Section */}
      <section className="px-6 lg:px-8" id="fit" style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2
              className="font-bold"
              style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}
            >
              Am I Right for Your Role?
            </h2>
            <p style={{ color: 'var(--secondary)' }}>
              Paste a job description and get an honest fit assessment. My time
              is valuable — and so is yours.
            </p>
          </div>

          <FitAssessment />
        </div>
      </section>

      {/* Education Section */}
      <section
        className="px-6 lg:px-8"
        id="education"
        style={{ background: 'var(--surface)', paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-bold text-center"
            style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-xl)' }}
          >
            Education & Certifications
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-md)' }}>
            {education.map((edu, index) => (
              <div
                key={index}
                className="transition-all hover:scale-[1.01] breathing-glow-strong"
                style={{
                  padding: 'var(--space-lg)',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <h3 className="font-semibold">{edu.degree}</h3>
                {edu.institution && (
                  <p
                    className="text-sm"
                    style={{ color: 'var(--secondary)' }}
                  >
                    {edu.institution}
                  </p>
                )}
                <p
                  className="text-sm"
                  style={{ color: 'var(--secondary)' }}
                >
                  {edu.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="px-6 lg:px-8" id="articles" style={{ background: 'var(--surface)', paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}>
        <div className="flex justify-center">
          <a
            href="https://www.linkedin.com/in/aaroneisler/recent-activity/articles/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium flex items-center gap-2 transition-all hover:scale-[1.02] hover-accent"
            style={{
              padding: '0.786em 1.618em',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--card)'
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Read My Articles
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 lg:px-8" id="contact" style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-bold"
            style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}
          >
            Let's Connect
          </h2>
          <p
            style={{ color: 'var(--secondary)', marginBottom: 'var(--space-xl)' }}
          >
            Interested in discussing how I can contribute to your organisation?
          </p>

          <div className="flex flex-col sm:flex-row justify-center" style={{ gap: 'var(--space-md)' }}>
            <a
              href={`mailto:${profile.email}`}
              className="font-medium transition-all hover:scale-[1.02] active:scale-[0.98] hover-invert"
              style={{
                padding: '0.786em 1.618em',
                background: '#ffffff',
                color: '#1a1a2e',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-all hover:scale-[1.02] active:scale-[0.98] hover-accent"
              style={{
                padding: '0.786em 1.618em',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--surface)'
              }}
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6"
        style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
      >
        <div
          className="max-w-4xl mx-auto text-center text-sm"
          style={{ color: 'var(--secondary)' }}
        >
          <p>© {new Date().getFullYear()} Aaron Eisler</p>
        </div>
      </footer>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}
