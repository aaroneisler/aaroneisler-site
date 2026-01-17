export const profile = {
  name: "Aaron Eisler",
  title: "Technology Executive",
  subtitle: "COO | CTO | Chief AI Officer",
  location: "Sydney, Australia",
  email: "aaron.eisler@madeai.com.au",
  linkedin: "https://www.linkedin.com/in/aaroneisler/",
  phone: "0429 555 885",

  summary: `Most executives are either operations people or technology people. I'm both. And when it's broken, I'm who they send. The renewal at risk. The integration that's stuck. The platform that doesn't exist. CTO for Defence, CBA, Woolworths. Built Telstra's automation practice from scratch. Unified 11 acquired companies at Orro. Now building an AI company.`,

  highlights: [
    {
      headline: "$10B+ in renewals",
      story: "QANTAS, Jetstar, Flight Centre, Australia Post, CBA, Westpac, Defence. Many were at risk. They sent me in. Every one renewed."
    },
    {
      headline: "CTO × 3 industries",
      story: "Woolworths, CBA, Defence. Three very different industries, same level of trust."
    },
    {
      headline: "AI pioneer since 2016",
      story: "Machine learning, robotics, workflow automation. I built Telstra's practice from scratch. $12M value in year one. All Big 4 banks delivered. This isn't new to me."
    },
    {
      headline: "Startup to $2M",
      story: "AetherX: blank page to first revenue in 90 days. $2M by month 18. I don't just run things. I build them."
    },
  ],

  companies: [
    { name: "Orro", experienceId: "orro" },
    { name: "Telstra", experienceId: "telstra" },
    { name: "NTT", experienceId: "ntt" },
    { name: "Optus", experienceId: "early-career" },
    { name: "Cisco", experienceId: "early-career" },
  ],
};

export const experience = [
  {
    id: "orro",
    company: "Orro Group",
    role: "Group Executive - Operations",
    period: "Oct 2023 – Nov 2025",
    logo: "/logos/orro.png",
    bullets: [
      "Unified 11 acquired companies into one operating model. 2% EBITDA improvement.",
      "Renewed QANTAS, Jetstar, Flight Centre, Australia Post. Relationships I was brought in to save.",
      "Built AI solutions for contract analysis, billing integrity, renewal forecasting. In production, not pilots.",
      "$200M P&L across Network, Cloud, Cyber, and Collaboration services",
    ],
    aiContext: {
      situation: "Orro had acquired 11 separate companies operating as fragmented businesses with different systems, processes, and cultures. The mandate was to unify them into a scalable ICT organisation capable of competing at enterprise scale.",
      approach: "I led an end-to-end transformation, industrialising core operations by embedding robotics, workflow automation, and AI into every facet of the service lifecycle. From customer onboarding through to billing and support. We deliberately shifted away from legacy tools and decentralised processes, replacing them with platform-based operating frameworks.",
      results: "Delivered 2% EBITDA increase through operational efficiency. Built a digitised operating engine that allows Orro to compete at enterprise scale while preserving agility. Deployed AI-led solutions that significantly reduced cycle time, revenue leakage, and manual effort.",
      lessonsLearned: "M&A integration success depends on moving fast on operational unification while being patient with cultural integration. The technology transformation must happen in parallel with people change management. Neither can wait for the other.",
    },
  },
  {
    id: "aetherx",
    company: "AetherX",
    role: "COO and CTO",
    period: "Jul 2022 – Sep 2023",
    logo: "/logos/aetherx.png",
    bullets: [
      "Co-founded and built to $2M revenue in 18 months. First revenue in 90 days.",
      "Specialised in OT (Operational Technology). Secure automation for critical infrastructure.",
      "Built India operations and established channel partnerships",
      "End-to-end accountability: strategy, sales, delivery, finance",
    ],
    aiContext: {
      situation: "Founded a new company to deliver cutting-edge technology services in mission-critical networks. The vision was to focus on secure network automation across professional services, managed services, and new products.",
      approach: "Took responsibility for creating the business plan, developing the go-to-market strategy, and executing the plan. Led development of new products and services while managing budgets to ensure financial stability. Built the AetherX India operations and established relationships with key stakeholders.",
      results: "Achieved $100K revenue within first three months. Built the business to $2M in 18 months. Successfully delivered mission-critical solutions for clients in highly regulated industries.",
      lessonsLearned: "Startup success in B2B requires landing anchor clients quickly to prove the model, then building repeatable processes before scaling. The founder must be deeply involved in early sales while simultaneously building operational capability.",
    },
  },
  {
    id: "telstra",
    company: "Telstra / Telstra Purple",
    role: "Senior Leadership Roles",
    period: "Jun 2015 – Jul 2022",
    logo: "/logos/telstra.png",
    bullets: [
      "Built 'Rapid' automation platform from scratch. $12M value in year one. Delivered into all Big 4 banks.",
      "Won and delivered Australia's first Arista SDN ($27M). Full lifecycle from bid to transition.",
      "Renewed at-risk contracts: CBA, Westpac, Defence",
      "CTO for Defence and CBA. Trusted with the most complex accounts.",
      "Created wireless practice generating $3.6M pipeline in first year",
      "106% billable utilisation, 38 LEAN initiatives, transformed national delivery model",
    ],
    aiContext: {
      situation: "Seven years at Telstra spanning four senior roles: Head of Platforms & Services, Head of Automation & Robotics, National Professional Services Manager, and Business Consulting Manager. Each role built on the last. Started with client-facing architecture and consulting, then ran national delivery, then built the automation practice, then led platforms.",
      approach: "The thread across all roles was transformation through execution. Built the automation capability from nothing. Framework, platform, commercial model, governance. Took struggling accounts and turned them around. Created new practices where none existed. Applied LEAN methodology systematically. Always focused on measurable outcomes.",
      results: "Built Rapid platform delivering $12M value in year one. Delivered automation to all Big 4 banks, Qantas, Origin, BP, Australia Post. Won Australia's first Arista SDN ($27M). Renewed $1B+ in contracts that were at risk. Created wireless practice with $3.6M pipeline. Achieved 106% utilisation. Transformed how Telstra delivered services.",
      lessonsLearned: "The biggest impact comes from staying long enough to see transformation through. Seven years let me build on each role. Relationships, credibility, and institutional knowledge compound. The hardest part of automation isn't technology. It's changing how people think about work.",
    },
  },
  {
    id: "ntt",
    company: "NTT (Dimension Data)",
    role: "Security Practice Manager & Enterprise Architect",
    period: "Sep 2010 – Jun 2015",
    logo: "/logos/ntt.png",
    bullets: [
      "CTO for Woolworths. Delivered Australia's first Cisco ACI ($1M CAPEX, 25% OPEX reduction)",
      "Achieved PCI DSS compliance generating $700K revenue",
      "Chaired Architecture Review Board implementing TOGAF-based ADM",
      "Increased revenue by 35% while maintaining gross profit",
    ],
    aiContext: {
      situation: "Managing security practice and enterprise architecture for major retail client (Woolworths), with responsibility for compliance, risk management, and technology strategy across a complex multi-vendor environment.",
      approach: "Owned PCI compliance process and risk register. Chaired Architecture Review Board implementing TOGAF-based Architecture Development Method. Redesigned sales process for security deals with new qualification model.",
      results: "Delivered Australia's first Cisco Application Centric Infrastructure. $1M CAPEX with modelled 25% OPEX reduction. Achieved PCI DSS compliance generating $700K revenue. Increased revenue by 35% while maintaining gross profit. Sales process redesign increased hit rate by 25%.",
      lessonsLearned: "Being first to market with new technology creates disproportionate credibility. The combination of technical depth and commercial acumen is rare and valuable in enterprise sales.",
    },
  },
  {
    id: "early-career",
    company: "Optus & Cisco",
    role: "Earlier Career",
    period: "2001 – 2010",
    logo: "/logos/cisco.png",
    bullets: [
      "Systems Engineer at Optus. Billable deployment across enterprise clients",
      "TAC Engineer at Cisco. Escalation support, deep technical foundations",
      "Where I learned the craft before leading teams",
    ],
    aiContext: {
      situation: "Started career in hands-on technical roles, building the engineering foundation that would later inform leadership positions.",
      approach: "Focused on mastering the technical craft. Troubleshooting, deployment, escalation support. Built credibility through deep technical competence.",
      results: "Developed the technical depth that later enabled me to lead engineering teams and architect enterprise solutions. This foundation is why I can still get into the weeds when needed.",
      lessonsLearned: "You can't lead technical teams effectively without having done the work yourself. The years on the tools built credibility that no MBA can replace.",
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
