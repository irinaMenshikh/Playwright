import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
  baseURL: process.env.BASE_URL,

  httpCredentials: {
    username: process.env.QAUTO_USER!,
    password: process.env.QAUTO_PASSWORD!,
  },

  trace: 'on-first-retry',
},

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});