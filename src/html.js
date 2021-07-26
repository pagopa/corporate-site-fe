import React from 'react'
import parse from 'html-react-parser'

import { useWpOptionsPage } from './hooks/useWpOptionsPage'

import PropTypes from 'prop-types'

export default function HTML(props) {
  const { onetrustSnippet } = useWpOptionsPage().various

  return (
    <html {...props.htmlAttributes}>
      <head>
        {parse(onetrustSnippet)}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
