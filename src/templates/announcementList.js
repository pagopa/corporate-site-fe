import React, { useContext } from 'react'

import { graphql } from 'gatsby'

import { LocaleContext } from '../contexts/LocaleContext.js'

import SeoHelmet from '../components/SeoHelmet.js'
import Layout from '../partials/Layout'
import Block from '../components/Block/Block'
import NewsletterBanner from '../components/NewsletterBanner/NewsletterBanner'
import Pagination from '../components/Pagination/Pagination'
import Cta from '../components/Cta/Cta'

const Announcements = ({ data }) => {
  const locale = useContext(LocaleContext)

  const { edges: allAnnouncements } = data

  const currentLocalePress = allAnnouncements.filter(
    j => j.node.locale.id === locale
  )

  return (
    <>
      {currentLocalePress.map((pr, key) => {
        const { date, title, slug, content, locale, nodeType } = pr.node

        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
          theDate = new Date(date).toLocaleDateString(locale.id, dateOptions)

        const text = content.replace(/(<([^>]+)>)/gi, '')
        const abstract = text.split(' ').splice(0, 36).join(' ')

        return (
          <article className="press-release" key={key}>
            <div>
              <h4>{theDate}</h4>
              <h3 className="--light">{title}</h3>
              <div className="wysiwyg">
                <p>{abstract}...</p>
              </div>
            </div>

            <Cta url={slug} label="Leggi" type={nodeType} />
          </article>
        )
      })}
    </>
  )
}

const AnnouncementsPage = ({ location, data, pageContext }) => {
  const {
      title,
      slug,
      locale,
      featuredImage,
      seo,
      flexibleContent,
      nodeType,
      uri,
      postConfig: { bannerNewsletter }
    } = data.page,
    blocks = flexibleContent.body.blocks

  const announcementsCollection = data.allAnnouncements

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
            <Block data={block} key={key} type={nodeType} {...pageProps} />
          )
        })}

      <section className="press-release-list">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <Announcements data={announcementsCollection} />
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
export default AnnouncementsPage

export const announcementsQuery = graphql`
  query annoucements($id: String!, $skip: Int!, $limit: Int!) {
    page: wpPage(id: { eq: $id }) {
      id
      date
      title
      slug
      uri
      link
      locale {
        id
      }
      nodeType

      postConfig {
        bannerNewsletter
      }

      featuredImage {
        node {
          altText
          localFile {
            extension
            publicURL
            childImageSharp {
              fixed(fit: COVER, quality: 90, width: 1200, height: 627) {
                src
              }
              gatsbyImageData(width: 1280)
            }
          }
        }
      }

      seo {
        opengraphTitle
        opengraphSiteName
        opengraphDescription
        opengraphImage {
          localFile {
            publicURL
            childImageSharp {
              fixed(fit: COVER, quality: 90, width: 1200, height: 627) {
                src
              }
            }
          }
        }
        opengraphType
        title
      }

      flexibleContent {
        body {
          blocks {
            ... on WpPage_Flexiblecontent_Body_Blocks_HeroSlider {
              fieldGroupName
              items {
                content {
                  text
                  title
                  link {
                    target
                    title
                    url
                  }
                }
                image {
                  altText
                  localFile {
                    extension
                    publicURL
                    childImageSharp {
                      gatsbyImageData(
                        layout: FULL_WIDTH
                        width: 520
                        height: 400
                        aspectRatio: 1.3
                        transformOptions: { cropFocus: ATTENTION }
                      )
                    }
                  }
                }
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockText {
              fieldGroupName

              blockOptions {
                backgroundGraphics {
                  fieldGroupName
                  size
                  xposition
                  yposition
                }
                blockPosition
                blockWidth
              }

              iscentered
              content {
                eyelet
                link {
                  target
                  title
                  url
                }
                text
                title
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockVisualText {
              fieldGroupName
              reverse
              blockOptions {
                backgroundGraphics {
                  fieldGroupName
                  size
                  xposition
                  yposition
                }
                blockPosition
                blockWidth
              }
              backgroundColor
              content {
                eyelet
                text
                title
                link {
                  title
                  url
                  target
                }
              }
              visual {
                width
                image {
                  altText
                  localFile {
                    extension
                    publicURL
                    childImageSharp {
                      gatsbyImageData(width: 960)
                    }
                  }
                }
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_UsefulLinks {
              fieldGroupName
              blockOptions {
                backgroundGraphics {
                  fieldGroupName
                  size
                  xposition
                  yposition
                }
                blockPosition
                blockWidth
              }
              title
              links {
                usefulAttachment {
                  title
                  localFile {
                    publicURL
                  }
                }
                usefulLink {
                  target
                  title
                  url
                }
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_ProjectCarousel {
              fieldGroupName
              title
              items {
                ... on WpProject {
                  title
                  slug
                  nodeType
                  featuredImage {
                    node {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(width: 640)
                        }
                      }
                    }
                  }
                  projectCustomFields {
                    carouselFields {
                      button
                      text
                      title
                      image {
                        altText
                        localFile {
                          extension
                          publicURL
                          childImageSharp {
                            gatsbyImageData(width: 640)
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockVisual {
              blockOptions {
                backgroundGraphics {
                  fieldGroupName
                  size
                  xposition
                  yposition
                }
                blockPosition
                blockWidth
              }
              caption
              fieldGroupName
              template
              image {
                altText
                localFile {
                  extension
                  publicURL
                  childImageSharp {
                    gatsbyImageData(width: 1280)
                  }
                }
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockIntro {
              fieldGroupName
              blockOptions {
                backgroundGraphics {
                  fieldGroupName
                  size
                  xposition
                  yposition
                }
                blockPosition
                blockWidth
              }
              eyelet
              title
              text
              usePostFeaturedImage
              image {
                altText
                localFile {
                  extension
                  publicURL
                  childImageSharp {
                    gatsbyImageData(width: 1280)
                  }
                }
              }
              introMenu
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockList {
              fieldGroupName
              blockOptions {
                backgroundGraphics {
                  fieldGroupName
                  size
                  xposition
                  yposition
                }
                blockPosition
                blockWidth
              }
              template
              title
              items {
                title
                text
                image {
                  altText
                  localFile {
                    extension
                    publicURL
                    childImageSharp {
                      gatsbyImageData(width: 140)
                    }
                  }
                }
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockBannerCta {
              fieldGroupName
              title
              bannerCtaLink {
                target
                title
                url
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockCtaGrid {
              fieldGroupName
              blockOptions {
                backgroundGraphics {
                  fieldGroupName
                  size
                  xposition
                  yposition
                }
                blockPosition
                blockWidth
              }
              items {
                text
                title
                link {
                  target
                  title
                  url
                }
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockContactsList {
              fieldGroupName
              blockOptions {
                backgroundGraphics {
                  fieldGroupName
                  size
                  xposition
                  yposition
                }
                blockPosition
                blockWidth
              }
              title
              contacts {
                email
                fieldGroupName
                title
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockMapBox {
              fieldGroupName

              image {
                localFile {
                  extension
                  publicURL
                  childImageSharp {
                    gatsbyImageData
                  }
                }
                altText
              }
              items {
                text
                title
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockLogoLinks {
              fieldGroupName
              title
              items {
                image {
                  altText
                  localFile {
                    extension
                    publicURL
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                logoLink
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockJobsListing {
              fieldGroupName
              eyelet
              title
              text
              privacyDisclaimer
              commonFeatures {
                featureText
                featureTitle
              }
              linkAttachments {
                jobsTitle
                jobsLinks {
                  usefulAttachment {
                    title
                    localFile {
                      publicURL
                    }
                  }
                  usefulLink {
                    target
                    title
                    url
                  }
                }
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockPressRelease {
              fieldGroupName
              title
              link {
                target
                title
                url
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockAttachmentsGrid {
              title
              entries {
                icon {
                  localFile {
                    extension
                    publicURL
                    childImageSharp {
                      gatsbyImageData(width: 140)
                    }
                  }
                }
                attachment {
                  title
                  localFile {
                    publicURL
                  }
                }
                label
              }
              fieldGroupName
              blockOptions {
                blockPosition
                blockWidth
                backgroundGraphics {
                  fieldGroupName
                  size
                  xposition
                  yposition
                }
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockAccordion {
              fieldGroupName
              title
              blockOptions {
                blockPosition
                blockWidth
                fieldGroupName
                backgroundGraphics {
                  fieldGroupName
                  size
                  xposition
                  yposition
                }
              }
              entries {
                accordion {
                  heading
                  content
                  attachments {
                    file {
                      title
                      localFile {
                        publicURL
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    allAnnouncements: allWpInnovationAnnouncement(
      sort: { fields: date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          date
          title
          slug
          content
          locale {
            id
          }
          nodeType
        }
      }
    }
  }
`
