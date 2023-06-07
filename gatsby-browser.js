import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import * as cookies from './src/utils/cookies';

export const wrapRootElement = ({ element }) => {
  const googleAnalyticsCookies = cookies.search('_ga');
  cookies.deleteMany(googleAnalyticsCookies);

  return element;
};
