import React, { useState } from 'react'
import { Link } from 'gatsby'

import MenuMain from '../MenuMain/MenuMain'
import MenuReservedArea from '../MenuReservedArea/MenuReservedArea'
import Socials from '../Socials/Socials'
import Logo from '../Logo/Logo'
import Hamburger from '../Hamburger/Hamburger'

import './Header.sass'

const Header = ({ location }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const handleMobileMenu = () => setMobileMenuOpen(prev => !prev)

  return (
    <header className={`header${mobileMenuOpen ? ' menu-is-open' : ''}`}>
      <div className="header__top">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <Link to="/" title="PagoPA">
                <Logo title="PagoPA" menuOpen={mobileMenuOpen} />
              </Link>
            </div>
            <div className="col-auto d-block d-lg-none">
              <Hamburger handler={handleMobileMenu} />
            </div>

            <div className="col-auto d-none d-lg-block">
              <MenuReservedArea location={location} />
            </div>
          </div>
        </div>
      </div>

      <div className="header__bottom">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <MenuMain location={location} />
            </div>

            <div className="col-auto d-none d-lg-block">
              <Socials header />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
