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
      situation: "Orro had bought 11 companies in five years. On paper, one company. In reality, 11 different ways of doing everything. 11 billing systems. 11 cultures. Customers were frustrated. Margins were leaking. The board wanted scale, but nobody could agree on what that meant.",
      approach: "I didn't start with a transformation roadmap. I started by sitting with the teams who were losing deals and the ones cleaning up delivery failures. Found out we were quoting contracts we couldn't deliver profitably. Found billing errors nobody was catching. Built automation to fix the leaks first. Then standardised the operating model piece by piece. Some teams came willingly. Some needed convincing. A few needed replacing.",
      results: "2% EBITDA improvement in under two years. QANTAS, Jetstar, Flight Centre, Australia Post renewed. These were relationships that were on the edge when I arrived. AI tools now catch revenue leakage that used to slip through. The business can quote, win, and deliver consistently now.",
      lessonsLearned: "M&A integration success depends on moving fast on operational unification while being patient with cultural integration. You can't wait for everyone to be comfortable. But you also can't force culture. The technology transformation and people change have to happen together.",
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
      situation: "After 20 years working for big companies, I wanted to know if I could build something from nothing. Not a side project. A real business. My co-founder and I picked one of the hardest spaces: operational technology. Power grids, water systems, critical infrastructure. These networks can't go down. The clients don't tolerate excuses.",
      approach: "First 90 days were about survival. We needed a paying client before the savings ran out. I was writing proposals, doing demos, closing deals, and then delivering the work myself. No sales team. No delivery team. Just us. Once we had proof the model worked, I built operations in India to scale delivery without burning through cash. Every dollar was watched.",
      results: "$100K in the first 90 days. $2M by month 18. Clients in energy, utilities, and defence. We proved you could build a profitable services business in a space where the big players were slow and expensive.",
      lessonsLearned: "Startup survival comes down to landing an anchor client fast. You need proof before you need scale. And the founder has to sell and deliver at the same time until there's enough cash to hire. There's no other way.",
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
      situation: "I joined Telstra as a consulting manager and left seven years later running platforms for the enterprise business. Four different roles. Each one came because I fixed something that was broken. CBA was struggling. Defence was at risk. The automation practice didn't exist. National delivery was missing targets. These weren't promotions handed out. They were problems nobody else wanted.",
      approach: "The CBA and Defence accounts were my first test. Big relationships, unhappy clients. I moved in, understood what was actually failing, and rebuilt trust through delivery. When that worked, they gave me the automation practice to build from scratch. No team, no platform, no clients. I built the framework, hired the people, created the commercial model, and sold the first deals myself. Then did the same for wireless.",
      results: "Rapid automation platform delivered $12M value in year one. All Big 4 banks signed up. Australia's first Arista SDN ($27M) won and delivered. CBA, Westpac, Defence renewed. Wireless practice hit $3.6M pipeline in year one. 106% utilisation across the team. When I left, the practices I built were still running.",
      lessonsLearned: "The biggest impact comes from staying long enough to see transformation through. Seven years let me build on each role. Relationships and credibility compound. And the hardest part of automation isn't the technology. It's convincing people their job is about to change.",
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
      situation: "Woolworths was my account. Biggest retailer in Australia, complex environment, dozens of vendors, and a CTO who didn't suffer fools. The previous architect had left and the relationship was shaky. They needed someone who could talk strategy with the executives and still get into the technical weeds when needed.",
      approach: "I spent the first few months just listening. Sat in their architecture reviews. Understood their pain points. PCI compliance was a mess and costing them. I took ownership of fixing it. Then I pitched them on something nobody in Australia had done yet: Cisco ACI. New technology, real risk, but the OPEX savings were too big to ignore. I put my credibility on the line and made it work.",
      results: "Australia's first Cisco ACI deployment. $1M CAPEX, 25% OPEX reduction modelled. PCI compliance sorted, which turned into $700K in services revenue. Grew the account 35% while holding margin. The CTO started asking for me by name on other projects.",
      lessonsLearned: "Being first to market with new technology creates disproportionate credibility. Once you've done something nobody else has done, you're not competing on price anymore. Technical depth and commercial sense together is a rare combination. That's what opens doors.",
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
      situation: "Before I led teams, I was the one on the tools. Cisco TAC meant taking escalations that the first-line engineers couldn't solve. The calls that came at 2am. The problems where the customer was already angry. At Optus, I was deploying networks for enterprise clients. Hands on keyboards, making it work.",
      approach: "I treated every problem like a puzzle. Didn't matter if it was my fault or someone else's. The job was to fix it and understand why it broke. I kept notes on everything. Patterns in failures, shortcuts that worked, mistakes that taught me something. That habit stuck.",
      results: "Built a reputation as someone who could solve the hard problems. That's what got me promoted out of engineering and into architecture. And later into leadership. The technical credibility I built in those years is still what earns trust with engineering teams today.",
      lessonsLearned: "You can't lead technical teams effectively without having done the work yourself. Engineers know immediately if you've been in the trenches. The years on the tools built credibility that no MBA can replace.",
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
