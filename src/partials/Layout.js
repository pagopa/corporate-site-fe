import * as React from 'react'
import { useSiteMetadata } from '/src/hooks/useSiteMetadata.js'

import '../sass/app.sass'
import './Layout.sass'
import Header from '../partials/Header/Header'
import Footer from '../partials/Footer/Footer'

const Layout = ({ children, locale, slug }) => {
  const { title } = useSiteMetadata()
  return (
    <>
      <Header siteTitle={title || `Title`} slug={slug} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  )
}

export default Layout
