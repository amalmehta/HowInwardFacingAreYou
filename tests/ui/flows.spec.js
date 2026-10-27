import { test, expect } from "@playwright/test";

const answerAll = async (page, key = "4", n = 32) => {
  for (let i = 0; i < n; i++) await page.keyboard.press(key);
};

test("home shows a start button, four dimensions and an example", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How inward-facing are you?");
  await expect(page.locator(".dim-card")).toHaveCount(4);
  await expect(page.locator(".example .bar-row")).toHaveCount(4);
  await expect(page.getByRole("link", { name: /^Start/ })).toBeVisible();
});

test("full quiz by keyboard reaches results with 4 bars and 3 steps", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard flow is desktop");
  await page.goto("/#quiz");
  await expect(page.locator("#count")).toHaveText("1 of 32");
  await answerAll(page, "3");
  await expect(page).toHaveURL(/#results$/);
  await expect(page.locator(".big")).toContainText("50%");
  await expect(page.locator(".bars .bar-row")).toHaveCount(4);
  await expect(page.locator(".step")).toHaveCount(3);
});

test("full quiz by tapping, then back changes an answer", async ({ page }) => {
  await page.goto("/#quiz");
  await page.getByRole("button", { name: /Strongly agree/ }).click();
  await expect(page.locator("#count")).toHaveText("2 of 32");
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.locator("#count")).toHaveText("1 of 32");
  await expect(page.getByRole("button", { name: /Strongly agree/ })).toHaveAttribute("aria-pressed", "true");
  for (let i = 0; i < 32; i++) await page.getByRole("button", { name: /^Agree/ }).click();
  await expect(page).toHaveURL(/#results$/);
});

test("rapid repeated clicks never skip past the end or break", async ({ page }) => {
  await page.goto("/#quiz");
  const btn = page.getByRole("button", { name: /Neither/ });
  // 40 back-to-back taps with no pause: the last 8 land after the quiz ends.
  for (let i = 0; i < 40; i++) {
    if (!(await btn.count())) break;
    await btn.click({ noWaitAfter: true, timeout: 1000 }).catch(() => {});
  }
  await expect(page).toHaveURL(/#results$/);
  await expect(page.locator(".big")).toContainText("50%");
});

test("progress survives a reload and can resume", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard flow is desktop");
  await page.goto("/#quiz");
  await answerAll(page, "2", 10);
  await page.reload();
  await expect(page.locator("#count")).toHaveText("11 of 32");
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Resume, 10 of 32/ })).toBeVisible();
});

test("share link shows results from scores alone; malformed link shows help", async ({ page }) => {
  await page.goto("/#r=71-55-66-48");
  await expect(page.locator(".big")).toContainText("60%");
  await expect(page.locator(".bar-row .pct").first()).toHaveText("71%");
  await expect(page.getByText("A shared result")).toBeVisible();
  await page.goto("/#r=71-55-66");
  await expect(page.getByRole("heading", { name: "That link doesn't hold a result" })).toBeVisible();
  await page.goto("/#r=<img src=x onerror=alert(1)>");
  await expect(page.getByRole("heading", { name: "That link doesn't hold a result" })).toBeVisible();
});

test("results without answers show an empty state with a next step", async ({ page }) => {
  await page.goto("/#results");
  await expect(page.getByRole("heading", { name: "No results yet" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Start the quiz/ })).toBeVisible();
});

test("bars and steps expand to show sources and checks", async ({ page }) => {
  await page.goto("/#r=80-50-70-30");
  const first = page.locator(".bars .bar-row > button").first();
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#det-attention")).toContainText("New, unvalidated");
  await page.locator(".step summary").first().click();
  await expect(page.locator(".step").first()).toContainText("How to check it's working");
});

test("settings: dark theme persists, clear removes answers", async ({ page }) => {
  await page.goto("/#quiz");
  await page.getByRole("button", { name: /Strongly agree/ }).click();
  await page.getByRole("button", { name: "Settings" }).click();
  await page.getByText("Dark", { exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Done" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Settings" }).click();
  await page.getByRole("button", { name: "Clear" }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");
  await page.goto("/");
  await expect(page.getByRole("link", { name: /^Start/ })).toBeVisible();
});

test("works with storage blocked", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } });
  });
  await page.goto("/#quiz");
  await page.getByRole("button", { name: /Disagree/ }).first().click();
  await expect(page.locator("#count")).toHaveText("2 of 32");
});

test("how it's scored typesets equations, and falls back offline", async ({ page }) => {
  await page.goto("/#how");
  await expect(page.locator(".eq .katex")).toHaveCount(3, { timeout: 10000 });
  const overflow = await page.$$eval(".eq", (els) => els.map((e) => e.scrollWidth - e.clientWidth));
  expect(Math.max(...overflow), "equations fit without scrolling").toBeLessThanOrEqual(1);
  const p2 = await page.context().newPage();
  await p2.route("**/cdnjs.cloudflare.com/**", (r) => r.abort());
  await p2.goto("/#how");
  await expect(p2.locator(".eq").first()).toContainText("6 − x");
});

test("no horizontal scroll and no console errors", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  for (const h of ["/", "/#quiz", "/#r=71-55-66-48", "/#how"]) {
    await page.goto(h);
    await page.waitForTimeout(150);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(over, h).toBeLessThanOrEqual(0);
  }
  expect(errors.filter((e) => !/favicon|icon-180/.test(e))).toEqual([]);
});

test("reopening the quiz after finishing starts at question 1", async ({ page }) => {
  await page.goto("/#r=1-1-1-1");
  await page.evaluate(async () => {
    const { QUESTIONS } = await import("/js/questions.js");
    localStorage.setItem("hifay.v1", JSON.stringify({ answers: Object.fromEntries(QUESTIONS.map((q) => [q.id, 3])), settings: {} }));
  });
  await page.goto("/#quiz");
  await page.reload();
  await expect(page.locator("#count")).toHaveText("1 of 32");
});
