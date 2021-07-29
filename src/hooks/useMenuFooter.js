import { useStaticQuery, graphql } from 'gatsby'

export const useMenuFooter = () => {
  const { wpMenu } = useStaticQuery(graphql`
    query menuFooter {
      wpMenu(name: { eq: "Footer right" }) {
        menuItems {
          nodes {
            path
            label
            target
          }
        }
      }
    }
  `)

  

  return wpMenu.menuItems
}
