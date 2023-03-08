import { expect, test } from '@playwright/test';
import { callInGremlins } from './utils/gremlin';


const { describe, beforeEach } = test;

let gremlins: any;
let errors = 0;

describe('Monkey test', () => {
  beforeEach(async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`🐟`, msg);
        errors++;
      }
    });

    page.on('popup', newPage => {
      newPage.close();
    });

    await callInGremlins(page); // import gremlins.js script to page

    await page.goto(process.env.API_URL || '');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should fail if there are 10 or more errors logged', async ({
    page,
  }) => {
    await page.evaluateHandle(() => {
      return gremlins
        .createHorde({
          randomizer: new gremlins.Chance(1234),
          strategies: [gremlins.strategies.allTogether({ nb: 100 })],
        })
        .unleash();
    });

    expect(errors).toBeLessThanOrEqual(9);
    console.log('errors ' + errors);
  });
});
