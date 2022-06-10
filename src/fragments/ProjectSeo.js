import { graphql } from 'gatsby'

export const ProjectSeo = graphql`
  
  fragment ProjectSeo on WpProject {
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
  }
`