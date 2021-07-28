import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { useWpOptionsPage } from '../hooks/useWpOptionsPage'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const SeoHelmet = ({ description, lang, meta, title }) => {

  const { defaultSeo } = useWpOptionsPage()
  console.log(site)

  const { seoTitle, seoDescription, image } = defaultSeo

  const seoValues = {
    title: seoTitle ? seoTitle : false,
    description: seoTitle ? seoTitle: false,
    image: seoTitle ? seoTitle: false
  }

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default SeoHelmet


// seo {
//   opengraphTitle
//   opengraphSiteName
//   opengraphDescription
//   opengraphImage {
//     localFile {
//       publicURL
//     }
//   }
//   opengraphType
//   title
//   twitterDescription
//   twitterTitle
// }