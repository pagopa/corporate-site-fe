import React from 'react'
import { Link } from 'gatsby'

import MenuMain from '../MenuMain/MenuMain'
import Logo from '../Logo/Logo'
import './Header.sass'

const Header = ({ siteTitle, slug }) => (
  <header className="header">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-auto">
          <Link to="/" title={siteTitle}>
            <Logo title={siteTitle} />
          </Link>
        </div>
        <div className="col-auto">
          <MenuMain currentPath={slug} />
        </div>
      </div>
    </div>
  </header>
)

export default Header
