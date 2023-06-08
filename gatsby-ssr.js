import React from 'react';

const matomo = () => {
  const html = `
    var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="https://pagopa.matomo.cloud/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '7']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src='/js/matomo.js'; s.parentNode.insertBefore(g,s);
    })();
  `;

  return (
    <script
      key="script-gatsby-plugin-matomo"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const onRenderBody = ({ setPostBodyComponents }) => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    setPostBodyComponents([matomo()]);
  }
};
