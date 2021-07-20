import React from 'react'
import { Link } from 'gatsby'

import MenuMain from '../MenuMain/MenuMain'
import Socials from '../Socials/Socials'
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
        <div className="col">
          <MenuMain currentPath={slug} />
        </div>
        
        <div className="col-auto">
          <Socials header />
        </div>
      </div>
    </div>
  </header>
)

export default Header
