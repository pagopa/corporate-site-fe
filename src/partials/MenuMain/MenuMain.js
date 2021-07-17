import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import { menuHierarchify } from '../../helpers/menuHierarchify'
import './MenuMain.sass'

export const MenuItem = ({ item, currentPath }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const openTheSubmenu = () => setSubmenuOpen(true)
  const closeTheSubmenu = () => setSubmenuOpen(false)

  const { label, path, cssClasses, childItems: children } = item
  const slug = path.match(/[^/]+/g).slice(-1)[0]
  const classes = [...cssClasses]
  const isDisabled = classes.includes('disabled')
  const isExternal = new RegExp('^(?:[a-z]+:)?//', 'i')
  const hasChildren = children.length ? true : false

  // current class check
  if (slug === currentPath) classes.push('is-current')
  if (hasChildren) {
    classes.push('w-sub')
    children.forEach(child => {
      const childSlug = child.path.match(/[^/]+/g).slice(-1)[0]
      if (childSlug === currentPath) classes.push('is-current')
    })
  }
  // end current class check

  const ItemMarkup = () => {
    if (isDisabled) {
      return <span {...props}>{label}</span>
    } else {
      if (isExternal.test(path)) {
        return (
          <a href={path} target="_blank" rel="noopener noreferrer" {...props}>
            {label}
          </a>
        )
      } else {
        return (
          <Link to={path} {...props}>
            {label}
          </Link>
        )
      }
    }
  }

  const props = {}
  // if (hasChildren) {
  //   props.onMouseEnter = openTheSubmenu
  //   props.onMouseLeave = closeTheSubmenu
  // }

  return (
    <li
      className={`menu-main__item ${classes.join(' ')} ${
        submenuOpen ? 'is-sub-open' : ''
      }`}
      {...props}
    >
      <ItemMarkup />

      {hasChildren && (
        <ul>
          {children.map((item, key) => {
            const { label, path } = item
            return (
              <li key={key}>
                <Link to={path}>{label}</Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

const MenuMain = ({ currentPath }) => {
  const data = useStaticQuery(graphql`
    query MenuMain {
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

  const menu = menuHierarchify(data.wpMenu.menuItems.nodes)

  return (
    <nav className="menu-main">
      <ul>
        {menu.map((item, key) => (
          <MenuItem item={item} currentPath={currentPath} key={key} />
        ))}
      </ul>
    </nav>
  )
}

export default MenuMain
