import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import { config } from './e2e/config';

dotenv.config({ path: __dirname + `/.env.development` });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(config.playwright);
