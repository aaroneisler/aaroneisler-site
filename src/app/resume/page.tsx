"use client";

import { useEffect } from "react";

export default function ResumePage() {
  useEffect(() => {
    // Auto-download the PDF when page loads
    const link = document.createElement("a");
    link.href = "/Aaron_Eisler_Resume.pdf";
    link.download = "Aaron_Eisler_Resume.pdf";
    link.click();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Downloading Resume...
      </h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Your download should start automatically.
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <a
          href="/Aaron_Eisler_Resume.pdf"
          download="Aaron_Eisler_Resume.pdf"
          style={{
            padding: "0.75rem 1.5rem",
            background: "#0d9488",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Download Again
        </a>
        <a
          href="/"
          style={{
            padding: "0.75rem 1.5rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#333",
          }}
        >
          Back to Site
        </a>
      </div>
    </div>
  );
}
