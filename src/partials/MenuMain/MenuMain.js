import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import "./MenuMain.sass"

const SubMenu = ({ collection }) => {
  return (
    <ul>
      {collection.map((_item, key) => {
        return (
          <li key={key}>
            <Link to={_item.path}>{_item.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

const MenuMain = ({ currentPath }) => {
  const data = useStaticQuery(graphql`
    query MenuMain {
      wpMenu(name: { eq: "Main Menu" }) {
        menuItems {
          nodes {
            url
            path
            label
            childItems {
              nodes {
                target
                path
                label
              }
            }
          }
        }
      }
    }
  `)

  const menu = data.wpMenu.menuItems.nodes

  return (
    <nav className="menu-main">
      <ul>
        {menu.map((item, key) => {
          const slug = item.path.match(/[^/]+/g).slice(-1)[0]
          const childItems = item.childItems.nodes.length
            ? item.childItems.nodes
            : false

          const classes = []

          if (slug === currentPath) classes.push("is-current")
          if (childItems) {
            classes.push("w-sub")
            childItems.forEach(child => {
              const childSlug = child.path.match(/[^/]+/g).slice(-1)[0]
              if (childSlug === currentPath) classes.push("is-current")
            })
          }

          return (
            <li key={key} className={`menu-main__item ${classes.join(" ")}`}>
              <Link to={item.path}>{item.label}</Link>
              {childItems && <SubMenu collection={childItems} />}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MenuMain
