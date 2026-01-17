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
      <section className="relative py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero content with photo */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mb-12">
            {/* Headshot */}
            <div className="flex-shrink-0">
              <img
                src="/headshot.png"
                alt="Aaron Eisler"
                className="w-52 h-52 md:w-64 md:h-64 rounded-full object-cover shadow-lg"
                style={{
                  border: '3px solid var(--border)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              />
            </div>

            {/* Name and title */}
            <div className="text-center md:text-left">
              <h1
                className="font-bold mb-3 tracking-tight"
                style={{ fontSize: 'clamp(2.618rem, 5vw, 4.236rem)' }}
              >
                {profile.name}
              </h1>
              <p
                className="font-medium mb-3"
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--accent)'
                }}
              >
                {profile.subtitle}
              </p>
              <p style={{ color: 'var(--secondary)' }}>{profile.location}</p>
            </div>
          </div>

          {/* Company logos */}
          <div
            className="flex justify-center items-center flex-wrap gap-6 mb-10"
            style={{ opacity: 0.5 }}
          >
            {profile.companies.slice(0, 4).map((company, index) => (
              <span
                key={index}
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--secondary)', letterSpacing: '0.1em' }}
              >
                {company}
              </span>
            ))}
          </div>

          <div className="text-center">
            {/* Key highlights */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {profile.highlights.map((highlight, index) => (
                <HighlightPill
                  key={index}
                  headline={highlight.headline}
                  story={highlight.story}
                />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setIsChatOpen(true)}
                className="font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  padding: '0.786em 1.618em',
                  background: 'var(--primary)',
                  color: 'var(--on-primary)',
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
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
                href="/resume"
                className="font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section
        className="py-16 px-6 lg:px-8"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-bold mb-8 text-center"
            style={{ fontSize: 'var(--text-2xl)' }}
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
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-6 lg:px-8" id="experience">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-bold mb-3"
              style={{ fontSize: 'var(--text-2xl)' }}
            >
              Experience
            </h2>
            <p style={{ color: 'var(--secondary)' }}>
              Click "View AI Context" on any role for the full story behind the
              bullet points
            </p>
          </div>

          <div className="space-y-6">
            {experience.map((exp) => (
              <ExperienceCard
                key={exp.id}
                company={exp.company}
                role={exp.role}
                period={exp.period}
                bullets={exp.bullets}
                aiContext={exp.aiContext}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        className="py-16 px-6 lg:px-8"
        id="skills"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-bold mb-3"
              style={{ fontSize: 'var(--text-2xl)' }}
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
      <section className="py-16 px-6 lg:px-8" id="fit">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-bold mb-3"
              style={{ fontSize: 'var(--text-2xl)' }}
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
        className="py-16 px-6 lg:px-8"
        id="education"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-bold mb-10 text-center"
            style={{ fontSize: 'var(--text-2xl)' }}
          >
            Education & Certifications
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="transition-all hover:scale-[1.01]"
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

      {/* Contact Section */}
      <section className="py-16 px-6 lg:px-8" id="contact">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'var(--text-2xl)' }}
          >
            Let's Connect
          </h2>
          <p
            className="mb-10"
            style={{ color: 'var(--secondary)' }}
          >
            Interested in discussing how I can contribute to your organisation?
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                padding: '0.786em 1.618em',
                background: 'var(--accent)',
                color: 'var(--on-accent)',
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
              className="font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
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
        className="py-10 px-6"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div
          className="max-w-4xl mx-auto text-center text-sm"
          style={{ color: 'var(--secondary)' }}
        >
          <p>© {new Date().getFullYear()} Aaron Eisler. Built with AI-assisted development.</p>
        </div>
      </footer>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}
