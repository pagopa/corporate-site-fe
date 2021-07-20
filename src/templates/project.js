import React from 'react'

import { graphql } from 'gatsby'

import Layout from '../partials/Layout'
import Block from '../components/Block/Block'

const ProjectPage = ({ data }) => {
  const { title, slug, locale, flexibleContent, nodeType } = data.wpProject,
    blocks = flexibleContent.body.blocks

  const currentLocale = locale.id,
    currentSlug = slug

  return (
    <Layout locale={currentLocale} slug={currentSlug}>
      {blocks &&
        blocks.map((block, key) => {
          return <Block data={block} locale={currentLocale} key={key} type={nodeType} />
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
              template
              content {
                eyelet
                link {
                  target
                  title
                  url
                }
                note {
                  fieldGroupName
                  noteText
                  noteTitle
                }
                text
                title
              }
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockVisualText {
              fieldGroupName
              reverse
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
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
              }
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_UsefulLinks {
              fieldGroupName
              title
              links {
                link {
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
              caption
              fieldGroupName
              template
              image {
                altText
                localFile {
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
                  childImageSharp {
                    gatsbyImageData(layout: FULL_WIDTH)
                  }
                }
              }
            }
            ... on WpProject_Flexiblecontent_Body_Blocks_BlockList {
              fieldGroupName
              template
              title
              items {
                title
                text
                image {
                  altText
                  localFile {
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
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                logoLink
              }
            }
          }
        }
      }
    }
  }
`
