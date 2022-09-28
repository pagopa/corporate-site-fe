import { useStaticQuery, graphql } from 'gatsby'

export const useMenuReservedArea = () => {
  const { wpMenu } = useStaticQuery(graphql`
    query menuReservedArea {
      wpMenu(name: { eq: "Reserved Area" }) {
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
