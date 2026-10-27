import { test } from "node:test";
import assert from "node:assert/strict";
import { DIMENSIONS, QUESTIONS } from "../../site/js/questions.js";
import { score, band, itemScore, isComplete, encodeShare, decodeShare } from "../../site/js/scoring.js";
import { pickSteps, STEPS } from "../../site/js/plan.js";

const fill = (fn) => Object.fromEntries(QUESTIONS.map((q) => [q.id, fn(q)]));
const maxInward = fill((q) => (q.key === "in" ? 5 : 1));
const maxOutward = fill((q) => (q.key === "in" ? 1 : 5));

test("32 questions, unique ids, counts per dimension", () => {
  assert.equal(QUESTIONS.length, 32);
  assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, 32);
  const count = (d) => QUESTIONS.filter((q) => q.dim === d).length;
  assert.deepEqual(DIMENSIONS.map((d) => count(d.id)), [6, 10, 6, 10]);
});

test("IPIP scales are balanced 5 inward / 5 outward", () => {
  for (const d of ["social", "others"]) {
    assert.equal(QUESTIONS.filter((q) => q.dim === d && q.key === "in").length, 5);
  }
});

test("order is interleaved: no dimension repeats back to back in the first 24", () => {
  for (let i = 1; i < 24; i++) assert.notEqual(QUESTIONS[i].dim, QUESTIONS[i - 1].dim);
});

test("reverse keying", () => {
  assert.equal(itemScore({ key: "in" }, 5), 5);
  assert.equal(itemScore({ key: "out" }, 5), 1);
  assert.equal(itemScore({ key: "out" }, 3), 3);
});

test("extremes give 100 and 0, all-neutral gives 50", () => {
  assert.deepEqual(Object.values(score(maxInward).dims), [100, 100, 100, 100]);
  assert.equal(score(maxInward).overall, 100);
  assert.equal(score(maxOutward).overall, 0);
  const neutral = score(fill(() => 3));
  assert.deepEqual(Object.values(neutral.dims), [50, 50, 50, 50]);
});

test("acquiescence (agree with everything) lands at 50 on balanced IPIP scales", () => {
  const r = score(fill(() => 5));
  assert.equal(r.dims.social, 50);
  assert.equal(r.dims.others, 50);
});

test("worked example from the How it's scored page", () => {
  const q = QUESTIONS.find((x) => x.text === "Start conversations.");
  assert.equal(itemScore(q, 5), 1);
});

test("missing or malformed answers are ignored, never NaN", () => {
  const r = score({ attention1: 5, attention2: "x", attention3: 9, attention4: 2.5, social1: null });
  assert.equal(r.dims.attention, 100);
  assert.equal(r.dims.social, null);
  assert.equal(r.overall, 100);
  assert.equal(score({}).overall, null);
  assert.equal(isComplete({}), false);
  assert.equal(isComplete(maxInward), true);
});

test("bands at their boundaries", () => {
  assert.equal(band(0), "Mostly outward");
  assert.equal(band(39), "Mostly outward");
  assert.equal(band(40), "Balanced");
  assert.equal(band(60), "Balanced");
  assert.equal(band(61), "Mostly inward");
  assert.equal(band(100), "Mostly inward");
});

test("share link round-trips and rejects malformed input", () => {
  const dims = { attention: 71, social: 55, sharing: 66, others: 48 };
  assert.equal(encodeShare(dims), "71-55-66-48");
  assert.deepEqual(decodeShare("71-55-66-48").dims, dims);
  assert.equal(decodeShare("71-55-66-48").overall, 60);
  for (const bad of ["", "71-55-66", "71-55-66-48-1", "71-55-66-101", "a-b-c-d", "-1-2-3", "71-55-66-4.5", "1e2-1-1-1", null, undefined, "<script>-1-1-1"]) {
    assert.equal(decodeShare(bad), null, `should reject ${bad}`);
  }
  assert.deepEqual(decodeShare("0-0-100-100").dims, { attention: 0, social: 0, sharing: 100, others: 100 });
});

test("plan: always 3 steps, highest changeable dimension first", () => {
  const p = pickSteps({ attention: 50, social: 90, sharing: 80, others: 60 });
  assert.equal(p.length, 3);
  assert.deepEqual(p.map((s) => s.dim), ["sharing", "others", "attention"]);
});

test("plan: social energy never pushed when 3 changeable steps exist", () => {
  const p = pickSteps({ attention: 70, social: 100, sharing: 40, others: 40 });
  assert.ok(!p.some((s) => s.dim === "social"));
});

test("plan: one high dimension gets several steps, then social optional", () => {
  const p = pickSteps({ attention: 80, social: 70, sharing: 10, others: 10 });
  assert.deepEqual(p.map((s) => s.dim), ["attention", "attention", "attention"]);
  const q = pickSteps({ attention: 10, social: 70, sharing: 80, others: 10 });
  assert.deepEqual(q.map((s) => s.dim), ["sharing", "sharing", "social"]);
  assert.match(q[2].title, /^Optional/);
});

test("plan: all outward still gives 3 useful steps", () => {
  const p = pickSteps({ attention: 0, social: 0, sharing: 0, others: 0 });
  assert.equal(p.length, 3);
  assert.equal(p[0].dim, "social");
});

test("every step says what it rests on and how to check it", () => {
  for (const s of Object.values(STEPS).flat()) {
    assert.ok(s.title && s.do && s.why && s.check, s.title);
    assert.ok(s.cite || /Practice, not research/.test(s.why), `${s.title} needs a citation or a practice label`);
  }
});
