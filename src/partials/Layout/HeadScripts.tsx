import React from 'react';

import { Helmet } from 'react-helmet';

export const HeadScripts = () => {
  return (
    <Helmet
      script={[
        process.env.NODE_ENV !== 'development' && {
          type: 'text/javascript',
          src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
          charset: 'UTF-8',
          'data-domain-script': '8df145b6-c56f-475c-9f81-0a1535a6f6e3',
        },
        {
          type: 'text/javascript',
          src: '/js/script-onetrust.js',
        },
      ]}
    />
  );
};
