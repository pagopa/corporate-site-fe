import React, { useState } from 'react'
import { Link } from 'gatsby'

import MenuMain from '../MenuMain/MenuMain'
import Socials from '../Socials/Socials'
import Logo from '../Logo/Logo'
import Hamburger from '../Hamburger/Hamburger'

import './Header.sass'

const Header = ({ slug }) => {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const handleMobileMenu = () => setMobileMenuOpen(prev => !prev)

  return (
    <header className={`header${mobileMenuOpen ? ' menu-is-open' : ''}`}>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-between">
          <div className="col">
            <div className="row align-items-center justify-content-between justify-content-xl-start">
              <div className="col-auto index-over-sibling">
                <Link to="/" title="PagoPA">
                  <Logo title="PagoPA" menuOpen={mobileMenuOpen} />
                </Link>
              </div>
              <div className="col-auto">
                <MenuMain currentPath={slug} />
                <Hamburger handler={handleMobileMenu} />
              </div>
            </div>
          </div>
          
          <div className="col-auto d-none d-xl-block">
            <Socials header />
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
