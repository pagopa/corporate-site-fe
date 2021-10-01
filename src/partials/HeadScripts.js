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
      
      <Helmet
        script={[
          {
            type: 'text/javascript',
            src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
            charset: 'UTF-8',
            'data-domain-script': '0f8d3397-33ff-415a-aa59-4195ca2d0ce3'
          }, {
            type: 'text/javascript',
            src: '/js/script-onetrust.js'
          },
          // {
          //   type: 'text/javascript',
          //   src: `https://www.googletagmanager.com/gtag/js?id=G-XNW0W43V93`,
          //   async: true,
          // }, {
          //   type: 'text/javascript',
          //   src: '/js/script-ga.js'
          // }
        ]}
      
      />


    </>
  )
}

export default HeadScripts
