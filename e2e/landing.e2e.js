Feature('Landing Page');

Scenario('I read the welcome message', ({ I }) => {
  I.amOnPage('/');
  I.see('Per una nuova generazione di servizi pubblici digitali');
});

Scenario('I check for differences', async ({ I }) => {
  I.amOnPage('/');
  I.wait(1);
  I.saveScreenshot('Home.png');
  I.seeVisualDiff('Home.png', {
    tolerance: 2,
  });
});

Scenario('I can see all main blocks', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.header');
  I.seeElement('.footer');
  I.seeElement('main .block.--hero');
  I.seeElement('main .block.--block-visual-text');
  I.seeElement('main .block.projects-carousel');
});

Scenario('Video curtain disappears on play', async ({ I }) => {
  I.amOnPage('/');
  I.usePlaywrightTo('Scrolling to the video', async ({ page }) => {
    const video = page.locator('.video');
    await video.scrollIntoViewIfNeeded();
  });
  I.seeElement('.video__curtain');
  I.click('.video__play');
  I.dontSeeElement('.video__curtain');
});
