# Instructions

## Run it locally

Needs Python 3 (any static file server works).

```bash
npm start
```

Then open http://localhost:4173.

## Test

```bash
npm install
npm test          # unit tests: scoring, keying, bands, share links, plan rules
npm run test:ui   # Playwright: Chromium, WebKit, iPhone 13 size
```

## Use it

1. **Start.** One statement per screen. Click or press **1–5**, and **←** goes back. Progress is saved, so you can close the tab and resume.
2. **Results.** Tap a bar to see what it means and where its questions come from. Tap a step to see what it rests on and how to check it's working.
3. **Share.** "Copy result link" makes a link holding only the four scores (`#r=75-63-83-25`).
4. **Settings.** The gear icon, or **⌘ ,** / **Ctrl ,**: theme, reduce motion, clear saved answers.
5. **Feedback.** The small tab at the bottom right opens a GitHub issue.

## Deploy

Pushing to `main` runs the tests in GitHub Actions and publishes `site/` to GitHub Pages.

## Manual review checklist

What the automated tests can't judge:

- [ ] **Feel.** Answering is instant, and the statement slides in without flicker. Bars grow smoothly on results.
- [ ] **Words.** The statements read naturally, and no step sounds preachy or cheesy.
- [ ] **Dark mode.** It stays quiet, with the accent readable on every component.
- [ ] **Real phone.** Taps never zoom, buttons are easy to hit, and the Feedback link doesn't cover text.
- [ ] **VoiceOver.** Each statement is announced when it changes, and the bars read "Attention: 75% inward".
- [ ] **Larger text.** At 200% browser zoom nothing overlaps or clips.
- [ ] **Live services.** Google Fonts and KaTeX load on the deployed site; offline, the formulas fall back to plain text.
- [ ] **Sharing.** A shared link opens correctly in Messages, Slack and email.
