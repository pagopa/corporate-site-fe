import React from 'react'

import { Link } from 'gatsby'

import { useSiteMetadata } from '../../hooks/useSiteMetadata'

const Language = ({ currentLocale }) => {
  const { languages } = useSiteMetadata()

  return (
    <nav className="language">
      {languages.map((language, key) => {
        return (
          language !== currentLocale && (
            <Link to={`/${language}`} key={key}>
              {language.toUpperCase()}
            </Link>
          )
        )
      })}
    </nav>
  )
}

export default Language
