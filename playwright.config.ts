import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: "http://127.0.0.1:4181", channel: process.env.CI ? undefined : "chrome" },
  webServer: { command: "npm run preview -- --host 127.0.0.1 --port 4181 --strictPort", url: "http://127.0.0.1:4181" },
});
