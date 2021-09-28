import { useStaticQuery, graphql } from 'gatsby'

export const useEvents = () => {
  const { allWpEvent } = useStaticQuery(graphql`
    query events {
      allWpEvent(limit: 1, sort: {fields: date, order: DESC}) {
        edges {
          node {
            nodeType
            slug
            date
            eventField {
              eventDate
            }
            title
            content
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    gatsbyImageData
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
  
  return allWpEvent.edges
}
