import { Page } from '@playwright/test';

export const crawl = async (url: string, page: Page, seenURLs: Set<string>) => {
  if (seenURLs.has(url) || !url.includes(process.env.API_URL as string)) {
    return;
  }
  seenURLs.add(url);
  console.log(`Visiting ${url}`);
  await page.goto(url);
  await page.waitForSelector('#___gatsby');
  const hrefs = await page.evaluate(() => {
    return Array.from(document.links).map(item => item.href);
  });
  for await (const href of hrefs) {
    await crawl(href, page, seenURLs);
  }
  return seenURLs;
};
