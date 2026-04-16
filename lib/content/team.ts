export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  bio?: string;
};

export const LEADERSHIP: TeamMember[] = [
  {
    name: "Michael La Salle",
    role: "Founder & President",
    initials: "ML",
    bio:
      "Michael founded Endeavor Search Partners to bring advisor-first advocacy to career decisions that too often get rushed. He works closely with advisors navigating the most important transitions of their career.",
  },
  {
    name: "Kevin Kershaw",
    role: "Managing Partner",
    initials: "KK",
    bio:
      "Kevin brings deep industry experience and a steady hand to the due-diligence process, helping advisors evaluate options with clarity and confidence.",
  },
  {
    name: "Johnny Sommese",
    role: "Managing Partner",
    initials: "JS",
    bio:
      "Johnny focuses on understanding what makes each practice unique and matching advisors to firms and structures that truly align with their goals.",
  },
];

export const TEAM: TeamMember[] = [
  { name: "Reed Schuette", role: "Senior Advisor Outreach Specialist", initials: "RS" },
  { name: "Matt Keegan", role: "Advisor Outreach Specialist", initials: "MK" },
  { name: "Nico Mercado", role: "Advisor Outreach Specialist", initials: "NM" },
  { name: "Claudio Weinstein", role: "Advisor Outreach Specialist", initials: "CW" },
];
