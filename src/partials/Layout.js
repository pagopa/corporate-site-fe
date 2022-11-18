import React from 'react'

import { LocaleContext } from 'contexts/LocaleContext.js'

import Header from 'partials/Header/Header'
import Footer from 'partials/Footer/Footer'
import HeadScripts from 'partials/HeadScripts'

import 'sass/app.sass'
import 'partials/Layout.sass'

const Layout = ({ children, locale, location }) => {
  return (
    <LocaleContext.Provider value={locale}>
      <HeadScripts />
      <Header location={location} />
      <main>{children}</main>
      <Footer locale={locale} />
    </LocaleContext.Provider>
  )
}

export default Layout
