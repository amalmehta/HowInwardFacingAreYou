import { DIMENSIONS, QUESTIONS, SCALE } from "./questions.js";
import { score, band, isComplete, encodeShare, decodeShare } from "./scoring.js";
import { pickSteps } from "./plan.js";
import * as storage from "./storage.js";

const app = document.getElementById("app");
let state = storage.load();
const persist = () => storage.save(state);

const ICONS = {
  attention: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  social: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5a5 5 0 0 1 5.5 5"/>',
  sharing: '<path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
  others: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  redo: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
};
const svg = (name, cls = "") => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${ICONS[name]}</svg>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const dimById = Object.fromEntries(DIMENSIONS.map((d) => [d.id, d]));
const answeredCount = () => QUESTIONS.filter((q) => state.answers[q.id]).length;

// ---------- Routing ----------
function route() {
  const h = location.hash.slice(1);
  if (h.startsWith("r=")) return renderResults(decodeShare(h.slice(2)), true);
  if (h === "quiz") return renderQuiz();
  if (h === "results") return renderResults(isComplete(state.answers) ? score(state.answers) : null, false);
  if (h === "how") return renderHow();
  renderHome();
}
window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });

function mount(html) {
  app.innerHTML = `<div class="screen">${html}</div>`;
  app.focus({ preventScroll: true });
}

// ---------- Home ----------
const EXAMPLE = { attention: 68, social: 55, sharing: 72, others: 26 };

function renderHome() {
  const n = answeredCount();
  const inProgress = n > 0 && n < QUESTIONS.length;
  const done = isComplete(state.answers);
  mount(`
    <section class="hero">
      <h1>How inward-facing are you?</h1>
      <p class="lede">Rate 32 statements about yourself. You get four scores for where you face inward, and three small things to try that turn you outward.</p>
      <div class="row" style="margin-top:28px">
        ${inProgress
          ? `<a class="btn primary" href="#quiz">Resume, ${n} of ${QUESTIONS.length} ${svg("arrow")}</a>
             <button class="btn ghost" id="restart">Start over</button>`
          : done
          ? `<a class="btn primary" href="#results">See my results ${svg("arrow")}</a>
             <button class="btn ghost" id="restart">Take it again</button>`
          : `<a class="btn primary" href="#quiz">Start ${svg("arrow")}</a>`}
      </div>
      <p class="meta">About 4 minutes · Answers stay in this browser · No sign-up</p>
    </section>

    <p class="section-label">What it measures</p>
    <div class="dims" style="margin-top:14px">
      ${DIMENSIONS.map((d) => `
        <div class="dim-card">
          <div class="ico">${svg(d.id)}</div>
          <div><h3>${d.name}</h3><p>${d.question}</p></div>
        </div>`).join("")}
    </div>

    <p class="section-label">An example result</p>
    <div class="example">${barsHtml(EXAMPLE, false)}</div>
    <p class="meta">"Inward" isn't a flaw. Social energy is mostly temperament. The plan focuses on the parts that are easier to change: where attention goes, sharing your work, and making room for others. <a href="#how">How it's scored</a></p>
  `);
  app.querySelector("#restart")?.addEventListener("click", () => {
    state.answers = {}; state.idx = 0; persist(); location.hash = "quiz";
  });
  wireBars();
}

// ---------- Quiz ----------
function firstUnanswered() {
  const i = QUESTIONS.findIndex((q) => !state.answers[q.id]);
  return i === -1 ? 0 : i;
}

function renderQuiz() {
  let idx = Number.isInteger(state.idx) && state.idx >= 0 && state.idx < QUESTIONS.length ? state.idx : firstUnanswered();
  mount(`
    <section class="quiz">
      <div class="progress"><span id="count"></span><div class="bar"><i id="fill"></i></div></div>
      <p class="prompt-lead">Describe yourself as you generally are now, not as you wish to be.</p>
      <h1 class="statement" id="statement" aria-live="polite"></h1>
      <div class="scale" role="group" aria-label="How much do you agree?">
        ${SCALE.map((s, i) => `
          <button data-v="${s.value}" aria-pressed="false">
            <span class="dotbox"><span class="dot" style="width:${[22, 18, 14, 18, 22][i]}px;height:${[22, 18, 14, 18, 22][i]}px"></span></span>
            <span class="lbl">${s.label}</span><kbd>${s.value}</kbd>
          </button>`).join("")}
      </div>
      <div class="quiz-foot">
        <button class="btn ghost" id="back">${svg("back")} Back</button>
        <span class="hint">Keys 1–5 answer · ← back</span>
      </div>
    </section>
  `);
  const $ = (s) => app.querySelector(s);
  const buttons = [...app.querySelectorAll(".scale button")];

  function show(animate) {
    const q = QUESTIONS[idx];
    const el = $("#statement");
    // IPIP items are written without "I"; add it in muted text for readability.
    el.innerHTML = dimById[q.dim].validated
      ? `<span class="i">I </span>${esc(q.text[0].toLowerCase() + q.text.slice(1))}`
      : esc(q.text);
    if (animate) { el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); }
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.v) === state.answers[q.id])));
    $("#count").textContent = `${idx + 1} of ${QUESTIONS.length}`;
    $("#fill").style.width = `${(answeredCount() / QUESTIONS.length) * 100}%`;
    $("#back").disabled = idx === 0;
    $("#back").style.visibility = idx === 0 ? "hidden" : "visible";
  }

  function answer(v) {
    state.answers[QUESTIONS[idx].id] = v;
    if (isComplete(state.answers) && idx === QUESTIONS.length - 1) {
      state.idx = undefined; persist(); location.hash = "results"; return;
    }
    idx = idx < QUESTIONS.length - 1 ? idx + 1 : firstUnanswered();
    state.idx = idx; persist(); show(true);
  }
  function back() { if (idx > 0) { idx--; state.idx = idx; persist(); show(true); } }

  buttons.forEach((b) => b.addEventListener("click", () => answer(Number(b.dataset.v))));
  $("#back").addEventListener("click", back);
  quizKeys = (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || document.querySelector("dialog[open]")) return;
    if (/^[1-5]$/.test(e.key)) { e.preventDefault(); answer(Number(e.key)); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); back(); }
    else if (e.key === "ArrowRight" && state.answers[QUESTIONS[idx].id] && idx < QUESTIONS.length - 1) {
      e.preventDefault(); idx++; state.idx = idx; persist(); show(true);
    }
  };
  show(false);
}
let quizKeys = null;
document.addEventListener("keydown", (e) => { if (location.hash === "#quiz" && quizKeys) quizKeys(e); });

// ---------- Results ----------
function barsHtml(dims, open) {
  return `<div class="bars">${DIMENSIONS.map((d) => {
    const v = dims[d.id];
    return `
      <div class="bar-row">
        <button aria-expanded="${open}" aria-controls="det-${d.id}">
          <span class="name">${d.name}<span class="band">${band(v)}</span></span>
          <span class="track" role="img" aria-label="${d.name}: ${v}% inward"><i style="width:${v}%"></i></span>
          <span class="pct">${v}%</span>
          ${svg("chev", "chev")}
        </button>
        <div class="detail${open ? " open" : ""}" id="det-${d.id}">
          <p>${d.question} 0% means ${d.outward}; 100% means ${d.inward}.</p>
          <p>${d.validated ? '<span class="tag">Validated scale</span>' : '<span class="tag new">New, unvalidated</span>'} ${esc(d.source)}</p>
        </div>
      </div>`;
  }).join("")}</div>`;
}

function wireBars() {
  app.querySelectorAll(".bar-row > button").forEach((b) =>
    b.addEventListener("click", () => {
      const open = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", String(open));
      b.nextElementSibling.classList.toggle("open", open);
    })
  );
}

function renderResults(result, shared) {
  if (!result) {
    const n = answeredCount();
    mount(`
      <section class="empty">
        <img src="icon.svg" alt="">
        <h1>${shared ? "That link doesn't hold a result" : "No results yet"}</h1>
        <p>${shared
          ? "A result link ends in four numbers, like #r=62-48-70-30. This one may have been cut off when it was copied."
          : n ? `You've answered ${n} of ${QUESTIONS.length}. Finish the rest to see your scores.` : "Answer 32 statements and your four scores show up here."}</p>
        <a class="btn primary" href="#quiz">${n && !shared ? "Resume" : "Start the quiz"} ${svg("arrow")}</a>
      </section>`);
    return;
  }
  const { dims, overall } = result;
  const steps = pickSteps(dims);
  mount(`
    <section class="result-head">
      <p class="meta" style="margin:0 0 8px">${shared ? "A shared result" : "Your result"}</p>
      <div class="big">${overall}%<small>inward</small></div>
      <p class="note">That's the average of the four scores below. They measure different things, so the bars say more than this number. Tap one to see what it means and where its questions come from.</p>
    </section>
    ${barsHtml(dims, false)}

    <section class="steps">
      <h2>${shared ? "Three next steps for this result" : "Your next three steps"}</h2>
      <p class="sub">Picked from where you scored most inward. Try each for a week and check whether it helps.</p>
      ${steps.map((s, i) => `
        <details class="step">
          <summary>
            <span class="num">${i + 1}</span>
            <span>
              <h3>${esc(s.title)}</h3>
              <p class="do">${esc(s.do)}</p>
              <p class="for">${dimById[s.dim].name}</p>
              <p class="more">What it rests on and how to check ›</p>
            </span>
          </summary>
          <dl class="body">
            <dt>What it rests on</dt><dd>${esc(s.why)}${s.cite ? ` <em>${esc(s.cite)}.</em>` : ""}</dd>
            <dt>How to check it's working</dt><dd>${esc(s.check)}</dd>
          </dl>
        </details>`).join("")}
    </section>

    <div class="row result-actions">
      <button class="btn" id="share">${svg("link")} Copy result link</button>
      ${shared ? `<a class="btn primary" href="#quiz">Take it yourself ${svg("arrow")}</a>` : `<button class="btn ghost" id="retake">${svg("redo")} Take it again</button>`}
      <a class="link-quiet" href="#how">How it's scored</a>
    </div>
    <p class="meta">The link holds only the four scores, never your answers.</p>
  `);
  wireBars();
  app.querySelector("#share").addEventListener("click", async () => {
    const url = `${location.origin}${location.pathname}#r=${encodeShare(dims)}`;
    try { await navigator.clipboard.writeText(url); toast("Link copied"); }
    catch { prompt("Copy this link:", url); }
  });
  app.querySelector("#retake")?.addEventListener("click", () => {
    state.answers = {}; state.idx = 0; persist(); location.hash = "quiz";
  });
}

// ---------- How it works ----------
function renderHow() {
  mount(`
    <article class="prose">
      <h1>How it's scored</h1>
      <p>Each of the four scores is an average of your answers to its statements, stretched to run from 0% to 100%. Higher means more inward.</p>

      <h2>1. Flip the outward statements</h2>
      <p>Some statements describe facing outward ("Start conversations"). Agreeing with those should lower your inward score, so their answers are flipped.</p>
      <div class="eq" data-tex="s_i = \\begin{cases} x_i & \\text{inward statement} \\\\ 6 - x_i & \\text{outward statement} \\end{cases}">s = x, or 6 − x for outward statements</div>
      <ul class="where">
        <li><b>x<sub>i</sub></b>: your answer to statement <i>i</i>, from 1 (strongly disagree) to 5 (strongly agree)</li>
        <li><b>s<sub>i</sub></b>: its inward score, also 1 to 5</li>
      </ul>
      <p>For example, "Strongly agree" (5) with "Start conversations" becomes 6 − 5 = 1, the least inward possible.</p>

      <h2>2. Average and rescale</h2>
      <div class="eq" data-tex="D = \\frac{\\bar{s} - 1}{4} \\times 100\\%">D = (mean of s − 1) / 4 × 100%</div>
      <ul class="where">
        <li><b>s̄</b>: the mean of <i>s<sub>i</sub></i> over that dimension's statements (1 to 5)</li>
        <li><b>D</b>: the dimension's inward score, in percent (0 to 100)</li>
      </ul>
      <p>Subtracting 1 and dividing by 4 maps the 1–5 range onto 0–1. All "Neither" answers (3) give exactly 50%.</p>

      <h2>3. The overall number</h2>
      <div class="eq" data-tex="O = \\frac{D_1 + D_2 + D_3 + D_4}{4}">O = (D₁ + D₂ + D₃ + D₄) / 4</div>
      <ul class="where">
        <li><b>D<sub>1</sub>…D<sub>4</sub></b>: the Attention, Social energy, Sharing and Others-focus scores, in percent</li>
        <li><b>O</b>: the overall number, in percent</li>
      </ul>
      <p>This is a plain average. The four scales measure different things, so treat it like a single grade averaged across four subjects. It's a summary, not a measurement in its own right.</p>

      <h2>Where the statements come from</h2>
      <ul>
        ${DIMENSIONS.map((d) => `<li><b>${d.name}.</b> ${d.validated ? '<span class="tag">Validated</span>' : '<span class="tag new">New, unvalidated</span>'} ${esc(d.source)}</li>`).join("")}
      </ul>
      <p>"Validated" means researchers have checked that the statements hang together and measure one thing (reliability, α, where 1 is perfect agreement). The Attention and Sharing statements haven't been through that yet, so their scores are rougher.</p>

      <h2>What these numbers can't tell you</h2>
      <ul>
        <li><b>How you compare to others.</b> There are no population norms here, so 60% isn't "above average". It's 60% of the way from the most outward possible answers to the most inward.</li>
        <li><b>Labels are invented cut-offs.</b> "Mostly outward" (0–39), "Balanced" (40–60) and "Mostly inward" (61–100) are there to make the bars easier to read. They aren't clinical categories.</li>
        <li><b>It's easy to fool.</b> Answering as you'd like to be moves the score. The weekly checks in your steps measure what you actually do, which is the better signal.</li>
        <li><b>It isn't a diagnosis.</b> If you're stuck in worry or low mood, talk to someone you trust or a professional.</li>
      </ul>

      <p class="principle"><b>The reusable idea:</b> a self-report score is an average of answers, put on a convenient scale. Before you trust one, ask three things. Were the questions checked to measure one thing? What does 0 or 100 actually mean? Compared to whom?</p>

      <h2>References</h2>
      <ul class="refs">
        <li>Goldberg, L. R. (1992). The development of markers for the Big-Five factor structure. <i>Psychological Assessment, 4</i>(1), 26–42.</li>
        <li>Goldberg, L. R., et al. (2006). The International Personality Item Pool and the future of public-domain personality measures. <i>Journal of Research in Personality, 40</i>(1), 84–96.</li>
        <li>International Personality Item Pool, <a href="https://ipip.ori.org/" target="_blank" rel="noopener">ipip.ori.org</a> (item text and reliabilities).</li>
        <li>Ingram, R. E. (1990). Self-focused attention in clinical disorders. <i>Psychological Bulletin, 107</i>(2), 156–176.</li>
        <li>Trapnell, P. D., & Campbell, J. D. (1999). Private self-consciousness and the five-factor model of personality. <i>JPSP, 76</i>(2), 284–304.</li>
        <li>Mor, N., & Winquist, J. (2002). Self-focused attention and negative affect: A meta-analysis. <i>Psychological Bulletin, 128</i>(4), 638–662.</li>
        <li>Watkins, E. R. (2008). Constructive and unconstructive repetitive thought. <i>Psychological Bulletin, 134</i>(2), 163–206.</li>
        <li>Borkovec, T. D., et al. (1983). Stimulus control applications to the treatment of worry. <i>Behaviour Research and Therapy, 21</i>(3), 247–251.</li>
        <li>Kluger, A. N., & DeNisi, A. (1996). The effects of feedback interventions on performance. <i>Psychological Bulletin, 119</i>(2), 254–284.</li>
        <li>Curry, O. S., et al. (2018). Happy to help? Effects of performing acts of kindness on the well-being of the actor. <i>JESP, 76</i>, 320–329.</li>
        <li>Dunn, E. W., Aknin, L. B., & Norton, M. I. (2008). Spending money on others promotes happiness. <i>Science, 319</i>(5870), 1687–1688.</li>
        <li>Aknin, L. B., et al. (2020). Does spending money on others promote happiness? A registered replication report. <i>JPSP, 119</i>(2), e15–e26.</li>
        <li>Epley, N., & Schroeder, J. (2014). Mistakenly seeking solitude. <i>Journal of Experimental Psychology: General, 143</i>(5), 1980–1999.</li>
      </ul>
      <div class="row" style="margin-top:28px"><a class="btn primary" href="#quiz">Take the quiz ${svg("arrow")}</a></div>
    </article>
  `);
  typeset();
}

// KaTeX loads only for this page. If it fails (offline), the plain fallback text stays.
let katexReady;
function typeset() {
  katexReady ??= new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css";
    document.head.append(css);
    const js = document.createElement("script");
    js.src = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js";
    js.onload = resolve;
    js.onerror = () => { katexReady = null; reject(); };
    document.head.append(js);
  });
  katexReady.then(() => {
    app.querySelectorAll(".eq[data-tex]").forEach((el) => {
      try { window.katex.render(el.dataset.tex, el, { displayMode: true, throwOnError: false }); } catch {}
    });
  }).catch(() => {});
}

// ---------- Settings ----------
const dialog = document.getElementById("settings");
const form = dialog.querySelector("form");

function applySettings() {
  const s = state.settings;
  const root = document.documentElement;
  if (!s.theme || s.theme === "system") delete root.dataset.theme; else root.dataset.theme = s.theme;
  root.classList.toggle("reduce-motion", !!s.reduceMotion);
}

function openSettings() {
  form.theme.value = state.settings.theme || "system";
  form.reduceMotion.checked = !!state.settings.reduceMotion;
  if (!dialog.open) dialog.showModal();
}
document.getElementById("open-settings").addEventListener("click", openSettings);
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === ",") { e.preventDefault(); openSettings(); }
});
form.addEventListener("change", () => {
  state.settings.theme = form.theme.value;
  state.settings.reduceMotion = form.reduceMotion.checked;
  persist(); applySettings();
});
document.getElementById("clear-data").addEventListener("click", () => {
  if (!confirm("Clear all saved answers and settings in this browser?")) return;
  storage.clear();
  state = { answers: {}, settings: {} };
  applySettings(); dialog.close(); toast("Cleared");
  if (location.hash && !location.hash.startsWith("#r=")) location.hash = ""; else route();
});

// ---------- Toast ----------
let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

applySettings();
route();
