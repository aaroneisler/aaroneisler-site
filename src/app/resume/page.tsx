"use client";

import { useEffect } from "react";
import ResumeView from "@/components/ResumeView";

export default function ResumePage() {
  useEffect(() => {
    // Auto-download the PDF when page loads
    const link = document.createElement("a");
    link.href = "/Aaron_Eisler_Resume.pdf";
    link.download = "Aaron_Eisler_Resume.pdf";
    link.click();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      paddingTop: '20px',
      paddingBottom: '40px',
    }}>
      {/* Back link */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', marginBottom: '20px' }}>
        <a
          href="/"
          style={{
            color: '#1EBAB1',
            textDecoration: 'none',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ← Back to aaroneisler.com.au
        </a>
      </div>

      {/* Resume container with shadow */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
      }}>
        <ResumeView />
      </div>

      {/* Download reminder */}
      <div style={{
        maxWidth: '900px',
        margin: '20px auto 0',
        padding: '0 20px',
        textAlign: 'center',
        color: '#718096',
        fontSize: '14px',
      }}>
        PDF downloaded automatically. <a href="/Aaron_Eisler_Resume.pdf" download style={{ color: '#1EBAB1' }}>Download again</a>
      </div>
    </div>
  );
}
