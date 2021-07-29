import React from 'react'

import { useSiteMetadata } from '../hooks/useSiteMetadata.js'
import { LocaleContext } from '../contexts/LocaleContext.js'
import { ParallaxProvider } from 'react-scroll-parallax';

import '../sass/app.sass'
import './Layout.sass'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import HeadScripts from './HeadScripts'

const Layout = ({ children, locale, slug }) => {

  const { title } = useSiteMetadata()

  return (
    <LocaleContext.Provider value={locale}>
      <HeadScripts />

      <Header siteTitle={title || `Title`} slug={slug} />
      <ParallaxProvider>
        <main>{children}</main>
      </ParallaxProvider>
      <Footer locale={locale} />
      
    </LocaleContext.Provider>
  )
}

export default Layout
