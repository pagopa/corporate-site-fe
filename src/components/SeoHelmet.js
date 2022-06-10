import React from 'react'

import { Helmet } from 'react-helmet'

import { useWpOptionsPage } from '../hooks/useWpOptionsPage'
import { useSiteMetadata } from '../hooks/useSiteMetadata'


const SeoHelmet = ({ yoast, locale, data }) => {
  const { title, description, siteUrl } = useSiteMetadata()

  const {
    defaultSeo: {
      seoTitle: siteTitle,
      seoDescription: siteDescription,
      image: siteImage,
    },
  } = useWpOptionsPage()

  const { title: postTitle, featuredImage: postImage } = data

  const {
    opengraphTitle: yoastTitle,
    opengraphDescription: yoastDescription,
    opengraphImage: yoastImage,
    opengraphType: yoastType,
  } = yoast

  const seoSettings = {
    title: yoastTitle || `${postTitle} - ${siteTitle}` || title,
    description: yoastDescription || siteDescription || description,
    image:
      yoastImage?.localFile.childImageSharp?.fixed?.src ||
      postImage?.node.localFile.childImageSharp?.fixed?.src ||
      siteImage?.localFile.publicURL,
  }

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: locale,
        }}
        title={seoSettings.title}
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
            content: yoastType || `website`,
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
      <Helmet>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://www.pagopa.it/it/",
            "logo": "https://www.pagopa.it/pagopa.svg"
          }`}
        </script>

        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "additionalType": "Technology Company",
            "name": "PagoPA S.p.A.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Via Sardegna 38",
              "addressLocality": "Roma",
              "addressRegion": "RM",
              "postalCode": "00187",
              "addressCountry": "IT"
            },
            "department": [
              {
                "@type": "Organization",
                "name": "Sede Legale",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Piazza Colonna 370",
                  "addressLocality": "Roma",
                  "addressRegion": "RM",
                  "postalCode": "00187",
                  "addressCountry": "IT"
                }
              }, {
                "@type": "Organization",
                "name": "Sede Operativa",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Via Sardegna 38",
                  "addressLocality": "Roma",
                  "addressRegion": "RM",
                  "postalCode": "00187",
                  "addressCountry": "IT"
                }
              }
            ],
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 41.9095736,
              "longitude": 12.4914426
            },
            "url": "https://www.pagopa.it/it/"
          }`}
        </script>
      </Helmet>
    </>
  )
}

export default SeoHelmet
