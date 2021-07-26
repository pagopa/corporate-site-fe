import React from 'react'

import { graphql } from 'gatsby'

import Layout from '../partials/Layout'
import Block from '../components/Block/Block'

const ProjectPage = ({ data }) => {
  const { title, slug, locale, flexibleContent, nodeType, featuredImage } = data.wpProject,
    blocks = flexibleContent.body.blocks

  const currentLocale = locale.id,
    currentSlug = slug

  const props = {
    title,
    featuredImage
  }

  return (
    <Layout locale={currentLocale} slug={currentSlug}>
      {blocks &&
        blocks.map((block, key) => {
          return <Block data={block} key={key} type={nodeType} {...props} />
        })}
    </Layout>
  )
}
export default ProjectPage

export const projectQuery = graphql`
  query project($id: String!) {
    wpProject(id: { eq: $id }) {
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
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      flexibleContent {
        body {
          blocks {

            ... on WpProject_Flexiblecontent_Body_Blocks_HeroSlider {
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
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockText {
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
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockVisualText {
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
                      gatsbyImageData
                    }
                  }
                }
              }
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_UsefulLinks {
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
            ... on WpProject_Flexiblecontent_Body_Blocks_ProjectCarousel {
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
                          gatsbyImageData
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
                            gatsbyImageData
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockVisual {
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
                    gatsbyImageData
                  }
                }
              }
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockIntro {
              fieldGroupName
              eyelet
              title
              text
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
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockList {
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
                      gatsbyImageData
                    }
                  }
                }
              }
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockBannerCta {
              fieldGroupName
              title
              bannerCtaLink {
                target
                title
                url
              }
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockCtaGrid {
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
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockContactsList {
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
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockMapBox {
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
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockLogoLinks {
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
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockJobsListing {
              fieldGroupName
              eyelet
              title
              text
              commonFeatures {
                featureText
                featureTitle
              }
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockPressRelease {
              fieldGroupName
              title
              link {
                target
                title
                url
              }
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockAttachmentsGrid {
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

          }
        }
      }
    }
  }
`
