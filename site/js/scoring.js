// Pure scoring logic. No DOM, so Node can test it directly.
import { DIMENSIONS, QUESTIONS } from "./questions.js";

// Cut-offs are a readability choice, not empirical norms.
export const BANDS = [
  { max: 39, label: "Mostly outward" },
  { max: 60, label: "Balanced" },
  { max: 100, label: "Mostly inward" },
];

export function band(pct) {
  return BANDS.find((b) => pct <= b.max).label;
}

// Higher item score always means more inward: outward-keyed answers flip (6 − x).
export function itemScore(question, answer) {
  return question.key === "out" ? 6 - answer : answer;
}

const valid = (a) => Number.isInteger(a) && a >= 1 && a <= 5;

// answers: { [questionId]: 1..5 }. Returns null for a dimension with no answers.
export function score(answers, questions = QUESTIONS) {
  const dims = {};
  for (const d of DIMENSIONS) {
    const s = questions
      .filter((q) => q.dim === d.id && valid(answers[q.id]))
      .map((q) => itemScore(q, answers[q.id]));
    dims[d.id] = s.length ? Math.round(((mean(s) - 1) / 4) * 100) : null;
  }
  return { dims, overall: overall(dims) };
}

export function overall(dims) {
  const v = Object.values(dims).filter((x) => x !== null);
  return v.length ? Math.round(mean(v)) : null;
}

const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;

export function isComplete(answers, questions = QUESTIONS) {
  return questions.every((q) => valid(answers[q.id]));
}

// Share links carry only the four scores, e.g. "71-55-66-48".
export function encodeShare(dims) {
  return DIMENSIONS.map((d) => dims[d.id]).join("-");
}

export function decodeShare(str) {
  if (typeof str !== "string") return null;
  const parts = str.split("-");
  if (parts.length !== DIMENSIONS.length) return null;
  const dims = {};
  for (const [i, d] of DIMENSIONS.entries()) {
    if (!/^\d{1,3}$/.test(parts[i])) return null;
    const n = Number(parts[i]);
    if (n > 100) return null;
    dims[d.id] = n;
  }
  return { dims, overall: overall(dims) };
}
