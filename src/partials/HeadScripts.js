import React from 'react'

import parse from 'html-react-parser'
import { Helmet } from 'react-helmet'

import { useWpOptionsPage } from '../hooks/useWpOptionsPage'

const HeadScripts = () => {
  const { onetrustSnippet } = useWpOptionsPage().various

  return (
    <>
      <Helmet
        meta={[
          {
            name: 'google-site-verification',
            content: `An5q7qgSwgsWV4eUx8TshAXdo6br4412zGBt2f6I9LE`,
          },
        ]}
      />
      <Helmet>{parse(onetrustSnippet)}</Helmet>

      <Helmet
        script={[
          {
            type: 'text/javascript',
            innerHTML: `
          function OptanonWrapper() {
            var C0002 = OnetrustActiveGroups.includes("C0002");
            if (C0002 == false) {
              window['ga-disable-G-XNW0W43V93'] = true;
            }
          }
        `,
          },
        ]}
      />

      <Helmet
        script={[
          {
            type: 'text/javascript',
            innerHTML: `
          function getCookie(cName) {
            const name = cName + "=";
            const cDecoded = decodeURIComponent(document.cookie); //to be careful
            const cArr = cDecoded.split('; ');
            let res;
            cArr.forEach(val => {
              if (val.indexOf(name) === 0) res = val.substring(name.length);
            })
            return res
          }
        `,
          },
        ]}
      />

      <Helmet
        script={[
          {
            type: 'text/javascript',
            innerHTML: `
          window['ga-disable-G-XNW0W43V93'] = true;
          if (getCookie('OptanonConsent') && getCookie('OptanonConsent').includes("C0002:1") == true) {
            window['ga-disable-G-XNW0W43V93'] = false;
          }
        `,
          },
        ]}
      />

      <Helmet script={[{
        type: 'text/javascript',
        src: `https://www.googletagmanager.com/gtag/js?id=G-XNW0W43V93`,
        async: true
      }]} />
      
      <Helmet script={[{
        type: 'text/javascript', 
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'G-XNW0W43V93', {
            'anonymize_ip': true,
            'cookie_expires': 60 * 60 * 24 * 28 * 6
          });
        `
      }]} />
    </>
  )
}

export default HeadScripts
