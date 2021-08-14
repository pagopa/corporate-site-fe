import { useStaticQuery, graphql } from 'gatsby'

export const useMenu = () => {
  const { allWpMenu } = useStaticQuery(graphql`
    query allMenus {
      allWpMenu {
        edges {
          node {
            name
            menuItems {
              nodes {
                id
                parentId
                url
                path
                label
                cssClasses
              }
            }
          }
        }
      }
    }
  `)

  return allWpMenu.edges
}
