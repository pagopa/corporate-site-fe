import { useStaticQuery, graphql } from 'gatsby'

export const useMenuMain = () => {
  const { wpMenu } = useStaticQuery(graphql`
    query menuMain {
      wpMenu(name: { eq: "Main Menu" }) {
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
  `)

  return wpMenu.menuItems
}
