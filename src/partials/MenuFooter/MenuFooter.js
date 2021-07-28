import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'

import Cta from '../../components/Cta/Cta'

import './MenuFooter.sass'

const MenuFooter = () => {
  const data = useStaticQuery(graphql`
    query MenuFooter {
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

  const menu = data.wpMenu.menuItems.nodes

  return (
    <nav className="menu-footer">
      <ul>
        {menu.map((item, key) => {
          const { path, label, target } = item
          return (
            <li key={key}>
              <Cta
                url={path}
                blank={target}
                label={label}
                variant="link-simple"
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MenuFooter
