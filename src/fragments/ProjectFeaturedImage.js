import { graphql } from 'gatsby'

export const ProjectFeaturedImage = graphql`
  
  fragment ProjectFeaturedImage on WpProject {
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
  }
`