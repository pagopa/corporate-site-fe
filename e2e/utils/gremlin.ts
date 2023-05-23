import { Page } from '@playwright/test';

export const callInGremlins = (page: Page) =>
  page.addInitScript({
    path: './node_modules/gremlins.js/dist/gremlins.min.js',
  });
