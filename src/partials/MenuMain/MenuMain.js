import React, { useContext, useState } from 'react'

import { Link } from 'gatsby'

import { LocaleContext } from '../../contexts/LocaleContext.js'
import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'
import { useMenuMain } from '../../hooks/useMenuMain'
import { menuHierarchify } from '../../helpers/menuHierarchify'
import { convertCPTDir } from '../../helpers/convertCPTDir'

import './MenuMain.sass'

const MenuItem = ({ item, disabled, locale }) => {
  const { translations } = useWpOptionsPage()
  const { label, path } = item

  const pathFragments = path.match(/[^/]+/g)
  const newUrl = convertCPTDir(pathFragments, translations, locale)
  const isExternal = new RegExp('^(?:[a-z]+:)?//', 'i')

  const TheLink = () => {
    if (disabled) {
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

const MenuItemTree = ({ item, location, locale }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const handleSubmenu = () => {
    if (window.innerWidth < 1200) {
      setSubmenuOpen(prev => !prev)
    }
  }

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

  if (location.pathname.split('/').find(f => f === slug)) {
    classes.push('is-current')
  }

  if (hasChilds) {
    classes.push('w-sub')
    childItems.forEach(i => {
      const { path } = i
      const slug = getSlug(path)
      if (location.pathname.split('/').find(f => f === slug)) {
        classes.push('is-current')
      }
    })
  }

  return (
    <li
      className={`menu-main__item ${classes.join(' ')}${
        hasChilds ? (submenuOpen ? ' is-sub-open' : '') : ''
      }`}
      onClick={handleSubmenu}
    >
      <MenuItem item={item} locale={locale} disabled={isDisabled} />
      {hasChilds && (
        <ul>
          {childItems.map((item, key) => {
            const { cssClasses } = item
            return (
              <li key={key} className={cssClasses.join(' ')}>
                <MenuItem item={item} locale={locale} />
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

const MenuMain = ({ location }) => {
  const data = useMenuMain()

  const menu = menuHierarchify(data.nodes)
  const locale = useContext(LocaleContext)

  return (
    <nav className="menu-main">
      <ul>
        {menu.map((item, key) => {
          return (
            <MenuItemTree
              item={item}
              location={location}
              locale={locale}
              key={key}
            />
          )
        })}
      </ul>
    </nav>
  )
}

export default MenuMain
