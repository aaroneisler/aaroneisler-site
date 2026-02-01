# SPEC-024: Resume Page - React Component Conversion

**Status:** COMPLETED
**Owner:** Bob
**Created:** 2026-01-29
**Completed:** 2026-01-30

---

## Goal

Fix the blank `/resume` page by converting the static HTML resume to a native React component. The current iframe approach is blocked by `X-Frame-Options: DENY` security headers.

## Input

- Existing static HTML: `public/resume_view.html`
- Existing CSS: `public/style.css`
- Existing PDF: `public/Aaron_Eisler_Resume.pdf`
- Headshot: `public/headshot.png`

## Output

- New React component: `src/components/ResumeView.tsx`
- Updated page: `src/app/resume/page.tsx`
- Resume displays on page load AND PDF auto-downloads

## Success Criteria

- [ ] Visiting `aaroneisler.com.au/resume` shows the full styled resume
- [ ] PDF automatically downloads on page visit
- [ ] Resume styling matches the PDF (teal headers, Poppins font, same layout)
- [ ] Headshot displays correctly (circular, 104px)
- [ ] Page is responsive on mobile
- [ ] No console errors
- [ ] No changes to security headers required

## Constraints

- DO NOT modify `next.config.ts` security headers
- DO NOT use iframes
- Keep the existing PDF file as-is
- Use Poppins font from Google Fonts (add to CSP if needed, but component should work without it as fallback)

## Escalation Triggers

- If CSP blocks Google Fonts and fallback looks bad → Ask Geoff
- If styling differs significantly from PDF → Ask Aaron

---

## Build Instructions

### Prerequisites
- [ ] Access to aaroneisler-site repo
- [ ] Node.js installed

### Steps

#### Step 1: Create the Resume Component

Create `src/components/ResumeView.tsx`:

```tsx
"use client";

// Resume content - matches public/resume_view.html exactly
// Styled with inline styles to avoid CSS conflicts

export default function ResumeView() {
  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      fontSize: '10pt',
      lineHeight: 1.5,
      color: '#2D3748',
      background: 'white',
      padding: '40px 50px',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
        marginBottom: '25px',
        paddingBottom: '20px',
      }}>
        <img
          src="/headshot.png"
          alt="Aaron Eisler"
          style={{
            width: '104px',
            height: '104px',
            borderRadius: '50%',
            flexShrink: 0,
            objectFit: 'cover',
          }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '32pt',
            fontWeight: 700,
            color: '#2D3748',
            marginBottom: '2px',
            lineHeight: 1.1,
            margin: 0,
          }}>Aaron Eisler</h1>
          <div style={{
            fontSize: '12pt',
            fontWeight: 500,
            color: '#1EBAB1',
            marginBottom: '8px',
          }}>Technology Executive | CIO / CTO / COO | AI & Automation</div>
          <div style={{ fontSize: '9pt', color: '#718096' }}>
            <span>Sydney, Australia</span>
            <span style={{ margin: '0 5px' }}>|</span>
            <span>aeisler@gmail.com</span>
            <span style={{ margin: '0 5px' }}>|</span>
            <span>0429 555 885</span>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <SectionHeader>Executive Summary</SectionHeader>
      <p style={summaryStyle}>
        Technology executive with 25 years of experience leading enterprise transformation, AI strategy, and operational excellence across financial services, telecommunications, and technology sectors. Proven track record as a multi-million dollar P&L owner, integrating 11 acquired companies into unified operating models while delivering measurable EBITDA improvements. Deep expertise spanning technology strategy, digital transformation, and AI-driven innovation with demonstrated ability to translate complex technology initiatives into sustainable business value.
      </p>
      <p style={summaryStyle}>
        Known for building high-performing teams and establishing governance frameworks that balance innovation with enterprise-grade compliance. Experience ranges from founding AI-focused ventures to leading operations for ASX-listed organisations, always with hands-on technical credibility alongside strategic vision. Equally effective engaging boards and investors as leading engineering teams through complex transformations. Calm decision-maker during crisis, including cyber incidents and critical infrastructure events.
      </p>

      {/* Key Achievements */}
      <SectionHeader>Key Achievements</SectionHeader>
      <Achievement
        title="$200 Million Dollar P&L Owner"
        desc="Full accountability for operations portfolio including technology investment decisions, AI initiatives, and stakeholder engagement with enterprise clients, driving 2% EBITDA improvement."
      />
      <Achievement
        title="$12M AI Platform Builder"
        desc="Built Telstra's automation and robotics practice from scratch, creating strategy, governance framework, and commercial model delivering $12M productivity gains across Big 4 banks."
      />
      <Achievement
        title="11-Company Integration"
        desc="Led organisation-wide transformation integrating 11 acquired companies into unified operating model with standardised data architecture, technology platforms, and governance."
      />
      <Achievement
        title="Big 4 Banking Relationships"
        desc="Served as Client CTO for CBA and won automation platform adoption across all Big 4 banks (CBA, NAB, Westpac, ANZ), demonstrating deep financial services credibility."
      />
      <Achievement
        title="Board & Executive Governance"
        desc="Chaired Architecture Review Boards, led Steering Committees, and delivered executive reporting to boards and senior stakeholders across financial services and enterprise clients."
      />

      {/* Professional Experience */}
      <SectionHeader style={{ marginTop: '40px' }}>Professional Experience</SectionHeader>

      <Job
        title="Principal Consultant / Founder"
        company="MadeAI"
        dates="Nov 2025 – Present"
        bullets={[
          "Lead Consultant for Visy's $1B Yatala Recycling project, developing an AI-powered Contract Variation Tool processing $70M in variations annually.",
          "Engaged by Blueseas Wholesalers to architect a voice-driven AI bot for ERP integration, enabling 24/7 ordering and reducing order latency by 15 minutes per transaction.",
          "Providing interim executive leadership and high-impact AI consultancy to operationalise AI safely, ensuring systems are governed by design and aligned with measurable business outcomes.",
          "Founded to support organisations in adopting responsible, secure, and simple AI workflows, bridging the gap between cutting-edge technology and practical operational reality.",
        ]}
      />

      <Job
        title="Group Executive - Operations"
        company="Orro Group"
        dates="Oct 2023 – Nov 2025"
        bullets={[
          "Owned $AUD200mil P&L as member of Executive Leadership Team, partnering closely with CEO, board, and investors to drive technology strategy and business growth.",
          "Led organisation-wide AI adoption program deploying solutions for contract analysis, billing integrity, presales automation, and renewal forecasting across business units.",
          "Drove change management strategy integrating 11 acquired companies into unified operating model with standardised data architecture and technology platforms.",
          "Delivered 2% EBITDA improvement through technology-enabled operational transformation, directly contributing to investor returns and business value creation.",
          "Managed regulatory compliance and cybersecurity across multi-cloud environment, ensuring governance frameworks met enterprise banking and government requirements.",
          "Partnered with senior stakeholders including board members and enterprise clients to prioritise technology initiatives, influence strategic decisions, and secure buy-in for transformation programs.",
          "Coordinated internal delivery teams and third-party vendors across network, cloud, cyber, and collaboration domains ensuring successful program outcomes and service quality.",
        ]}
      />

      <Job
        title="Chief Operating Officer & Chief Technology Officer"
        company="AetherX"
        dates="Jul 2022 – Sep 2023"
        bullets={[
          "Led technology strategy and operations for venture-backed startup, building cloud-native architecture and engineering team that generated $2M revenue within 18 months.",
          "Established operational foundations including governance frameworks, delivery processes, and vendor management enabling rapid scale while maintaining quality standards.",
          "Engaged directly with investors and board on technology roadmap, translating complex technical initiatives into clear strategic communications and securing funding.",
          "Built and led cross-functional team across engineering, product, and operations, fostering culture of innovation balanced with commercial discipline and delivery focus.",
        ]}
      />

      <Job
        title="Senior Leadership Roles - Technology & Operations"
        company="Telstra"
        dates="Jun 2015 – Jul 2022"
        bullets={[
          "Built automation and robotics practice from scratch delivering $12M value in year one, creating strategy, framework, commercial model, and winning Big 4 bank adoption.",
          "Served as Chief Architect for Department of Defence and Client CTO for CBA, managing critical relationships and delivering enterprise transformation programs.",
          "Won and delivered Australia's first Arista Software Defined Network ($27M) for major enterprise client, demonstrating end-to-end delivery capability at scale.",
          "Led response to cyber incidents and critical infrastructure events, demonstrating calm decision-making under pressure with clear executive communication.",
          "Established Telstra's AI partnership with Accenture, building foundations for automation strategy that transformed enterprise service delivery capabilities.",
        ]}
      />

      <Job
        title="Chief Technology Officer - Woolworths Account"
        company="NTT/Dimension Data"
        dates="Sep 2010 – Jun 2015"
        bullets={[
          "Served as CTO for Australia's largest retailer, owning architecture strategy, PCI compliance, and technology roadmap across complex multi-vendor environment.",
          "Delivered Australia's first Cisco ACI deployment ($1M CAPEX) achieving 25% OPEX reduction while generating $700K services revenue from compliance initiatives.",
          "Grew account revenue 35% while maintaining margin through trusted advisor relationship and consistent delivery of strategic technology initiatives.",
        ]}
      />

      {/* Core Competencies */}
      <SectionHeader>Core Competencies</SectionHeader>
      <div style={{ display: 'flex', gap: '40px', marginTop: '10px' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '10pt', fontWeight: 600, color: '#2D3748', marginBottom: '8px', margin: 0 }}>Strong</h3>
          <p style={{ fontSize: '9.5pt', lineHeight: 1.7, margin: 0 }}>
            Technology Strategy • AI & Data Analytics • Digital Transformation • P&L Management ($200M) • Enterprise Architecture • Board & Executive Communication • Team Leadership (100+) • Change Management
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '10pt', fontWeight: 600, color: '#2D3748', marginBottom: '8px', margin: 0 }}>Proficient</h3>
          <p style={{ fontSize: '9.5pt', lineHeight: 1.7, margin: 0 }}>
            Cloud Architecture (Azure, AWS) • Cybersecurity • M&A Integration • Regulatory Compliance • Vendor Management • Agile/DevOps • TOGAF • ITIL
          </p>
        </div>
      </div>

      {/* Education */}
      <SectionHeader>Education & Certifications</SectionHeader>
      <div style={{ display: 'flex', gap: '40px', marginTop: '10px' }}>
        <div style={{ flex: 1 }}>
          <strong style={{ fontWeight: 600 }}>MBA</strong> — <span style={{ fontSize: '9.5pt' }}>UNSW Sydney (2014)</span>
        </div>
        <div style={{ flex: 1 }}>
          <strong style={{ fontWeight: 600 }}>SAFe Product Manager</strong> — <span style={{ fontSize: '9.5pt' }}>Scaled Agile (2019)</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '40px', marginTop: '8px' }}>
        <div style={{ flex: 1 }}>
          <strong style={{ fontWeight: 600 }}>TOGAF V9.1</strong> — <span style={{ fontSize: '9.5pt' }}>The Open Group (2014)</span>
        </div>
        <div style={{ flex: 1 }}>
          <strong style={{ fontWeight: 600 }}>ITIL V3 Foundations</strong> — <span style={{ fontSize: '9.5pt' }}>AXELOS (2011)</span>
        </div>
      </div>

      {/* Key Skills */}
      <SectionHeader>Key Skills</SectionHeader>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '4px 20px',
        marginTop: '10px',
        fontSize: '9.5pt',
      }}>
        {[
          'Technology Strategy', 'AI Strategy', 'P&L Management',
          'Digital Transformation', 'Enterprise Architecture', 'Cloud Architecture',
          'Cybersecurity', 'Change Management', 'Team Leadership',
          'Board Communication', 'Vendor Management', 'M&A Integration',
          'Regulatory Compliance', 'Agile', 'DevOps',
          'TOGAF', 'ITIL', 'Data Analytics',
        ].map((skill, i) => (
          <span key={i} style={{ padding: '2px 0' }}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

// Helper components
const SectionHeader = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h2 style={{
    fontSize: '11pt',
    fontWeight: 600,
    color: '#1EBAB1',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginTop: '20px',
    marginBottom: '10px',
    paddingBottom: '5px',
    borderBottom: '2px solid #1EBAB1',
    ...style,
  }}>{children}</h2>
);

const summaryStyle: React.CSSProperties = {
  fontSize: '10pt',
  lineHeight: 1.6,
  color: '#2D3748',
  marginBottom: '15px',
};

const Achievement = ({ title, desc }: { title: string; desc: string }) => (
  <div style={{ marginBottom: '10px', lineHeight: 1.5 }}>
    <span style={{ fontWeight: 600 }}><strong>{title}</strong></span> —{' '}
    <span style={{ fontWeight: 400 }}>{desc}</span>
  </div>
);

const Job = ({ title, company, dates, bullets }: {
  title: string;
  company: string;
  dates: string;
  bullets: string[]
}) => (
  <div style={{ marginBottom: '18px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
      <span style={{ fontSize: '11pt', fontWeight: 600, color: '#2D3748' }}>{title}</span>
      <span style={{ fontSize: '9pt', color: '#718096', fontStyle: 'italic' }}>{dates}</span>
    </div>
    <div style={{ fontSize: '10pt', color: '#1EBAB1', marginBottom: '6px' }}>{company}</div>
    <ul style={{ marginLeft: '15px', paddingLeft: 0 }}>
      {bullets.map((bullet, i) => (
        <li key={i} style={{ marginBottom: '4px', fontSize: '9.5pt', lineHeight: 1.5 }}>{bullet}</li>
      ))}
    </ul>
  </div>
);
```

#### Step 2: Update the Resume Page

Replace `src/app/resume/page.tsx`:

```tsx
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
```

#### Step 3: Add Poppins Font (Optional Enhancement)

Add to `src/app/layout.tsx` in the `<head>`:

```tsx
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

And update `next.config.ts` CSP to allow Google Fonts:

```typescript
// In the font-src line, change:
"font-src 'self' data:",
// To:
"font-src 'self' data: https://fonts.gstatic.com",

// And add to style-src:
"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
```

#### Step 4: Test Locally

```bash
cd /Users/aaron/Library/CloudStorage/OneDrive-MadeAI/AI/aaroneisler-site
npm run dev
# Visit http://localhost:3000/resume
```

#### Step 5: Deploy

```bash
git add -A
git commit -m "feat(resume): convert to React component, fix blank page

- Replace iframe with native React component
- Fixes X-Frame-Options: DENY blocking issue
- Keep auto-download PDF on page load
- Add back navigation and download reminder

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

git push origin main
```

### Build Log Location
`aaroneisler-site/docs/build_logs/SPEC-024/`

---

## Test Instructions

### Manual Tests
1. Visit `https://aaroneisler.com.au/resume`
   - Expected: Full resume displays with styling
   - Expected: PDF auto-downloads
2. Check headshot displays (circular, correct size)
3. Check teal color scheme matches (#1EBAB1)
4. Test on mobile - should be readable
5. Click "Back to aaroneisler.com.au" - should return home
6. Check browser console - no errors

### Automated Tests
```bash
# Verify build succeeds
npm run build

# Check no TypeScript errors
npx tsc --noEmit
```

---

## System Updates

### Memory Updates
| File | Update Required |
|------|-----------------|
| `system/admin/knowledge_base/website.md` | Add note: "Resume page uses React component, not iframe" |

### Documentation Updates
| File | Update Required |
|------|-----------------|
| `system/NEWS.md` | "Fixed resume page - now renders as React component" |

### ADR Updates
| ADR | Update Required |
|-----|-----------------|
| None | No new architectural decisions |

### SYSTEM.md Updates
- [x] No SYSTEM.md changes required

---

## Governance Updates

### Archie's Tests (SPEC-001)
- [ ] No updates needed

### Roomba Rules
- [ ] No Roomba changes needed

---

## Cleanup

- [ ] Delete `public/resume_view.html` after confirming React version works
- [ ] Delete `public/style.css` after confirming (only used by resume_view.html)
- [ ] Change spec Status to COMPLETED
- [ ] Add Completed date to header
- [ ] Final commit: `docs(website): complete SPEC-024`

---

## Notes

**Why this approach:**
- `X-Frame-Options: DENY` is a good security practice - we shouldn't weaken it
- React component is more maintainable than static HTML
- Inline styles avoid CSS conflicts with Tailwind
- Same visual result, no security compromises

**Font fallback:**
If Google Fonts fail to load, the browser will use system sans-serif. The resume will still be readable, just not with Poppins.
