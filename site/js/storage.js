// Answers and settings live only in this browser. Every access is guarded:
// in private windows or with storage blocked, the site still works, it just
// doesn't remember progress.
const KEY = "hifay.v1";

export function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    if (v && typeof v === "object") return { answers: {}, settings: {}, ...v };
  } catch {}
  return { answers: {}, settings: {} };
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function clear() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
