"use client";

import { useState } from "react";

interface HighlightPillProps {
  headline: string;
  story: string;
}

export default function HighlightPill({ headline, story }: HighlightPillProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The pill */}
      <span
        className="text-sm font-medium transition-all cursor-pointer inline-block"
        style={{
          padding: '0.618em 1.272em',
          background: isHovered ? 'var(--accent)' : 'var(--surface)',
          color: isHovered ? 'var(--on-accent)' : 'inherit',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-full)',
          boxShadow: isHovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        {headline}
      </span>

      {/* The story tooltip */}
      {isHovered && (
        <div
          className="absolute left-1/2 z-50 animate-fade-in"
          style={{
            top: 'calc(100% + var(--space-sm))',
            transform: 'translateX(-50%)',
            width: 'max(280px, 100%)',
            maxWidth: '360px',
            padding: 'var(--space-md)',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '12px',
              height: '12px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderBottom: 'none',
              borderRight: 'none',
            }}
          />
          <p
            className="text-sm relative"
            style={{
              color: 'var(--secondary)',
              lineHeight: 'var(--phi)',
            }}
          >
            {story}
          </p>
        </div>
      )}
    </div>
  );
}
