import React from 'react'

import { graphql } from 'gatsby'

import Layout from '../partials/Layout'
import Block from '../components/Block/Block'

import SeoHelmet from '../components/SeoHelmet'

const Page = ({ data }) => {
  const { title, slug, locale, flexibleContent, nodeType, featuredImage, seo } = data.wpPage,
        blocks = flexibleContent.body.blocks

  const currentLocale = locale.id,
        currentSlug = slug

  const pageProps = {
    title,
    featuredImage
  }

  return (
    <Layout locale={currentLocale} slug={currentSlug}>
      
      <SeoHelmet yoast={seo} locale={currentLocale} data={pageProps} />

      {blocks &&
        blocks.map((block, key) => {
          return <Block data={block} key={key} type={nodeType} {...pageProps} />
        })}
    </Layout>
  )
}
export default Page

export const pageQuery = graphql`
  query page($id: String!) {
    wpPage(id: { eq: $id }) {
      nodeType
      locale {
        id
      }
      title
      slug

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
              gatsbyImageData(
                width: 1280
              )
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
                      gatsbyImageData(
                        width: 960
                      )
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
                          gatsbyImageData(
                            width: 640
                          )
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
                            gatsbyImageData(
                              width: 640
                            )
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
                    gatsbyImageData(
                      width: 1280
                    )
                  }
                }
              }
            }
            ... on WpPage_Flexiblecontent_Body_Blocks_BlockIntro {
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
              fieldGroupName
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
                    gatsbyImageData(
                      width: 1280
                    )
                  }
                }
              }
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
                      gatsbyImageData(
                        width: 140
                      )
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
  }
`
