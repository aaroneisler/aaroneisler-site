"use client";

import ResumeView from "@/components/ResumeView";

/**
 * Print-optimized page for PDF generation via Playwright.
 * Renders ResumeView without navigation or download UI.
 */
export default function ResumePrintPage() {
  return (
    <div style={{
      background: 'white',
      minHeight: '100vh',
    }}>
      <ResumeView />
    </div>
  );
}
