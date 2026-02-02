"use client";

// Resume content - matches public/resume_view.html exactly
// Styled with inline styles to avoid CSS conflicts and X-Frame-Options issues

import React from "react";

export default function ResumeView() {
  return (
    <div style={{
      fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
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
            <span>aaron.eisler@madeai.com.au</span>
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

      {/* Professional Experience - starts on new page */}
      <div style={{ breakBefore: 'page', pageBreakBefore: 'always' }}>
      <SectionHeader style={{ marginTop: '0' }}>Professional Experience</SectionHeader>

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

      {/* Telstra starts on new page */}
      <div style={{ breakBefore: 'page', pageBreakBefore: 'always' }} />
      <Job
        title="Senior Leadership Roles - Technology & Operations"
        company="Telstra"
        dates="Jun 2015 – Jul 2022"
        bullets={[
          "Built automation and robotics practice from scratch delivering $12M value in year one, creating strategy, framework, commercial model, and winning Big 4 bank adoption.",
          "Served as Chief Architect for Department of Defence and Client CTO for CBA, managing critical relationships and delivering enterprise transformation programs.",
          "Won and delivered Australia's first Arista Software Defined Network ($27M) for major enterprise client, demonstrating end-to-end delivery capability at scale.",
          "Led response to cyber incidents and critical infrastructure events, demonstrating calm decision-making under pressure with clear executive communication.",
        ]}
      />

      <Job
        title="Woolworths Chief Architect / Security Practice Manager"
        company="NTT/Dimension Data"
        dates="Sep 2010 – Jun 2015"
        bullets={[
          "Progressed to Chief Architect for Australia's largest retailer, owning architecture strategy, PCI compliance, and technology roadmap.",
          "Delivered Australia's first Cisco ACI deployment ($1M CAPEX) achieving 25% OPEX reduction. Managed migration to multiple new data centres.",
          "Grew account revenue 35% while maintaining margin. Chaired Architecture Review Board implementing TOGAF-based governance framework.",
        ]}
      />
      </div>

      {/* Core Competencies */}
      <SectionHeader>Core Competencies</SectionHeader>
      <div style={{ display: 'flex', gap: '40px', marginTop: '10px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3 style={{ fontSize: '10pt', fontWeight: 600, color: '#2D3748', marginBottom: '8px', margin: 0 }}>Strong</h3>
          <p style={{ fontSize: '9.5pt', lineHeight: 1.7, margin: 0 }}>
            Technology Strategy • AI & Data Analytics • Digital Transformation • P&L Management ($200M) • Enterprise Architecture • Board & Executive Communication • Team Leadership (100+) • Change Management
          </p>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3 style={{ fontSize: '10pt', fontWeight: 600, color: '#2D3748', marginBottom: '8px', margin: 0 }}>Proficient</h3>
          <p style={{ fontSize: '9.5pt', lineHeight: 1.7, margin: 0 }}>
            Cloud Architecture (Azure, AWS) • Cybersecurity • M&A Integration • Regulatory Compliance • Vendor Management • Agile/DevOps • TOGAF • ITIL
          </p>
        </div>
      </div>

      {/* Education */}
      <SectionHeader>Education & Certifications</SectionHeader>
      <div style={{ display: 'flex', gap: '40px', marginTop: '10px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <strong style={{ fontWeight: 600 }}>MBA</strong> — <span style={{ fontSize: '9.5pt' }}>UNSW Sydney (2014)</span>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <strong style={{ fontWeight: 600 }}>SAFe Product Manager</strong> — <span style={{ fontSize: '9.5pt' }}>Scaled Agile (2019)</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '40px', marginTop: '8px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <strong style={{ fontWeight: 600 }}>TOGAF V9.1</strong> — <span style={{ fontSize: '9.5pt' }}>The Open Group (2014)</span>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <strong style={{ fontWeight: 600 }}>ITIL V3 Foundations</strong> — <span style={{ fontSize: '9.5pt' }}>AXELOS (2011)</span>
        </div>
      </div>

      {/* Key Skills */}
      <SectionHeader>Key Skills</SectionHeader>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
  bullets: string[];
}) => (
  <div style={{ marginBottom: '18px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px', flexWrap: 'wrap', gap: '8px' }}>
      <span style={{ fontSize: '11pt', fontWeight: 600, color: '#2D3748' }}>{title}</span>
      <span style={{ fontSize: '9pt', color: '#718096', fontStyle: 'italic' }}>{dates}</span>
    </div>
    <div style={{ fontSize: '10pt', color: '#1EBAB1', marginBottom: '6px' }}>{company}</div>
    <ul style={{ marginLeft: '15px', paddingLeft: 0, margin: 0 }}>
      {bullets.map((bullet, i) => (
        <li key={i} style={{ marginBottom: '4px', fontSize: '9.5pt', lineHeight: 1.5 }}>{bullet}</li>
      ))}
    </ul>
  </div>
);
