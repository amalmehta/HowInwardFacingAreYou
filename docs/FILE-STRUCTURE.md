# File Structure

```
HowInwardFacingAreYou?.md   The project spec, with definitions and decisions filled in
README.md                   What it is, screenshots, links
site/                       The website, served as is (no build step)
  index.html                Page shell: header, settings dialog, feedback tab
  icon.svg, icon-180.png    App icon (favicon, home screen)
  css/style.css             Light/dark tokens and all styles
  js/questions.js           The 32 statements, dimensions and sources
  js/scoring.js             Scoring, bands, share-link encode/decode (pure)
  js/plan.js                Step library and the rule that picks 3 (pure)
  js/storage.js             Guarded localStorage
  js/app.js                 Screens, keyboard, settings, share
tests/unit/                 Node tests for scoring and plan
tests/ui/                   Playwright end-to-end tests
playwright.config.js        Browsers and the test server
.github/workflows/pages.yml Test, then deploy to GitHub Pages
docs/                       Instructions, system design, this file, prompt log, screenshots
```
