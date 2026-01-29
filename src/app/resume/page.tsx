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
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      <iframe 
        src="/resume_view.html" 
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Aaron Eisler Resume"
      />
    </div>
  );
}
