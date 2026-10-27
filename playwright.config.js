import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/ui",
  fullyParallel: true,
  use: { baseURL: "http://localhost:4174" },
  webServer: { command: "python3 -m http.server 4174 -d site", port: 4174, reuseExistingServer: true },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "phone", use: { ...devices["iPhone 13"] } },
  ],
});
