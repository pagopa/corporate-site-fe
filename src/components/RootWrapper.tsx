import { useEffect } from 'react';
import * as cookies from '../utils/cookies';

export const RootWrapper = ({ children }) => {
  const removeUnwantedCookies = () => {
    const googleAnalyticsCookies = cookies.search('_ga');
    cookies.deleteMany(googleAnalyticsCookies);
  };

  useEffect(() => {
    cookies.defineCookieListener();
    removeUnwantedCookies();
    document.addEventListener('cookiechange', removeUnwantedCookies);

    return () => {
      document.removeEventListener('cookiechange', removeUnwantedCookies);
    };
  }, []);

  return children;
};
