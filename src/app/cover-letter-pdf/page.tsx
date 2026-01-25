"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { profile } from "@/data/profile";

function CoverLetterContent() {
  const searchParams = useSearchParams();

  // Get parameters from URL
  const company = searchParams.get("company") || "Hiring Team";
  const jobTitle = searchParams.get("jobTitle") || "the position";
  const content = searchParams.get("content") || "";
  const date = searchParams.get("date") || new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Decode content (it's URL encoded)
  const decodedContent = decodeURIComponent(content);
  const paragraphs = decodedContent.split("\n\n").filter(p => p.trim());

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print button - hidden when printing */}
      <div className="print:hidden fixed top-6 right-6 z-50 flex gap-3">
        <a
          href="/jobhunter"
          className="px-4 py-2 text-sm font-medium transition-all hover:scale-105"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          Back to Job Hunter
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

      {/* Cover Letter Content */}
      <div className="cover-letter-container">
        {/* Header - matching resume style */}
        <header className="cover-letter-header">
          <div className="header-content">
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

        {/* Date */}
        <p className="letter-date">{date}</p>

        {/* Salutation */}
        <p className="salutation">Dear {company} Hiring Team,</p>

        {/* Body */}
        <div className="letter-body">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Closing */}
        <div className="letter-closing">
          <p>Regards,</p>
          <p className="signature">{profile.name}</p>
        </div>

        {/* CTA */}
        <div className="letter-cta">
          <p>Questions? Feel free to ask me anything at <span className="link">aaroneisler.com.au</span></p>
        </div>
      </div>

      {/* Print Styles - matching resume */}
      <style jsx global>{`
        @media screen {
          .cover-letter-container {
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

          .cover-letter-container {
            padding: 0;
          }
        }

        .cover-letter-container {
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1a1a1a;
          line-height: 1.6;
          font-size: 10.5pt;
        }

        .cover-letter-header {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #1a1a1a;
        }

        .cover-letter-header .header-content {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .cover-letter-header .header-text {
          flex: 1;
        }

        .cover-letter-header h1 {
          font-size: 28pt;
          font-weight: 700;
          margin: 0 0 4px 0;
          letter-spacing: 0.02em;
          color: #0a0a0a;
        }

        .cover-letter-header .subtitle {
          font-size: 12pt;
          color: #0d9488;
          font-weight: 500;
          margin: 0 0 8px 0;
          letter-spacing: 0.05em;
        }

        .cover-letter-header .contact-info {
          font-size: 9.5pt;
          color: #444;
        }

        .cover-letter-header .contact-info .divider {
          margin: 0 8px;
          color: #999;
        }

        .letter-date {
          color: #666;
          margin: 0 0 24px 0;
          font-size: 10pt;
        }

        .salutation {
          margin: 0 0 16px 0;
          font-weight: 500;
        }

        .letter-body {
          margin-bottom: 24px;
        }

        .letter-body p {
          margin: 0 0 16px 0;
          text-align: justify;
          color: #333;
        }

        .letter-body p:last-child {
          margin-bottom: 0;
        }

        .letter-closing {
          margin-top: 32px;
        }

        .letter-closing p {
          margin: 0;
        }

        .letter-closing .signature {
          font-weight: 700;
          margin-top: 24px;
          color: #0a0a0a;
        }

        .letter-cta {
          margin-top: 32px;
          padding-top: 16px;
          border-top: 1px solid #e5e5e5;
        }

        .letter-cta p {
          margin: 0;
          font-size: 9.5pt;
          color: #666;
        }

        .letter-cta .link {
          color: #0d9488;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}

export default function CoverLetterPDFPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoverLetterContent />
    </Suspense>
  );
}
