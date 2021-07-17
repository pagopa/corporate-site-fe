// import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query siteMetadata {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          languages
          defaultLanguage
        }
      }
    }
  `)

  return site.siteMetadata
}
