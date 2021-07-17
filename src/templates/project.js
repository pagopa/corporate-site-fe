import React from 'react'

import { graphql } from 'gatsby'

import Layout from '../partials/Layout'
import Block from '../components/Block/Block'

const ProjectPage = ({ data }) => {
  const { node } = data.allWpPage.edges[0],
    blocks = node.flexibleContent.body.blocks

  const currentLocale = node.locale.id,
    currentSlug = node.slug

  return (
    <Layout locale={currentLocale} slug={currentSlug}>
      {blocks &&
        blocks.map((block, key) => {
          return <Block data={block} locale={currentLocale} key={key} />
        })}
    </Layout>
  )
}
export default ProjectPage

export const projectQuery = graphql`
  query project($locale: ID) {
    allWpProject(filter: { locale: { id: { eq: $locale } } }) {
      edges {
        node {
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
                            placeholder: DOMINANT_COLOR
                            layout: FULL_WIDTH
                            quality: 90
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
              }
            }
          }
        }
      }
    }
  }
`
