import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import { Helmet } from 'react-helmet'

import { useWpOptionsPage } from 'hooks/useWpOptionsPage'
import { useSiteMetadata } from 'hooks/useSiteMetadata'

const getRedirectLanguage = (defaultLanguage, languages) => {
  let targetLanguage = defaultLanguage

  if (typeof navigator === `undefined`) return targetLanguage

  const userLanguage =
    navigator && navigator.language && navigator.language.split('-')[0]

  if (!userLanguage) return targetLanguage

  languages.forEach(language => {
    if (language === userLanguage) targetLanguage = language
  })

  return targetLanguage
}

const IndexPage = () => {
  const { defaultLanguage, languages, siteUrl } = useSiteMetadata()
  const {
    defaultSeo: {
      seoTitle: siteTitle,
      seoDescription: siteDescription,
      image: siteImage,
    },
  } = useWpOptionsPage()

  useEffect(() => {
    const urlLanguage = getRedirectLanguage(defaultLanguage, languages)
    navigate(`/${urlLanguage}/`, {
      replace: true,
    })
  }, [defaultLanguage, languages])

  return (
    <Helmet
      htmlAttributes={{
        lang: defaultLanguage,
      }}
      title={siteTitle}
      meta={[
        {
          name: `description`,
          content: siteDescription,
        },
        {
          property: `og:title`,
          content: siteTitle,
        },
        {
          property: `og:description`,
          content: siteDescription,
        },
        {
          property: `og:image`,
          content: `${siteUrl}${siteImage?.localFile.publicURL}`,
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
          content: siteTitle,
        },
        {
          name: `twitter:description`,
          content: siteDescription,
        },
      ]}
    />
  )
}

export default IndexPage
