import React, { useContext } from 'react'

import { graphql } from 'gatsby'

import { LocaleContext } from 'contexts/LocaleContext.js'

import Layout from 'partials/Layout'
import NewsletterBanner from 'components/NewsletterBanner/NewsletterBanner'
import Pagination from 'components/Pagination/Pagination'
import SeoHelmet from 'components/SeoHelmet.js'
import Block from 'components/Block/Block'
import Post from 'components/Post/Post'
// import Cta from 'components/Cta/Cta'

const NewsEvents = ({ data }) => {
  const locale = useContext(LocaleContext)

  const currentLocaleNewsEvents = data.filter(j => j.node.locale.id === locale)

  currentLocaleNewsEvents.sort((a, b) => {
    const aDate =
        a.node.nodeType === 'Event' ? a.node.eventField.eventDate : a.node.date,
      bDate =
        b.node.nodeType === 'Event' ? b.node.eventField.eventDate : b.node.date,
      aTime = new Date(aDate).getTime(),
      bTime = new Date(bDate).getTime()

    return bTime - aTime
  })

  return (
    <>
      {currentLocaleNewsEvents.map((pr, key) => {
        return (
          <div className="col-12 col-lg-6 d-flex" key={key}>
            <Post data={pr.node} />
          </div>
        )
      })}
    </>
  )
}

const NewsEventPage = ({ location, data, pageContext }) => {
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

  const { allNews: news, allEvents: events, allInitiatives: initiatives } = data

  const allPosts = [...news.edges, ...events.edges, ...initiatives.edges]

  const newsEventsCollection = allPosts

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
                <NewsEvents data={newsEventsCollection} />
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
export default NewsEventPage

export const newsEventQuery = graphql`
  query newsEvent($id: String!, $skip: Int!, $limit: Int!) {
    page: wpPage(id: { eq: $id }) {
      ...PageBaseData

      ...PageFeaturedImage

      ...PageSeo

      ...PageFlexibleContent
    }

    allNews: allWpPost(
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

    allInitiatives: allWpInitiative(
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

    allEvents: allWpEvent(
      sort: { fields: eventField___eventDate, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          nodeType
          slug
          date
          eventField {
            eventDate
            eventTimeStart
            eventTimeEnd
          }
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
