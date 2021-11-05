import React from 'react'

import { LocaleContext } from '../contexts/LocaleContext.js'

import '../sass/app.sass'
import './Layout.sass'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import HeadScripts from './HeadScripts'

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
