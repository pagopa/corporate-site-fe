import { useStaticQuery, graphql } from 'gatsby'

export const useJobPositions = () => {
  const { allWpJobPosition } = useStaticQuery(graphql`
    query jobs {
      allWpJobPosition(
        sort: { fields: jobPositionFields___openDate, order: DESC }
      ) {
        edges {
          node {
            slug
            nodeType
            locale {
              id
            }
            jobPositionFields {
              openDate
              isNew
              closeDate
            }
            title
          }
        }
      }
    }
  `)
  
  return allWpJobPosition.edges
}
