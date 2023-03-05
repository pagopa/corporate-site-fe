import { expect, test } from '@playwright/test';
import { crawl } from './utils/crawl';

const { describe, beforeEach } = test;

const seenURLs = new Set<string>();
describe.skip('General tests', () => {
  beforeEach(async ({ page }) => {
    await crawl(process.env.API_URL as string, page, seenURLs);
    console.log(`Checked ${seenURLs.size} URLs`);
  });

  test('All page links', async ({ page }) => {
    test.slow();
    for (let href of Array.from(seenURLs)) {
      await expect
        .poll(
          async () => {
            const response = await page.request.get(href);
            return response.status();
          },
          { message: href }
        )
        .toBe(200);
    }
  });
});
