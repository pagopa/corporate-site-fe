import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import './MenuFooter.sass'

const MenuFooter = () => {
  const data = useStaticQuery(graphql`
    query MenuFooter {
      wpMenu(name: { eq: "End Footer" }) {
        menuItems {
          nodes {
            path
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
        {menu.map((item, key) => {
          const { path, label } = item
          return (
            <li key={key}>
              <a href={path} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MenuFooter
