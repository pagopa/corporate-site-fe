import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'partials/Layout'
import Block from 'components/Block/Block'
import NewsletterBanner from 'components/NewsletterBanner/NewsletterBanner'

import SeoHelmet from 'components/SeoHelmet'

const Page = ({ location, data }) => {
  const {
      id,
      title,
      locale,
      flexibleContent,
      nodeType,
      slug,
      // link,
      featuredImage,
      seo,
      postConfig: { bannerNewsletter },
    } = data.wpPage,
    blocks = flexibleContent.body.blocks

  const currentLocale = locale.id,
    currentSlug = slug

  const pageProps = {
    title,
    featuredImage,
    currentSlug,
  }

  return (
    <Layout locale={currentLocale} location={location}>
      <SeoHelmet yoast={seo} locale={currentLocale} data={pageProps} />

      {blocks &&
        blocks.map((block, key) => {
          return (
            <Block
              data={block}
              key={key}
              type={nodeType}
              pageID={id}
              {...pageProps}
            />
          )
        })}

      {bannerNewsletter && <NewsletterBanner />}
    </Layout>
  )
}
export default Page

export const pageQuery = graphql`
  query page($id: String!) {
    wpPage(id: { eq: $id }) {
      ...PageBaseData

      ...PageFeaturedImage

      ...PageSeo

      ...PageFlexibleContent
    }
  }
`
