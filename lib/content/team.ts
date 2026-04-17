export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  /** Optional headshot path (relative to /public). Falls back to initials when absent. */
  photo?: string;
  bio?: string;
};

export const LEADERSHIP: TeamMember[] = [
  {
    name: "Michael La Salle",
    role: "Founder & President",
    initials: "ML",
    photo: "/team/michael-la-salle.png",
    bio:
      "Michael founded Endeavor Search Partners to bring advisor-first advocacy to career decisions that too often get rushed. He works closely with advisors navigating the most important transitions of their career.",
  },
  {
    name: "Kevin Kershaw",
    role: "Managing Partner",
    initials: "KK",
    photo: "/team/kevin-kershaw.png",
    bio:
      "Kevin brings deep industry experience and a steady hand to the due-diligence process, helping advisors evaluate options with clarity and confidence.",
  },
  {
    name: "Johnny Sommese",
    role: "Managing Partner",
    initials: "JS",
    photo: "/team/johnny-sommese.png",
    bio:
      "Johnny focuses on understanding what makes each practice unique and matching advisors to firms and structures that truly align with their goals.",
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Reed Schuette",
    role: "Senior Advisor Outreach Specialist",
    initials: "RS",
    photo: "/team/reed-schuette.jpg",
  },
  {
    name: "Matt Keegan",
    role: "Advisor Outreach Specialist",
    initials: "MK",
    photo: "/team/matt-keegan.jpg",
  },
  {
    name: "Nico Mercado",
    role: "Advisor Outreach Specialist",
    initials: "NM",
    photo: "/team/nico-mercado.jpg",
  },
  {
    name: "Claudio Weinstein",
    role: "Advisor Outreach Specialist",
    initials: "CW",
    photo: "/team/claudio-weinstein.jpg",
  },
];
