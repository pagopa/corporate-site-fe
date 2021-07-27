import React from 'react'

import { useWpOptionsPage } from '../hooks/useWpOptionsPage'
import { useSiteMetadata } from '../hooks/useSiteMetadata.js'


import { LocaleContext } from '../contexts/LocaleContext.js'

import '../sass/app.sass'
import './Layout.sass'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import HeadScripts from './HeadScripts'

const Layout = ({ children, locale, slug }) => {

  const { title } = useSiteMetadata()
  const { onetrustSnippet } = useWpOptionsPage().various

  return (
    <LocaleContext.Provider value={locale}>
      <HeadScripts />
      
      <Header siteTitle={title || `Title`} slug={slug} />
      <main>{children}</main>
      <Footer locale={locale} />
    </LocaleContext.Provider>
  )
}

export default Layout
