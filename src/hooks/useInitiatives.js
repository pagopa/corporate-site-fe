import { useStaticQuery, graphql } from 'gatsby'

export const useInitiatives = () => {
  const { allWpInitiative } = useStaticQuery(graphql`
    query initiatives {
      allWpInitiative(limit: 4, sort: {fields: date, order: DESC}) {
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
  `)
  
  return allWpInitiative.edges
}
