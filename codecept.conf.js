const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + `/.env.development` });

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './e2e/*e2e.js',
  output: './e2e/screenshots/artifacts',
  helpers: {
    Playwright: {
      url: process.env.API_URL,
      show: false,
      browser: 'chromium',
    },
    ResembleHelper: {
      require: 'codeceptjs-resemblehelper',
      screenshotFolder: './e2e/screenshots/artifacts',
      baseFolder: './e2e/screenshots/base/',
      diffFolder: './e2e/screenshots/diff/',
      prepareBaseImage: false,
    },
  },
  name: 'corporate-site-fe',
};

