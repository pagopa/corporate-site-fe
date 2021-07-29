import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'

import { useMenuFooter } from '../../hooks/useMenuFooter'

import Cta from '../../components/Cta/Cta'

import './MenuFooter.sass'

const MenuFooter = () => {

  const data = useMenuFooter()
  

  const menu = data.nodes

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
