import React, { useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { MenuMain } from './MenuMain';
import { MenuReservedArea } from './MenuReservedArea';
import { Socials } from '../Socials';
import { Logo } from '../Logo';
import { Hamburger } from '../Hamburger';

import './Header.sass';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const handleMobileMenu = () => setMobileMenuOpen(prev => !prev);

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
              <MenuReservedArea />
            </div>
          </div>
        </div>
      </div>

      <div className="header__bottom">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <MenuMain />
            </div>

            <div className="col-auto d-none d-lg-block">
              <Socials header />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
