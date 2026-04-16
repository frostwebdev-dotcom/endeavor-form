export type ProcessPhase = {
  slug: "understand" | "evaluate" | "connect" | "consult";
  step: string;
  title: string;
  lead: string;
  body: string;
};

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    slug: "understand",
    step: "01",
    title: "Understand",
    lead: "Every practice is unique.",
    body:
      "We start by listening. We want to understand your practice, your clients, and what a better next chapter would look like for you—whether that is more time, better economics, more support, or a different cultural fit. Clarifying what matters most becomes the foundation for every conversation that follows.",
  },
  {
    slug: "evaluate",
    step: "02",
    title: "Evaluate",
    lead: "Match options to your priorities.",
    body:
      "Once we understand you, we map the landscape against your criteria and surface only the firms and affiliation models that fit. You get a focused, considered set of options—not a flood of unqualified introductions.",
  },
  {
    slug: "connect",
    step: "03",
    title: "Connect",
    lead: "Introductions that respect your time.",
    body:
      "We coordinate meetings with the firms that match you, organized around your schedule and client commitments. Every conversation is prepared for in advance so both sides arrive informed and respectful of each other's time.",
  },
  {
    slug: "consult",
    step: "04",
    title: "Consult",
    lead: "Experienced guidance at decision time.",
    body:
      "With decades of negotiating experience behind us, we help you read offers, ask the right questions, and understand the long-term economics—so the decision you make is a confident one, with no surprises after you sign.",
  },
];
