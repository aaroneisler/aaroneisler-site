"use client";

import { useState } from "react";
import AIChatModal from "@/components/AIChatModal";
import ExperienceCard from "@/components/ExperienceCard";
import SkillsMatrix from "@/components/SkillsMatrix";
import FitAssessment from "@/components/FitAssessment";
import { profile, experience, skills, education } from "@/data/profile";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headshot */}
          <div className="mb-8">
            <img
              src="/headshot.png"
              alt="Aaron Eisler"
              className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-[var(--border)] shadow-lg"
            />
          </div>

          {/* Company logos */}
          <div className="flex justify-center items-center gap-6 mb-8 opacity-60">
            {profile.companies.slice(0, 4).map((company, index) => (
              <span
                key={index}
                className="text-xs font-medium text-[var(--secondary)] uppercase tracking-wider"
              >
                {company}
              </span>
            ))}
          </div>

          {/* Name and title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {profile.name}
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--primary)] font-medium mb-4">
            {profile.subtitle}
          </p>
          <p className="text-[var(--secondary)] mb-8">{profile.location}</p>

          {/* Key highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {profile.highlights.map((highlight, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-full text-sm"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-8 py-4 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--primary-light)] transition-colors font-medium flex items-center justify-center gap-2"
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
              className="px-8 py-4 border border-[var(--border)] rounded-xl hover:bg-[var(--card)] transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--card)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Professional Summary
          </h2>
          <p className="text-[var(--secondary)] leading-relaxed text-center">
            {profile.summary}
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="experience">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Experience</h2>
            <p className="text-[var(--secondary)]">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--card)]" id="skills">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Skills & Capabilities</h2>
            <p className="text-[var(--secondary)]">
              An honest assessment — including the gaps
            </p>
          </div>

          <SkillsMatrix skills={skills} />
        </div>
      </section>

      {/* Fit Assessment Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="fit">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Am I Right for Your Role?</h2>
            <p className="text-[var(--secondary)]">
              Paste a job description and get an honest fit assessment. My time
              is valuable — and so is yours.
            </p>
          </div>

          <FitAssessment />
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--card)]" id="education">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Education & Certifications
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl"
              >
                <h3 className="font-medium">{edu.degree}</h3>
                {edu.institution && (
                  <p className="text-sm text-[var(--secondary)]">
                    {edu.institution}
                  </p>
                )}
                <p className="text-sm text-[var(--secondary)]">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="contact">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
          <p className="text-[var(--secondary)] mb-8">
            Interested in discussing how I can contribute to your organisation?
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--primary-light)] transition-colors"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[var(--border)] rounded-xl hover:bg-[var(--card)] transition-colors"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto text-center text-sm text-[var(--secondary)]">
          <p>© {new Date().getFullYear()} Aaron Eisler. Built with AI-assisted development.</p>
        </div>
      </footer>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}
