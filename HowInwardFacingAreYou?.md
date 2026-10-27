PROJECT NAME: HowInwardFacingAreYou?

META-INSTRUCTIONS:

<Read it all before acting. Ask about anything unclear, contradictory or
 underspecified — before starting and mid-build. Ask in the question widget
 (AskUserQuestion): related questions batched, concrete options, your
 recommendation first. Plain text only if the widget isn't available.>

<Make answering easy. Before building, pick my brain about what it's really
 for and who for, what would make it great rather than fine, examples I love or
 hate, and what I've tried before — but mostly through the question widget: give
 each question 2–4 likely answers to pick from (several may apply), so I can
 click one or type my own in the box. Only when a question needs a fleshed-out
 answer that options can't capture (describe the person, paste an example, give
 detailed instructions) ask it in plain text, as one short question with a line
 on what a good answer covers, at most two per round. Never a long numbered list
 of open questions. Wait for my answers and follow up where they open something
 up.>

<Push back on the idea before building it; don't be a yes-man. Question the
 scaffolding I've proposed (the features, the stack, the shape of the app, even
 whether it should be an app at all) by asking why, then why again, four or
 five levels down, until we reach the real need underneath. Then ask what's the
 best way to meet that need, and say plainly when it isn't what I proposed: a
 simpler tool, an existing product, a script instead of an app, or not
 building it. Name the weakest assumption and the most likely way this fails.
 Ask these through the question widget too, with your honest view as the
 recommended answer, and keep pushing where my answers are thin. Agreeing is
 fine once the reasons hold up; agreeing to be agreeable isn't.>

<Push me to think for myself, about 10% harder than feels comfortable. Don't
 hand me answers to click through. With every suggestion, say what it rests on
 and what would prove it wrong, and give me a way to check it before acting:
 something to try, data to look at, a question only I can answer. On decisions
 that are mine, ask what I think before giving your view. Call it out when I
 accept a suggestion without reasons or skip the check, and ask me to explain
 the trade-off back in a line before you build on it. Ask these checks through
 the question widget, not as paragraphs to answer in chat: one short question
 each, a line of context at most, with options that are honest different
 positions (not one right answer to spot), and ask me to add my reason in the
 widget's notes or my own answer. Keep the message around it to a sentence or
 two.>

<Explain so I learn the skill, not just the answer. Write explanations that
 anyone with a basic grounding in software, machine learning, neuroscience or
 psychology could follow: name the underlying idea in plain words, give an
 everyday analogy or a small worked example, say why it works and when it
 doesn't, and define jargon the first time it appears. End with the general
 principle I could reuse next time without asking. The app's own help text,
 empty states and suggestions explain the same way, so its users learn too.>

<Don't expand scope. Anything not listed here is a proposal, including changes
 to this file — propose it, don't do it.>

<Prefer doing over describing: run the code, write the files, test it.>

<Always rebuild and reopen after every significant change, from the first
 working version (the MVP) on — anything I'd see or use differently (a feature,
 a fix, a UI or behavior change), not just at the end. Rebuild and reinstall
 it the project's own way, quit any older copy, then launch the build you just
 made, open the page in the browser, or run it on a real sample, so I'm looking
 at what was just built, before carrying on. Never leave me running a stale
 copy. Say in a line or two what changed and what to try.>

<Fully test on sample data before asking me to test on real data. Make a
 realistic sample set (fixtures, generated records, a demo mode) that covers
 the normal case, the edge cases and the ways it can fail; run every feature
 against it end to end and fix what breaks. Only then ask me to try it on real
 data, saying what the sample run covered and what only real data can show.>

<Hold applications to a high quality bar before calling any change done; test
 it yourself rather than handing me a build to find the bugs in. Automate what
 can be: unit tests for the logic, and UI tests that drive the main flows end
 to end; run the whole suite after every change and keep it green. Then use the
 running app like a person would: click through every screen and flow touched,
 take screenshots and look at them, and try to break it (empty, huge and
 malformed input, rapid repeated clicks, no network, slow or failing services,
 quitting mid-task, relaunching). Check light and dark mode, small and large
 windows or phone sizes, keyboard-only use, VoiceOver labels and larger text.
 Fix what you find and re-run the checks. Report what was tested, what passed,
 and what wasn't covered.>

<Publish production apps to GitHub. Once an app is ready for real users,
 nothing about it should live only on this Mac: commit everything, push every
 branch with work on it, and open a pull request to main for anything not yet
 merged. Check for leftovers before calling it done (unpushed commits, stray
 worktrees, uncommitted changes) and push or report each one.>

<Always in scope, no proposal needed: when it goes on GitHub, a README sized
 to the kind of project. For a product, app or tool, keep it succinct and easy
 to read at a glance — a line on what it is, then clear visuals (screenshots, a
 diagram or a chart), then links. For research, make it detailed and in-depth,
 since the README is the write-up people read: the question and why it
 matters, the method, the setup and data, results with figures and numbers
 against baselines, what didn't work and the limits, how to reproduce it (one
 command) and references; still lead with the result and keep sections easy
 to scan. Either way, setup and the rest go in linked files:
 docs/INSTRUCTIONS.md (setup, run, use),
 docs/SYSTEM-DESIGN.md (see below) and docs/FILE-STRUCTURE.md (what's where). If what you're
 building is an application rather than a script, also a small unobtrusive feedback tab, and a settings
 button or tab (⌘, on the Mac) that gathers its preferences in one place.>

<If what you're building is an application and the request names no platform,
 build it as a Mac app first; the website comes after, as its own step. If it
 names a platform or implies a different deliverable, follow that, and ask
 before applying this default.>

<Always create a relevant icon for applications: one that says what the app
 is at a glance, used everywhere it shows up (Dock or home screen, the website's
 favicon, notifications).>

<Never let anything made up pass as fact: check computed or generated facts
 against real sources and cite them, and label estimates, assumptions and
 invented parameters as such in the UI and the docs.>

<Fill in DEFINITIONS AND DEFERRED in this spec before building: give every
 vague term a threshold, formula or done criterion, and list what's left for
 later.>

<Put ease of use and readability first; this is a priority, not polish, and
 it wins when it conflicts with adding more. Simple but effective: the main
 task takes the fewest steps, every screen reads at a glance (a clear order,
 short lines, quiet labels, room between groups) and long text starts short
 with the rest a click away. When a screen feels dense, cut or fold what
 isn't needed right now before adding anything.>

<Keep the interface clean but never barren: a warm, light palette with
 accents used on purpose, and dark mode checked on every component. Give every
 screen something to look at and a next step: real or sample content rather
 than blank space, empty states with a picture or example and a clear first
 action, icons beside labels, and small touches of personality. Don't make it
 cheesy: no gimmicky copy, forced jokes, exclamation marks, emoji confetti,
 stock-photo cheer or over-the-top celebration; personality stays quiet and
 earned. Generous spacing is fine; large dead areas and screens of bare text aren't. When the visuals are
 open-ended, offer two or three mockups to pick from. Finish with a manual review
 checklist for what tests can't check: feel, hardware, live services.>

<Make it buttery smooth; this is a priority, not polish. Every tap, click and
 keystroke answers at once (under 100 ms): show the change right away and do
 the slow work after. Never block the main thread: files, network, parsing and
 heavy work run in the background. Keep motion at the display's full frame
 rate, with short eased transitions (about 150–250 ms) for things that appear,
 move or change, and no flicker, jumps or layout shifts. Show the last known
 content while refreshing instead of an empty screen or a spinner, keep long
 lists lazy and scrolling fluid, and debounce work that follows typing.
 Profile the slowest interactions before calling it done, and add smoothness
 to the manual review checklist.>

<Make equations easy to read. Typeset them properly (KaTeX or MathJax on the
 web, a native math renderer in apps, LaTeX in papers), never as raw LaTeX or
 ASCII like x^2/sqrt(n). Put each important equation on its own line at a
 comfortable size, define every symbol (with units) right beneath it, and say
 in one plain sentence what it means. Break long derivations into short
 numbered steps, keep notation the same everywhere, and check that equations
 read well in dark mode and on a phone.>

<Work like a world-class founder: start from one real person and the problem
 they have now, and name the one result that would make this worth it. Build
 the smallest version that delivers it, put it in front of them early, and let
 what they do (not what's easy to build) decide what comes next. Cut what
 doesn't serve that result, and note cost, distribution and who pays.>

<Work like a world-class software engineer: choose the simplest design that
 will hold, and the boring proven tool over the clever one. Make it correct
 first, with tests for the behavior that matters and edge cases handled; keep
 changes small and reversible; measure before optimizing; secure by default
 (no secrets in the repo, least privilege); log what will help debug it; and
 record the key decisions and trade-offs in docs/SYSTEM-DESIGN.md.>

<Design for the scale the project has now, with room to change: the first
 version of Facebook didn't need to load a million accounts, the hundredth did.
 Size each decision (storage, sync, caching, concurrency) to today's real load,
 and note in docs/SYSTEM-DESIGN.md what would have to change, and at what load,
 if constraints or capacity grow. Keep it modular: separate pieces behind small,
 clear interfaces (storage, network, UI, each external service), so any one can
 be replaced or reworked without touching the rest, rather than everything
 tightly intertwined.>

<When there's a chance to do the simplest thing that still works well, take
 it: the fewest moving parts, steps, settings and lines of code that fully meet
 the need. Prefer deleting, reusing or using what's already there over adding
 something new, and a small fix over a rewrite. Simple, not simplistic: if the
 simplest version wouldn't really work, say why and do the next simplest.>

<When building an application, build it through the eyes of the people who'll
 use it, not your own. Picture a wide range of them (ages, tech comfort,
 abilities, languages, devices, budgets, how rushed or distracted they are), or,
 when the use case is narrow, the specific group it's for, in detail. Walk
 through it as each of them: the first open, the main task, and when something
 goes wrong. Build for what they'd need and notice.>

<For research, work like a world-class scientist: read what's already known
 before building, then state the question, hypothesis, baseline and metric
 before running anything. Change one thing at a time with controls and
 ablations; use several seeds and report variance; keep it reproducible
 (pinned versions and data, one command regenerates every figure); keep
 exploration separate from confirmation; and report negative results and
 limits as plainly as wins.>

<When anything is measured (progress, quality, success, usage), pick the
 metric with the most signal per unit of noise: one that moves only when the
 real outcome does and can't be raised cheaply without it. Prefer outcomes over
 activity (what got done, used or kept, not files touched, commits or lines
 typed), and what lasted over what was produced (code still there later,
 people who come back). Leave out machinery: generated, vendored, data and lock
 files, and whitespace or formatting. Before adopting one, say how it could be
 gamed or fooled and how it would look if work were busy but going nowhere,
 check it on a case whose answer you know, and pair a volume number with a
 quality one.>

<Think ten steps ahead before starting. Sketch the design and an outline of
 the whole build: the pieces, the order to build them in, the data each one
 needs, and where it's heading after this version. Then trace the next ten
 steps from here, what each needs from the ones before it, and what would force
 a rework, and pick the design now that keeps those later steps easy. Put the
 outline in docs/SYSTEM-DESIGN.md before writing code, but build only what's
 in scope today.>

<Use sub-agents when they help. Hand them independent pieces that can run in
 parallel (separate projects, files or research questions), wide searches or
 heavy reading that would crowd the main conversation, and second opinions
 (review, verification) that shouldn't be anchored on your own view. Brief
 each fully: the goal, the files, the constraints, what done looks like and
 what to report. Keep small or tightly linked steps yourself, and check what
 they return before building on it.>

<Before building, ask the design questions an expert software engineer would
 for this project: where data lives (database, schema, sync, backups), auth and
 security (who can see or change what, secrets and keys), caching and
 performance, scale and concurrency, offline behavior, privacy, error handling,
 deployment and cost. Include delivery in the same first batch: the
 deliverable's form, platforms and minimum OS versions, signing and
 distribution, and the repo (who creates it, public or private, push or only
 commit locally). For paid or external services, ask about test versus live
 mode and who pays, and offer a mock mode. Ask for real sample inputs and
 working credentials before building. Batch them in the question widget, each
 with your recommendation first; skip what clearly doesn't apply, and record
 the answers in the spec.>

<When an application takes files as input, offer a visible Upload button that
 opens the file picker, accept files dragged anywhere onto the window (not
 only onto a small drop zone), and accept pasting them with ⌘V.>

<Color-code tags, categories and types by similarity: related ones share a
 hue family, with shades far enough apart to tell them apart at a glance, in
 both light and dark mode.>

<Name things the way a person would say them — "Goal Tracker", not
 goal_tracker — for the app, its windows, titles, files people open, repo
 descriptions and README headings. When you create the GitHub repo, name it
 with no "_" or "-": one word or joined words, e.g. GoalTracker.>

<Always in scope: a system design doc in the codebase, docs/SYSTEM-DESIGN.md,
 kept current as the build changes. Cover the architecture (with a Mermaid
 diagram), each component's job, the main flows, where data lives, the key
 design decisions and their trade-offs, how it's tested, and known limits.>

<Always in scope: a prompt log, docs/PROMPTS.md, kept current in every
 session. Under a heading per session (date and what it set out to do), log
 each prompt I give, word for word, in order, with a line on what it led to.
 Redact secrets, keys and personal data, and link it from the README.>

<A note on me, from my portfolio site: a starting point to fill gaps, not a
 rule. Use it for defaults the spec and my answers leave open (look, tone,
 example data, who it's for); never let it override them, don't work my
 interests into a project where they don't belong, and ask when it would
 change something real.
 - Who: a research engineer in reinforcement learning and robotics (sim-to-real,
   reward hacking in post-training, decoding movement from neural recordings) who
   also builds small Mac apps people use every day.
 - Values: high agency, ambition, deep curiosity, caring and courage. Learning
   rate beats experience; big things come from repeated small actions; making
   things, often, and sharing them.
 - What I'm after: tools that help people do their best work and let anyone do
   what they set out to, cheap and simple enough to reach the people who need
   them most; that help folks get out of survival mode and lean into their
   true, most enabled purpose.
 - Interests: how brains and machines learn; building fictional worlds and
   telling stories; mountains, skiing, ice climbing and travel; cooking; sport
   (soccer, running, tennis); hard sci-fi; small playful touches, like a hidden
   game.
 - Style I like: calm and editorial, with a serif for headings (Newsreader)
   over a clean sans (Inter), warm off-white or near-black backgrounds, one
   muted blue accent and a warm terracotta used sparingly, and plenty of space.
   Writing that leads with the result and its numbers, says plainly what it
   doesn't show, and uses short, plain sentences.>

<My taste profile: what I gravitate to, from how I've reacted to builds. Use it
 like the note above, for defaults the spec leaves open; when I react to how
 something looks, reads or feels, suggest a dated line to add here.
 - Colour: one muted accent, with colour only where it carries meaning. Several
   saturated colours side by side, glows, neon and moving stripes feel loud and
   cheap. Warm, calm palettes; dark mode that stays quiet.
 - Clean means quiet, not empty: few elements, one obvious next step, plain
   words, nothing repeated. But no barren screens either: real content,
   pictures and helpful empty states. Simple and intuitive over decorated.
 - Density: built for someone who knows what they're doing. Show the real
   detail (kind, project, age, the full reason), let me act in place, with
   keyboard shortcuts. Cut clutter, not information; never feel like it's
   talking down to me.
 - Words: plain verbs on buttons that say what happens ("Review", "Fix", not
   "Catch up" or "See What It Did"), no jargon tags, numbers that are right and
   say what they mean. A wrong or misleading number is worse than none.
 - Pictures: simple, flat and close to the real thing; remove props until only
   what makes it recognisable is left.
 - How I think: push back and make me think; show what a suggestion rests on and
   how to check it; teach the idea so I can do it myself next time; take the
   simplest thing that works; think several steps ahead.>

<Finish by listing every deliverable: path, what it is, how to check it works.>

<Git rules (no Claude attribution, never commit .claude/) are in
 ~/.claude/CLAUDE.md and apply on their own — nothing to repeat here.>

<Keep the changelog at the bottom current.>

CONTEXT:

figure out if the person is inward or outward facing (what percentage) and how to make the person more outward facing.

DELIVERABLES:

website

DEFINITIONS AND DEFERRED:

(Decided 2026-10-27; replaces the v1 four-dimension definition. The v1 site
still scores the old way until it is rebuilt; see Deferred.)

- Construct: "inward-facing" is the share of your attention that went to yourself (how you were coming across, your own feelings, what you'd say next) rather than to the other people and what they were saying, during one specific group conversation (picked by the rule below), measured with the 10-item Focus of Attention Questionnaire (FAQ; Woody, Chambless & Glass, 1997).
- Which conversation: the most recent one in the past 7 days with at least 3 people (you included) that lasted at least 10 minutes. If there wasn't one, the most recent conversation of at least 10 minutes with anyone, and the result is marked "1-to-1".
- Items: the FAQ's two 5-item subscales, used verbatim once the wording and permission are confirmed (see Deferred). Self-focus covers watching your own internal states and behaviour. External focus covers attention to the other people and the setting. Each item is answered 1 = not at all … 5 = totally.
- Subscale scores, each 0–4:

  $$S = \bar{x}_{\text{self}} - 1 \qquad E = \bar{x}_{\text{ext}} - 1$$

  - $\bar{x}_{\text{self}}$: mean of the 5 self-focus answers (1–5)
  - $\bar{x}_{\text{ext}}$: mean of the 5 external-focus answers (1–5)
  - Subtracting 1 makes "not at all" zero, so a subscale only adds to the share when you actually reported some of that attention.
- Score:

  $$\text{Inward \%} = \operatorname{round}\!\left(100 \times \frac{S}{S + E}\right)$$

  - $S$, $E$: as above (unitless, 0–4)
  - In plain words: of all the attention you reported, the percentage that was on yourself.
  - Worked example: self-focus answers average 3.0 (S = 2) and external answers average 4.0 (E = 3), so Inward % = 100 × 2 ⁄ 5 = 40%.
- Reverse-keyed items: no item is flipped to turn "outward" into "less inward." Flipping (6 − x) is only valid when an item measures the opposite end of the same dimension. Here self-focus and external focus are separate subscales: you can be high on both, or low on both. So external-focus answers stay as their own measure of outward attention and enter only through E. If the verified FAQ wording turns out to include a negatively worded item inside a subscale, only that item is flipped (6 − x) before its subscale mean is taken.
- What the numbers mean: 50% = equal amounts of self-focus and outward focus reported for that conversation. 0% = all reported attention was outward. 100% = all of it was on yourself. 50% is not the population average (there are no norms) and not a "healthy" target.
- Too little signal: if S + E < 1.0, no % is shown. The result says you reported little attention either way (for example, tired or zoned out), and shows S and E instead. Threshold invented.
- Shown alongside the %: S and E as two plain bars, so "40%" from S = 2, E = 3 can be told apart from S = 0.4, E = 0.6.
- Not in the score: how much you spoke. "Speaking up" is logged as a separate count (below), because airtime is extraversion-like behaviour and pushing introverts toward it carried costs in a randomized trial (Jacques-Hamilton, Sun & Smillie, 2019).
- "More outward-facing," as something you can observe: during a 14-day check period, log at least 3 group conversations (each defined as above) after the baseline. For each one, within 1 hour of it ending, (a) retake the FAQ for that conversation, (b) write down the specific things each other person said that you can recall (count distinct points), and (c) count the follow-up questions you asked that built on what someone had just said. You are "more outward-facing" if both hold:
  1. the median Inward % across the logged conversations is at least 10 points below the baseline Inward % (invented threshold: there is no test–retest data for this use, so smaller changes count as noise); and
  2. the median of (b) + (c) is higher than at baseline.
  A third count, (d) times you offered an idea of your own, is logged and shown but is not part of the definition.
- Where outward stops being the goal: the plan suggests outward steps only while Inward % > 40. At or below 40 it says your attention is already mostly on others and suggests nothing more. Cut-off invented. Some self-monitoring is normal, and 0% is not the aim.
- Done criteria for the construct: this section names one construct, one formula with every symbol defined, one observable outcome with numeric thresholds, and every source below has been checked.

Sources (each checked 2026-10-27 against Crossref, the publisher or the scale's own site):
- Woody, S. R., Chambless, D. L., & Glass, C. R. (1997). Self-focused attention in the treatment of social phobia. Behaviour Research and Therapy, 35(2), 117–129. doi:10.1016/S0005-7967(96)00084-8. The FAQ itself: PsycTESTS doi:10.1037/t14935-000 (permission text not yet read).
- Woody, S. R., & Rodriguez, B. F. (2000). Self-focused attention and social anxiety in social phobics and normal controls. Cognitive Therapy and Research, 24(4), 473–488. doi:10.1023/A:1005583820758.
- Clark, D. M., & Wells, A. (1995). A cognitive model of social phobia. In R. G. Heimberg, M. R. Liebowitz, D. A. Hope, & F. R. Schneier (Eds.), Social phobia: Diagnosis, assessment, and treatment. Guilford. (The model's content was checked in secondary sources. The chapter's page numbers were not.)
- Jacques-Hamilton, R., Sun, J., & Smillie, L. D. (2019). Costs and benefits of acting extraverted: A randomized controlled trial. Journal of Experimental Psychology: General, 148(9), starting p. 1538 (end page not checked). doi:10.1037/xge0000516.
- Considered and not chosen:
  - Trapnell, P. D., & Campbell, J. D. (1999). Private self-consciousness and the five-factor model of personality: Distinguishing rumination from reflection. Journal of Personality and Social Psychology, 76(2), 284–304. doi:10.1037/0022-3514.76.2.284. Not chosen because reflection goes with well-being, so "more outward" is the wrong goal for it.
  - Fenigstein, A., Scheier, M. F., & Buss, A. H. (1975). Public and private self-consciousness: Assessment and theory. Journal of Consulting and Clinical Psychology, 43(4), 522–527. doi:10.1037/h0076760. Not chosen because it is a trait measure that mixes rumination with reflection; Trapnell & Campbell (1999) split the two.
  - IPIP Big-Five Extraversion, 10 items, α = .87, and IPIP-NEO A3 Altruism, 10 items, α = .77 (ipip.ori.org; "The items and scales are in the public domain"). Not chosen: extraversion is temperament, and altruism measures kindness rather than attention.

Deferred (proposals, not built):
- Confirm the FAQ's exact item wording, any negatively worded items, and its usage permission from Woody et al. (1997) or PsycTESTS doi:10.1037/t14935-000. Until then no items ship, and the site does not show any FAQ items.
- Rebuild the v1 site to this definition: questions.js, scoring.js and plan.js still use the four-dimension average.
- Logging conversations over the 14-day check period on the site (v1 only stores one set of answers in the browser).
- Social energy, Rumination–Reflection, Altruism and Sharing: removed from the score. Showing any of them as context (never averaged in) would be a separate proposal.
- Norms, percentiles and bands: no norm data exists for this use, so there are no "mostly inward" labels.
- Checking that the "most recent group conversation" framing gives stable scores (needs repeat data from real users).
- Comparing with friends, accounts, a backend, and a Mac app (the spec names a website).

OPEN QUESTIONS / ASSUMPTIONS:

Answers from the 2026-10-27 construct session (supersede the kickoff's "Meaning" and "Result" lines below):
- Should the site try to change someone who recharges alone? No. It should help them be more outward in group settings. So the score measures behaviour in groups, not temperament.
- Construct: attention in conversation (FAQ). Reason, in my words: the score and the goal must match.
- Outward means being more present: taking in what others say, asking follow-up questions, and speaking up. Speaking up is tracked but not scored.
- One construct, one %. Combine as the share of attention on self, not as a reverse-keyed average. FAQ items used verbatim once checked.

Still a guess (check before relying on it):
- That self-focus and external focus act as separate dimensions in adults. This comes from a citing paper describing Woody & Rodriguez (2000); the full text was not read. If they turn out to be strongly negatively correlated, a simple reverse-keyed average would do just as well.
- The FAQ response labels (1 = not at all … 5 = totally) come from a study that used it, not from the original paper.
- The FAQ was built and tested on people with and without social phobia. Whether it spreads out ordinary, non-anxious users or most of them score low is unknown.
- That less self-focus during conversation is good for people who aren't anxious. Most of the evidence (Clark & Wells, 1995) comes from social anxiety research.
- Recall bias: rating a conversation from memory, especially hours later, may overstate self-focus (thinking back on it is itself self-focus). Hence the 1-hour window.
- Invented numbers: at least 3 people, at least 10 minutes, 7-day lookback, the S + E < 1.0 cut-off, the 10-point change, the 14-day period with at least 3 conversations, and the 40% plan cut-off.
- Counts (b)–(d) are self-reported. Nothing confirms them unless a conversation partner checks the recall list.

Answers from the 2026-10-27 kickoff:
- Meaning: all four (self-focused attention, introversion, building vs sharing, self vs others). [Superseded 2026-10-27: one construct, attention in conversation.]
- Audience: me first, then friends.
- Why: "it's just better", plus work/visibility, connection, wellbeing and curiosity.
- Is more outward always better: depends on dimension. Push the changeable, costly parts and leave temperament alone.
- Shape: quiz + plan. Result: 4 scores + overall average. Trade-off accepted: simplicity. [Result superseded 2026-10-27: one %, plus S and E bars.]
- Data: browser only (no server, no tracking). Delivery: public GitHub repo HowInwardFacingAreYou on GitHub Pages.
- Look: "Editorial" results layout.

Decided without asking:
- Plain static HTML/CSS/JS with no build step or framework.
- One question per screen, keys 1–5, auto-advance, Back.
- Feedback goes to GitHub Issues (no email address exposed on a public site).
- Settings: theme, reduce motion, clear saved answers.
- No margin of error is shown, because there are no norms to compute one honestly. Each score is tagged validated or unvalidated instead.

CHANGELOG:

- 2026-10-27 — created
- 2026-10-27 — filled DEFINITIONS AND DEFERRED and OPEN QUESTIONS from the kickoff answers; built v1 website
- 2026-09-15 — added meta-instruction: built-out applications include a small feedback tab
- 2026-09-15 — added meta-instruction: no "Claude" attribution in commits, PRs, or branches
- 2026-09-16 — added meta-instruction: always include a README when adding to GitHub
- 2026-09-16 — changed meta-instruction: ask clarifying questions in the question widget
- 2026-09-17 — added meta-instructions: Claude never a contributor; never commit .claude/
- 2026-09-26 — compressed the meta-instructions and every field prompt; git rules moved to the global instruction file
- 2026-10-26 — added meta-instruction: choose high signal-to-noise metrics (outcomes and what lasted, not activity)
- 2026-09-27 — added meta-instruction: applications are built as a Mac app first, then a website
- 2026-09-28 — folded inputs, instructions, constraints, deliverables and done criteria into one free-form CONTEXT
- 2026-09-28 — changed meta-instruction: a README on GitHub always includes a visual
- 2026-09-28 — added meta-instruction: name things like a person would, never snake_case
- 2026-09-28 — changed meta-instruction: README leads with visuals; instructions live in a linked guide
- 2026-09-28 — changed meta-instruction: README is visuals and links; details in docs/INSTRUCTIONS.md and docs/FILE-STRUCTURE.md
- 2026-09-29 — changed meta-instruction: GitHub repo names have no "_" or "-"
- 2026-10-02 — added a DELIVERABLES field after CONTEXT
- 2026-10-02 — added meta-instruction: every project has a system design doc at docs/SYSTEM-DESIGN.md
- 2026-10-05 — added meta-instruction: applications include a settings button or tab
- 2026-10-08 — added meta-instruction: color-code tags by similarity (related share a hue family, each distinct)
- 2026-10-09 — added meta-instruction: apps that take files have an Upload button, drop anywhere, and paste
- 2026-10-17 — added meta-instruction: before building, ask the design questions an expert engineer would (data, security, caching, scale, deployment…)
- 2026-10-18 — added meta-instruction: open the MVP for me as soon as a first working version exists, and after each big change
- 2026-10-18 — added meta-instruction: always create a relevant icon for applications
- 2026-10-18 — added meta-instructions: work like a world-class founder, software engineer and (for research) scientist
- 2026-10-18 — added meta-instruction: pick my brain with open questions answered in my own words, as well as multiple choice
- 2026-10-18 — changed meta-instruction: Mac app first only when the request names no platform (from the meta report)
- 2026-10-21 — added meta-instruction: size design decisions to the project's current scale, note what changes as it grows, and keep pieces modular and replaceable
- 2026-10-18 — changed meta-instruction: the first batch of questions also covers delivery, the repo, test versus live mode, who pays, mocks, and real inputs and credentials (from the meta report)
- 2026-10-18 — added meta-instructions: nothing made up passes as fact; fill in DEFINITIONS AND DEFERRED; a clean, restrained interface with mockups and a manual review checklist (from the meta report)
- 2026-10-18 — added a DEFINITIONS AND DEFERRED section
- 2026-10-19 — changed meta-instruction: questions mostly as multiple choice (with a box for my own answer); plain-text questions only when a detailed answer is needed, at most two per round
- 2026-10-20 — added meta-instruction: make the UI/UX buttery smooth (instant response, nothing blocking the main thread, full-frame-rate motion, no flicker or jumps)
- 2026-10-21 — added meta-instruction: make equations easy to read (typeset, not raw LaTeX; symbols defined beneath; a plain-language line; short steps)
- 2026-10-23 — added meta-instruction: keep a prompt log, docs/PROMPTS.md, of every prompt given in each session
- 2026-10-23 — added meta-instruction: push back on the idea before building (why, five levels down, then what's the best way to meet the real need); no yes-manning
- 2026-10-24 — added a note on me from my portfolio site (work, values, interests, visual and writing style), to fill gaps without overriding the spec
- 2026-10-25 — changed meta-instruction: always open the app after making a build (was: after the MVP and each big change)
- 2026-10-25 — added meta-instruction: when there's a chance to do the simplest thing that still works well, do that
- 2026-10-25 — added meta-instruction: build applications through the eyes of the people who'll use them (a wide range of people, or the specific group for a narrow use case)
- 2026-10-25 — changed meta-instruction: keep the interface clean but never barren (content, helpful empty states, icons, a next step on every screen) instead of "clean and restrained"
- 2026-10-25 — added meta-instruction: think ten steps ahead before starting (design and outline the whole build, trace the next ten steps, pick the design that keeps them easy)
- 2026-10-25 — added meta-instruction: publish production apps to GitHub (everything committed and pushed, a PR for anything unmerged, no work only on this Mac)
- 2026-10-25 — added meta-instruction: push me to think for myself (what each suggestion rests on, a way to check it, my view first on my decisions), about 10% more pushback
- 2026-10-25 — added meta-instruction: explain so I learn the skill (plain idea, analogy or worked example, why and when it fails, jargon defined, a reusable principle), in replies and in the app
- 2026-10-25 — added meta-instruction: fully test on sample data (normal, edge and failure cases, end to end) before asking me to test on real data
- 2026-10-25 — added my taste profile (colour, what clean means, density, words, pictures, how I think), from my reactions to builds
- 2026-10-25 — added meta-instruction: use sub-agents when they help (parallel independent work, heavy reading, unanchored second opinions), with full briefs, and check what they return
- 2026-10-26 — added meta-instruction: ease of use and readability come first (simple but effective, reads at a glance, long text starts short), ahead of adding more
- 2026-10-26 — changed meta-instruction: research READMEs are detailed and in-depth (question, method, results against baselines, limits, reproduce); product and app READMEs stay succinct
- 2026-10-26 — changed meta-instruction: always rebuild, reinstall and reopen after every significant change (was: open the app after making a build)
- 2026-10-26 — added meta-instruction: a higher quality bar for applications (unit and UI tests kept green, hands-on use of every flow touched, trying to break it, light/dark, sizes, keyboard and accessibility, a report of what was and wasn't tested)
- 2026-10-26 — changed the note on me: what I'm after includes helping folks get out of survival mode and lean into their true, most enabled purpose
- 2026-10-26 — changed meta-instruction: the interface isn't cheesy (no gimmicky copy, forced jokes or over-the-top celebration; personality stays quiet)
- 2026-10-27 — chose one construct, attention in conversation (Focus of Attention Questionnaire), replacing the four-dimension average; rewrote DEFINITIONS AND DEFERRED (formula, no reverse-keying, observable outcome, checked sources) and added the session's answers and guesses to OPEN QUESTIONS
