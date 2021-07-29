import { useStaticQuery, graphql } from 'gatsby'

export const usePressReleases = () => {
  const { allWpPressReleases } = useStaticQuery(graphql`
    query pressReleases {
      allWpPressReleases(limit: 2, sort: {fields: date, order: DESC}) {
        edges {
          node {
            date
            title
            slug
            content
            locale {
              id
            }
            nodeType
          }
        }
      }
    }
  `)
  
  return allWpPressReleases.edges
}
