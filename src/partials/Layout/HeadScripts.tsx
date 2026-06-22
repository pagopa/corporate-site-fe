import React from 'react';

import { Helmet } from 'react-helmet';

export const HeadScripts = () => {
  return (
    <Helmet
      script={[
        ...(process.env.NODE_ENV !== 'development'
          ? [
              {
                type: 'text/javascript',
                charset: 'UTF-8',
                src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
                'data-domain-script': '8df145b6-c56f-475c-9f81-0a1535a6f6e3',
              },
              {
                type: 'text/javascript',
                charset: 'UTF-8',
                src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
                'data-domain-script':
                  '8df145b6-c56f-475c-9f81-0a1535a6f6e3-test',
              },
            ]
          : []),
        {
          type: 'text/javascript',
          innerHTML: 'function OptanonWrapper() { }',
        },
        {
          type: 'text/javascript',
          src: '/js/script-onetrust.js',
        },
        // Fix W3C error for youtube iframe api
        {
          src: 'https://www.youtube.com/iframe_api',
        },
      ]}
    />
  );
};
