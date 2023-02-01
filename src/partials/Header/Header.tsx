import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';

import { Hamburger } from '../Hamburger';
import { Logo } from '../Logo';
import { Socials } from '../Socials';

import './Header.sass';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Menu } from './Menu';
import { useLocalizedQuery } from '../../hooks/useLocalizedQuery';

enum MENU {
  RESERVED_MENU = 'ReservedMenu',
  MAIN_MENU = 'MainMenu',
}

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const handleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  const query: Queries.MainNavigationQuery = useStaticQuery(graphql`
    query MainNavigation {
      allStrapiNavigation {
        nodes {
          ...MainNavigationItem
        }
      }
    }
  `);

  console.debug(query);

  const { localeNodes: menuNodes } = useLocalizedQuery<
    Queries.MainNavigationItemFragment,
    Queries.MainNavigationQuery
  >({
    query,
    type: 'allStrapiNavigation',
  });

  const reservedMenu = menuNodes?.filter(
    node => node?.key === MENU.RESERVED_MENU
  );
  const mainMenu = menuNodes?.filter(node => node?.key === MENU.MAIN_MENU);

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
              <Menu menu={reservedMenu} />
            </div>
          </div>
        </div>
      </div>

      <div className="header__bottom">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <Menu menu={mainMenu} />
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
