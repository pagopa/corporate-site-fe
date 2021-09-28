import { useStaticQuery, graphql } from 'gatsby'

export const useNews = () => {
  const { allWpPost } = useStaticQuery(graphql`
    query news {
      allWpPost(limit: 1, sort: {fields: date, order: DESC}) {
        edges {
          node {
            nodeType
            slug
            date
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
  
  return allWpPost.edges
}
