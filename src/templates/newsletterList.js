import React, { useContext } from 'react'

import { graphql } from 'gatsby'

import { LocaleContext } from '../contexts/LocaleContext.js'

import SeoHelmet from '../components/SeoHelmet.js'
import Layout from '../partials/Layout'
import Block from '../components/Block/Block'
import NewsletterBanner from '../components/NewsletterBanner/NewsletterBanner'
import Pagination from '../components/Pagination/Pagination'
import Post from '../components/Post/Post'

const Newsletters = ({ data }) => {
  const locale = useContext(LocaleContext)

  const { edges: allNewsletters } = data

  const currentLocale = allNewsletters.filter(j => j.node.locale.id === locale)

  return (
    <>
      {currentLocale.map((pr, key) => {
        return (
          <div className="col-12 col-lg-6 d-flex" key={key}>
            <Post data={pr.node} />
          </div>
        )
      })}
    </>
  )
}

const NewslettersPage = ({ location, data, pageContext }) => {
  const {
      title,
      slug,
      locale,
      featuredImage,
      seo,
      flexibleContent,
      nodeType,
      uri,
      postConfig: { bannerNewsletter },
    } = data.page,
    blocks = flexibleContent.body.blocks

  const newslettersCollection = data.allNewsletters

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
          return <Block data={block} key={key} type={nodeType} {...pageProps} />
        })}

      <section className="press-release-list">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="row">
                <Newsletters data={newslettersCollection} />
              </div>
              <Pagination
                context={pageContext}
                baseUri={uri.replace(/\/$/, '')}
              />
            </div>
          </div>
        </div>
      </section>

      {bannerNewsletter && <NewsletterBanner />}
    </Layout>
  )
}
export default NewslettersPage

export const newslettersQuery = graphql`
  query newsletters($id: String!, $skip: Int!, $limit: Int!) {
    page: wpPage(id: { eq: $id }) {
      ...PageBaseData
      ...PageFeaturedImage
      ...PageSeo
      ...PageFlexibleContent
    }
    allNewsletters: allWpNewsletter(
      sort: { fields: date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          nodeType
          slug
          date
          title
          content
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH
                    aspectRatio: 1.33
                    width: 460
                    height: 346
                    transformOptions: { cropFocus: ATTENTION }
                  )
                }
              }
            }
          }
          locale {
            id
          }
        }
      }
    }
  }
`
