import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { devices } from '@playwright/test';

dotenv.config({ path: __dirname + `/.env.development` });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.API_URL,
    actionTimeout: 10000,
    trace: 'on-first-retry',
    headless: true,
    screenshot: {
      mode: 'off',
      fullPage: true,
      omitBackground: false,
    },
    locale: 'it-IT',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
