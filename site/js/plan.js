// The step library and the rule that picks three.
// Every step says what it rests on (a study, or "practice, not research")
// and how to check, within a week, whether it's working for you.

export const STEPS = {
  attention: [
    {
      title: "Give worry a 15-minute slot",
      do: "Pick a fixed time each day. When a worry shows up outside it, jot one line and come back to it then.",
      why: "In a small 1983 study, keeping worry to a set time and place cut daily worry compared with controls.",
      cite: "Borkovec et al. (1983), Behaviour Research and Therapy 21(3)",
      check: "Note roughly how many minutes you spent replaying things on day 1 and day 7. If the number didn't drop, drop the step.",
    },
    {
      title: "In conversation, ask one more question",
      do: "Before you reply, ask one follow-up about what they just said. It moves your attention from how you're coming across to them.",
      why: "Attention fixed on yourself goes with more low mood and anxiety. The link is correlational, so this is a test, not a cure.",
      cite: "Mor & Winquist (2002), Psychological Bulletin 128(4)",
      check: "After three conversations, can you recall one specific thing each person said? That's your measure.",
    },
    {
      title: "Turn 'why' into 'how'",
      do: "When you catch yourself asking \"why do I always…\", switch to \"what's one concrete thing I'd do next time?\"",
      why: "Abstract, evaluative self-thought tends to be unhelpful. Concrete, specific thinking about the same problem tends to help.",
      cite: "Watkins (2008), Psychological Bulletin 134(2)",
      check: "Write down three loops this week and the concrete next step for each. Did you take any of them?",
    },
  ],
  sharing: [
    {
      title: "Ship one unfinished thing this week",
      do: "Show a draft, demo or half-built thing to one person or post it. Say what kind of feedback you want.",
      why: "Practice, not research. Early sharing gets you feedback while it's still cheap to change course. Feedback helps on average but sometimes hurts, so ask for specifics.",
      cite: "Kluger & DeNisi (1996), Psychological Bulletin 119(2), for the mixed effects of feedback",
      check: "Did you get at least one comment you wouldn't have thought of yourself? If yes, do it again next week.",
    },
    {
      title: "Write to one person whose work you admire",
      do: "Three sentences: what you liked, one specific question, and nothing asked of them beyond that.",
      why: "Practice, not research. People tend to underestimate how welcome a short, specific note is.",
      cite: null,
      check: "Count replies over two weeks. Even one reply out of three notes is a good rate.",
    },
  ],
  others: [
    {
      title: "Do one small, deliberate kindness a day",
      do: "Something specific for someone else: a coffee, an intro, five minutes of help. Do it on purpose, not by accident.",
      why: "A meta-analysis found acts of kindness give the person doing them a small boost in wellbeing.",
      cite: "Curry et al. (2018), Journal of Experimental Social Psychology 76",
      check: "Rate your day 1–10 each evening this week. Compare kindness days with the rest.",
    },
    {
      title: "Spend a little on someone else",
      do: "Next time you'd treat yourself, spend it on someone else instead.",
      why: "People told to spend on others were happier than those who spent on themselves. A 2020 preregistered replication found the effect is real but its size depends on the setup (Aknin et al., JPSP 119(2)).",
      cite: "Dunn, Aknin & Norton (2008), Science 319(5870)",
      check: "Afterwards, compare how you felt with the last time you treated yourself.",
    },
  ],
  social: [
    {
      title: "Optional: talk to one stranger",
      do: "On a commute or in a queue, start one short conversation. This isn't about changing your temperament. It's a test of a forecast.",
      why: "Commuters told to talk to a stranger had a more pleasant ride than those who sat alone, though people predicted the opposite.",
      cite: "Epley & Schroeder (2014), Journal of Experimental Psychology: General 143(5)",
      check: "Before: guess how pleasant it'll be (1–10). After: rate it. Was your guess too low?",
    },
  ],
};

// Pick 3 steps. Changeable dimensions scoring 40%+ come first, most inward
// first, one step per dimension per round. Social energy is temperament, so
// its optional step only appears when fewer than 3 such steps exist; any
// remaining slots go to the lower-scoring dimensions.
export function pickSteps(dims, n = 3) {
  const order = ["attention", "sharing", "others"]
    .filter((id) => Number.isFinite(dims[id]))
    .sort((a, b) => dims[b] - dims[a]);
  const roundRobin = (ids) => {
    const out = [];
    for (let r = 0; ids.some((id) => STEPS[id][r]); r++)
      for (const id of ids) if (STEPS[id][r]) out.push({ dim: id, ...STEPS[id][r] });
    return out;
  };
  const social = Number.isFinite(dims.social) ? STEPS.social.map((s) => ({ dim: "social", ...s })) : [];
  return [
    ...roundRobin(order.filter((id) => dims[id] >= 40)),
    ...social,
    ...roundRobin(order.filter((id) => dims[id] < 40)),
  ].slice(0, n);
}
