import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import { LocaleContext } from '../../contexts/LocaleContext.js'
import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'
import { menuHierarchify } from '../../helpers/menuHierarchify'
import { convertCPTDir } from '../../helpers/convertCPTDir'

import './MenuMain.sass'

export const MenuItem = ({ item, isDisabled, locale }) => {
  const { translations } = useWpOptionsPage()

  const { label, path, cssClasses } = item

  const pathFragments = path.match(/[^/]+/g)

  const newUrl = convertCPTDir(pathFragments, translations, locale)

  const isExternal = new RegExp('^(?:[a-z]+:)?//', 'i')

  const TheLink = () => {
    if (isDisabled) {
      return <span>{label}</span>
    } else {
      if (isExternal.test(path)) {
        return (
          <a href={path} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        )
      } else {
        return <Link to={newUrl}>{label}</Link>
      }
    }
  }

  return <TheLink />
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
  const locale = useContext(LocaleContext)

  return (
    <nav className="menu-main">
      <ul>
        {menu.map((item, key) => {
          const { childItems, cssClasses, path } = item
          const classes = [...cssClasses]

          const hasChilds = childItems.length ? true : false
          const isDisabled = classes.includes('disabled')

          const getSlug = path => {
            const pathFragments = path.match(/[^/]+/g)
            return pathFragments.slice(-1)[0]
          }
          const slug = getSlug(path)

          // classes check
          if (slug === currentPath) {
            classes.push('is-current')
          }

          if (hasChilds) {
            classes.push('w-sub')
            childItems.forEach(i => {
              const { path } = i
              const slug = getSlug(path)
              if (slug === currentPath) {
                classes.push('is-current')
              }
            })
          }

          return (
            <li className={`menu-main__item ${classes.join(' ')}`} key={key}>
              <MenuItem
                item={item}
                currentPath={currentPath}
                locale={locale}
                isDisabled
              />
              {hasChilds && (
                <ul>
                  {childItems.map((item, key) => {
                    return (
                      <li key={key}>
                        <MenuItem
                          item={item}
                          currentPath={currentPath}
                          locale={locale}
                        />
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MenuMain
