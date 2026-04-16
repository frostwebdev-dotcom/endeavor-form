export type Service = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "evaluation",
    title: "Evaluation",
    summary:
      "A structured review of your practice, goals, and the marketplace—so the options we explore are aligned with where you want to take your business.",
    points: [
      "Understand your current affiliation, economics, and constraints",
      "Clarify what 'right fit' really means for you and your clients",
      "Map goals to realistic paths forward, with candid feedback",
    ],
  },
  {
    slug: "career-coaching",
    title: "Career coaching",
    summary:
      "Thoughtful, confidential conversations about your next chapter—whether you are actively exploring a move or simply considering what is possible.",
    points: [
      "Frame decisions with clarity rather than pressure",
      "Objective perspective across the industry, not just one firm",
      "Work at your pace and on your calendar",
    ],
  },
  {
    slug: "consultation",
    title: "Consultation",
    summary:
      "Advisor-first counsel on the details that shape long-term success—structure, transition support, technology, compliance, and client experience.",
    points: [
      "Help you avoid common due-diligence pitfalls",
      "Model economics and long-term impact, not just headline deals",
      "Compare firms on the criteria that matter to you",
    ],
  },
  {
    slug: "interview-facilitation",
    title: "Interview facilitation",
    summary:
      "We prepare you for productive conversations and coordinate focused meetings with partner firms that match your priorities.",
    points: [
      "Pre-meeting briefings tailored to each firm",
      "Post-meeting debriefs and sharper follow-up questions",
      "Logistics handled so you stay focused on your practice",
    ],
  },
  {
    slug: "ongoing-guidance",
    title: "Ongoing guidance",
    summary:
      "A relationship that continues after a transition—because the right decision includes knowing who is in your corner a year from now, too.",
    points: [
      "Check-ins as your practice evolves",
      "Support through transition milestones",
      "Introductions and resources when you need them",
    ],
  },
];
