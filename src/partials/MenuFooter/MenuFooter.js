import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import './MenuFooter.sass'

const MenuFooter = () => {
  const data = useStaticQuery(graphql`
    query MenuFooter {
      wpMenu(name: { eq: "End Footer" }) {
        menuItems {
          nodes {
            url
            label
          }
        }
      }
    }
  `)

  const menu = data.wpMenu.menuItems.nodes

  return (
    <nav className="menu-footer">
      <ul>
        {menu.map((_item, key) => {
          return (
            <li key={key}>
              <a href={_item.url} target="_blank" rel="noopener noreferrer">
                {_item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MenuFooter
