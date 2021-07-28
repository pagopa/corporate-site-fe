import React from 'react'

import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { useWpOptionsPage } from '../hooks/useWpOptionsPage'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const SeoHelmet = ({ yoast, locale, data }) => {

  const { title, description, siteUrl } = useSiteMetadata()

  const { defaultSeo: { seoTitle, seoDescription, image } } = useWpOptionsPage()
  const {
    opengraphTitle,
    opengraphDescription,
    opengraphImage,
    opengraphType
  } = yoast

  // opengraphTitle
  // opengraphSiteName
  // opengraphDescription
  // opengraphImage {
  //   localFile {
  //     publicURL
  //   }
  // }
  // opengraphType
  // title
  // twitterDescription
  // twitterTitle

  const seoSettings = {
    title: opengraphTitle || seoTitle || title,
    description: opengraphDescription || seoDescription || description,
    image: image?.localFile.publicURL,
  }

  // console.log(seoTitle)
  // console.log(seoDescription)
  // console.log(image?.localFile.publicURL)

  // const metaDescription = description || site.siteMetadata.description
  // const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang: locale,
      }}
      title={seoSettings.title}
      //   titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: seoSettings.description,
        },
        {
          property: `og:title`,
          content: seoSettings.title,
        },
        {
          property: `og:description`,
          content: seoSettings.description,
        },
        {
          property: `og:image`,
          content: `${siteUrl}${seoSettings.image}`,
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
          name: `twitter:title`,
          content: seoSettings.title,
        },
        {
          name: `twitter:description`,
          content: seoSettings.description,
        },
      ]}
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
