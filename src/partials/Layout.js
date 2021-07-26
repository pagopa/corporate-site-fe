import React from 'react'

import { useSiteMetadata } from '../hooks/useSiteMetadata.js'

import { LocaleContext } from '../contexts/LocaleContext.js'

import '../sass/app.sass'
import './Layout.sass'
import Header from '../partials/Header/Header'
import Footer from '../partials/Footer/Footer'

const Layout = ({ children, locale, slug }) => {

  const { title } = useSiteMetadata()
  return (
    <LocaleContext.Provider value={locale}>
      <Header siteTitle={title || `Title`} slug={slug} />
      <main>{children}</main>
      <Footer locale={locale} />
    </LocaleContext.Provider>
  )
}

export default Layout
