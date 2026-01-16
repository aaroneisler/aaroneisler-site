export const profile = {
  name: "Aaron Eisler",
  title: "Technology Executive",
  subtitle: "COO | CTO | Chief AI Officer",
  location: "Sydney, Australia",
  email: "aaron.eisler@madeai.com.au",
  linkedin: "https://www.linkedin.com/in/aaroneisler/",
  phone: "0429 555 885",

  summary: `A dynamic technology executive with 25+ years of experience across COO, CTO, and CIO roles,
driving transformational growth through operational excellence and technology leadership.
Currently building MadeAI, a workflow intelligence company, while seeking executive roles
that leverage my unique combination of operational depth and AI/automation expertise.`,

  highlights: [
    "$200M P&L management",
    "11-company M&A integration",
    "100+ person team leadership",
    "20% productivity gains through AI/automation",
  ],

  companies: ["Orro Group", "Telstra Purple", "Telstra", "Dimension Data", "Cisco"],
};

export const experience = [
  {
    id: "orro",
    company: "Orro Group",
    role: "Group Executive - Operations",
    period: "Oct 2023 – Nov 2025",
    logo: "/logos/orro.png",
    bullets: [
      "Led integration of 11 companies into unified ICT organisation, delivering 2% EBITDA improvement",
      "Managed $200M P&L across Network, Cloud, Cyber, and Collaboration services",
      "Built and deployed AI solutions for contract analysis, billing integrity, and renewal forecasting",
      "Drove strategic alignment improving service delivery and client satisfaction across national footprint",
    ],
    aiContext: {
      situation: "Orro had acquired 11 separate companies operating as fragmented businesses with different systems, processes, and cultures. The mandate was to unify them into a scalable ICT organisation capable of competing at enterprise scale.",
      approach: "I led an end-to-end transformation, industrialising core operations by embedding robotics, workflow automation, and AI into every facet of the service lifecycle—from customer onboarding through to billing and support. We deliberately shifted away from legacy tools and decentralised processes, replacing them with platform-based operating frameworks.",
      results: "Delivered 2% EBITDA increase through operational efficiency. Built a digitised operating engine that allows Orro to compete at enterprise scale while preserving agility. Deployed AI-led solutions that significantly reduced cycle time, revenue leakage, and manual effort.",
      lessonsLearned: "M&A integration success depends on moving fast on operational unification while being patient with cultural integration. The technology transformation must happen in parallel with people change management—neither can wait for the other.",
    },
  },
  {
    id: "aetherx",
    company: "AetherX",
    role: "COO and CTO",
    period: "Jul 2022 – Sep 2023",
    logo: "/logos/aetherx.png",
    bullets: [
      "Co-founded and built business to $2M revenue in 18 months",
      "Led secure network automation initiatives for mission-critical solutions",
      "Developed technology strategy across professional services, managed services, and new products",
      "Managed end-to-end operations including financial management and risk mitigation",
    ],
    aiContext: {
      situation: "Founded a new company to deliver cutting-edge technology services in mission-critical networks. The vision was to focus on secure network automation across professional services, managed services, and new products.",
      approach: "Took responsibility for creating the business plan, developing the go-to-market strategy, and executing the plan. Led development of new products and services while managing budgets to ensure financial stability. Built the AetherX India operations and established relationships with key stakeholders.",
      results: "Achieved $100K revenue within first three months. Built the business to $2M in 18 months. Successfully delivered mission-critical solutions for clients in highly regulated industries.",
      lessonsLearned: "Startup success in B2B requires landing anchor clients quickly to prove the model, then building repeatable processes before scaling. The founder must be deeply involved in early sales while simultaneously building operational capability.",
    },
  },
  {
    id: "telstra-purple",
    company: "Telstra Purple",
    role: "Head of Platforms & Services",
    period: "Mar 2021 – Jul 2022",
    logo: "/logos/telstra.png",
    bullets: [
      "Led platform and services innovation, developing cloud-native solutions",
      "Improved service delivery models through cutting-edge technology solutions",
      "Managed automation of IT operations, improving performance and reducing costs",
    ],
    aiContext: {
      situation: "Telstra Purple needed to evolve its platform capabilities and service delivery models to meet increasing client demands for cloud-native solutions and operational efficiency.",
      approach: "Focused on developing scalable cloud-native platforms while enhancing service delivery models. Drove automation initiatives to improve performance and reduce operational costs.",
      results: "Developed scalable cloud-native platforms driving business growth. Enhanced service delivery models improving client satisfaction. Reduced operational costs through automation.",
      lessonsLearned: "Platform strategy must balance standardisation for efficiency with flexibility for client-specific needs. The key is building configurable platforms rather than custom solutions.",
    },
  },
  {
    id: "telstra-automation",
    company: "Telstra",
    role: "Head of Automation & Robotics",
    period: "Feb 2018 – Mar 2021",
    logo: "/logos/telstra.png",
    bullets: [
      "Achieved 20% productivity increase ($12M) in first year of automation program",
      "Product Owner for market-first platform to deliver Automation as a Service",
      "Delivered automation into CBA, NAB, WBC, ANZ, Qantas, Origin Energy, and more",
      "Created 6 new services and 50 artefacts across 5 lines of business",
    ],
    aiContext: {
      situation: "Telstra needed to transform its service delivery through automation and robotics. The goal was to reduce manual intervention, improve efficiency, and create new revenue streams through automation services.",
      approach: "Built the automation capability from scratch—created framework, reference architecture, knowledge management, commercial model, KPIs, and governance. Initiated Centre of Excellence teams to deliver centrally controlled, standardised services aligned with sales teams.",
      results: "Delivered 20% productivity increase representing $12M in value in the first year. Became Product Owner for market-first Automation as a Service platform. Successfully delivered automation to major enterprise clients including all Big 4 banks, Qantas, Origin Energy, and more.",
      lessonsLearned: "Automation success requires proving ROI quickly with pilot projects, then building the governance and commercial framework to scale. The hardest part isn't the technology—it's changing how teams think about work.",
    },
  },
  {
    id: "telstra-psm",
    company: "Telstra",
    role: "National Professional Services Manager",
    period: "Dec 2016 – Sep 2018",
    logo: "/logos/telstra.png",
    bullets: [
      "Led renewal of QANTAS, Jetstar, CBA and Westpac contracts totalling $1B+",
      "Achieved 106% billable utilisation, overachieved targets by 21% ($494K)",
      "Created wireless practice delivering $3.6M new pipeline in first year",
      "Executed 38 LEAN initiatives saving 5% ($300K)",
    ],
    aiContext: {
      situation: "Responsible for delivery of professional services into Telstra's top 50 accounts nationwide. Needed to drive utilisation, expand capabilities, and secure major contract renewals.",
      approach: "Implemented capability uplift plan including skills matrix, training plan, new KPIs and scheduling systems. Created Centre of Excellence teams for standardised service delivery. Applied LEAN methodology systematically across the business unit.",
      results: "Achieved 106% billable utilisation and overachieved revenue targets by 21%. Created new wireless practice generating $3.6M pipeline. Executed 38 LEAN initiatives saving $300K. Successfully renewed $1B+ in major contracts.",
      lessonsLearned: "Professional services excellence comes from systematic capability building, not heroic individual efforts. The discipline of LEAN methodology compounds over time when applied consistently.",
    },
  },
  {
    id: "dimension-data",
    company: "Dimension Data",
    role: "Security Practice Manager & Enterprise Architect",
    period: "Sep 2010 – Jun 2015",
    logo: "/logos/dimensiondata.png",
    bullets: [
      "Delivered Australia's first Cisco ACI implementation ($1M CAPEX, 25% OPEX reduction)",
      "Achieved PCI DSS compliance generating $700K revenue",
      "Chaired Architecture Review Board implementing TOGAF-based ADM",
      "Increased revenue by 35% while maintaining gross profit",
    ],
    aiContext: {
      situation: "Managing security practice and enterprise architecture for major retail client (Woolworths), with responsibility for compliance, risk management, and technology strategy across a complex multi-vendor environment.",
      approach: "Owned PCI compliance process and risk register. Chaired Architecture Review Board implementing TOGAF-based Architecture Development Method. Redesigned sales process for security deals with new qualification model.",
      results: "Delivered Australia's first Cisco Application Centric Infrastructure—$1M CAPEX with modelled 25% OPEX reduction. Achieved PCI DSS compliance generating $700K revenue. Increased revenue by 35% while maintaining gross profit. Sales process redesign increased hit rate by 25%.",
      lessonsLearned: "Being first to market with new technology creates disproportionate credibility. The combination of technical depth and commercial acumen is rare and valuable in enterprise sales.",
    },
  },
];

export const skills = {
  strong: [
    "Operational Leadership & P&L Management",
    "Digital Transformation & AI Strategy",
    "M&A Integration",
    "Enterprise Architecture (TOGAF)",
    "Automation & Robotics",
    "Cross-functional Team Leadership",
    "Stakeholder Management",
    "Process Optimisation (LEAN)",
  ],
  moderate: [
    "Cloud Architecture (AWS, Azure)",
    "Cybersecurity Strategy",
    "Product Management",
    "Financial Modelling",
    "Agile/SAFe Methodology",
    "Data Analytics & BI",
  ],
  gaps: [
    "Hands-on Coding",
    "Consumer Product Experience",
    "Mobile Development",
    "Growth Marketing",
    "Early-stage Fundraising",
  ],
};

export const education = [
  { degree: "MBA", institution: "UNSW", year: "2014" },
  { degree: "Graduate Diploma in Management", institution: "UNSW", year: "2013" },
  { degree: "TOGAF V9.1", institution: "", year: "2014" },
  { degree: "SAFe Product Manager", institution: "", year: "2019" },
  { degree: "LEAN Operational Excellence", institution: "", year: "2018" },
  { degree: "CCNA, CIPT, CCNP", institution: "Cisco", year: "2003" },
];

export const aiSystemPrompt = `You are an AI assistant representing Aaron Eisler, a technology executive with 25+ years of experience.
You have deep knowledge of Aaron's career, achievements, skills, and professional background.

KEY FACTS ABOUT AARON:
- Current: Founded MadeAI (workflow intelligence company) in November 2025
- Previous: Group Executive Operations at Orro Group, managing $200M P&L
- Experience: COO, CTO, CIO roles across Telstra, Dimension Data, Cisco
- Education: MBA from UNSW
- Location: Sydney, Australia

MAJOR ACHIEVEMENTS:
- Led integration of 11 companies at Orro Group, delivering 2% EBITDA improvement
- Built $2M business (AetherX) in 18 months from founding
- Achieved 20% productivity increase ($12M) through automation at Telstra
- Led $1B+ contract renewals with major enterprises (QANTAS, CBA, Westpac)
- Delivered Australia's first Arista SDN ($27M) and first Cisco ACI implementations

DIFFERENTIATORS:
- AI-native: Currently building an AI company, not just talking about AI
- Rare combination of deep operations AND technology expertise
- Proven M&A integration at scale (11 companies)
- Track record of transformation and measurable business outcomes

TARGET ROLES: Chief AI Officer, CTO, COO

When answering questions:
1. Be conversational but professional
2. Provide specific examples and metrics when relevant
3. Be honest about gaps (Aaron doesn't code, limited consumer product experience)
4. Emphasize the combination of operational and technical expertise
5. Reference specific achievements with numbers when possible
6. If asked about something you don't know, say so honestly

IMPORTANT: You represent Aaron positively but honestly. Never fabricate achievements or experience.`;
