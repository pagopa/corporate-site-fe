import { useStaticQuery, graphql } from 'gatsby'

export const useEvents = () => {
  const { allWpEvent } = useStaticQuery(graphql`
    query events {
      allWpEvent(limit: 1, sort: {fields: eventField___eventDate, order: DESC}) {
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
  `)
  
  return allWpEvent.edges
}
