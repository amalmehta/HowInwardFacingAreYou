// The 32 statements and the four dimensions they score.
// key: "in"  → agreeing means more inward-facing
//      "out" → agreeing means more outward-facing (reverse-scored)

export const DIMENSIONS = [
  {
    id: "attention",
    name: "Attention",
    question: "Where does your attention go?",
    inward: "mostly on your own thoughts and feelings",
    outward: "mostly on people and what's around you",
    validated: false,
    source: "Original items written for this site, based on research on self-focused attention (Ingram, 1990) and rumination (Trapnell & Campbell, 1999). Not yet validated.",
  },
  {
    id: "social",
    name: "Social energy",
    question: "Do people charge you up or wear you down?",
    inward: "you recharge alone and keep in the background",
    outward: "you seek out people and talk easily",
    validated: true,
    source: "IPIP Big-Five Extraversion, 10 items (Goldberg, 1992). Public domain. Reliability α = .87 (ipip.ori.org). Score shown is the inverse: 100 − extraversion.",
  },
  {
    id: "sharing",
    name: "Sharing",
    question: "Do you keep your work to yourself or put it out?",
    inward: "you keep things private until they're polished",
    outward: "you show work early, ask for feedback and reach out",
    validated: false,
    source: "Original items written for this site. Not yet validated.",
  },
  {
    id: "others",
    name: "Others-focus",
    question: "How much room do other people's needs take up?",
    inward: "you mostly look after your own needs",
    outward: "you notice and act on what others need",
    validated: true,
    source: "IPIP-NEO Altruism facet (A3), 10 items (Goldberg et al., 2006). Public domain. Reliability α = .77 (ipip.ori.org). Score shown is the inverse: 100 − altruism.",
  },
];

const ITEMS = {
  attention: [
    ["When I'm with people, I'm often thinking about how I'm coming across.", "in"],
    ["I replay conversations or mistakes in my head long after they're over.", "in"],
    ["My mind drifts to my own worries even when I'm doing something I enjoy.", "in"],
    ["I get absorbed in what's happening around me and forget about myself.", "out"],
    ["When someone is talking, my attention stays on what they're saying.", "out"],
    ["I spend a lot of time analyzing my own feelings.", "in"],
  ],
  // IPIP 50-item Big-Five markers, Factor I. "+" keyed items are outward.
  social: [
    ["Am the life of the party.", "out"],
    ["Don't talk a lot.", "in"],
    ["Feel comfortable around people.", "out"],
    ["Keep in the background.", "in"],
    ["Start conversations.", "out"],
    ["Have little to say.", "in"],
    ["Talk to a lot of different people at parties.", "out"],
    ["Don't like to draw attention to myself.", "in"],
    ["Don't mind being the center of attention.", "out"],
    ["Am quiet around strangers.", "in"],
  ],
  sharing: [
    ["I share work before it feels finished.", "out"],
    ["I ask people for feedback on what I'm making.", "out"],
    ["I keep projects to myself until they're polished.", "in"],
    ["In the past month I've posted, shown or demoed something I made.", "out"],
    ["I put off sharing things because I worry how they'll be received.", "in"],
    ["I reach out to people whose work I admire.", "out"],
  ],
  // IPIP-NEO facet A3 Altruism. "+" keyed items are outward.
  others: [
    ["Make people feel welcome.", "out"],
    ["Look down on others.", "in"],
    ["Anticipate the needs of others.", "out"],
    ["Am indifferent to the feelings of others.", "in"],
    ["Love to help others.", "out"],
    ["Make people feel uncomfortable.", "in"],
    ["Am concerned about others.", "out"],
    ["Turn my back on others.", "in"],
    ["Have a good word for everyone.", "out"],
    ["Take no time for others.", "in"],
  ],
};

// Interleave dimensions round-robin so no block of one kind runs long.
function interleave() {
  const lists = DIMENSIONS.map((d) =>
    ITEMS[d.id].map(([text, key], i) => ({ id: `${d.id}${i + 1}`, dim: d.id, text, key }))
  );
  const out = [];
  for (let i = 0; out.length < lists.flat().length; i++) {
    for (const l of lists) if (l[i]) out.push(l[i]);
  }
  return out;
}

export const QUESTIONS = interleave();

export const SCALE = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neither" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" },
];
