import React from 'react'

import { graphql } from 'gatsby'

import Layout from '../partials/Layout'
import Block from '../components/Block/Block'
import NewsletterBanner from '../components/NewsletterBanner/NewsletterBanner'

import SeoHelmet from '../components/SeoHelmet'

const ProjectPage = ({ location, data }) => {
  const {
      title,
      slug,
      locale,
      flexibleContent,
      nodeType,
      featuredImage,
      seo,
      // link,
      postConfig: { bannerNewsletter },
    } = data.wpProject,
    blocks = flexibleContent.body.blocks

  const currentLocale = locale.id,
    currentSlug = slug

  const pageProps = {
    title,
    featuredImage,
    currentSlug
  }

  return (
    <Layout locale={currentLocale} location={location}>
      <SeoHelmet yoast={seo} locale={currentLocale} data={pageProps} />

      {blocks &&
        blocks.map((block, key) => {
          return <Block data={block} key={key} type={nodeType} {...pageProps} />
        })}

      {bannerNewsletter && <NewsletterBanner />}
    </Layout>
  )
}
export default ProjectPage

export const projectQuery = graphql`
  query project($id: String!) {
    wpProject(id: { eq: $id }) {
      ...ProjectBaseData

      ...ProjectFeaturedImage

      ...ProjectSeo

      ...ProjectFlexibleContent
      
    }
  }
`
