import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import './MenuContacts.sass'

const MenuContacts = () => {
  const data = useStaticQuery(graphql`
    query MenuContacts {
      wpMenu(name: { eq: "Contacts" }) {
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
    <nav className="menu-contacts">
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

export default MenuContacts
