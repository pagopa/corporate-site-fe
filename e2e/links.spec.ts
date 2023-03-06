import { expect, test } from '@playwright/test';
import { crawl } from './utils/crawl';

const { describe, beforeEach } = test;

const seenURLs = new Set<string>();
describe.skip('All pages test', () => {
  beforeEach(async ({ page }) => {
    await crawl(process.env.API_URL as string, page, seenURLs);
    console.log(`Checked ${seenURLs.size} URLs`);
  });

  test('All links respond with 200', async ({ page }) => {
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

describe('Navigation test', () => {
  test('I can navigate using the header menu', async ({ page }) => {
    await page.goto('/');
    await page.getByText('SOCIETÀ', { exact: true }).click();
    await page.getByRole('link', { name: 'Chi siamo', exact: true }).click();
    expect(page.url()).toContain('chi-siamo');
  });

  test('I can navigate using the footer menu', async ({ page }) => {
    await page.goto('/');
    const page1Promise = page.waitForEvent('popup');
    await page
      .getByRole('link', { name: 'Privacy Policy', exact: true })
      .click();
    const page1 = await page1Promise;
    expect(page1.url()).toContain('privacy-policy');
  });
});
