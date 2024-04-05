import classNames from 'classnames';
import { Link } from 'gatsby';
import React, { useState } from 'react';
import { Menu } from '../../components/Menu';
import { Hamburger } from '../Hamburger';
import { Logo } from '../Logo';
import { Socials } from '../Socials';
import './Header.sass';
import { useI18next } from 'gatsby-plugin-react-i18next';

export const Header = ({
  reservedMenu,
  mainMenu,
}: {
  reservedMenu: Queries.MainNavigationItemFragment[];
  mainMenu: Queries.MainNavigationItemFragment[];
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const handleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const { language } = useI18next();

  // TODO Verify: The navigations of ita have for some reason the locale setted to en locale
  const mainMenuByLang = mainMenu.filter(mm => mm.path.includes(language));
  const reservedMenuByLang = reservedMenu.filter(rm =>
    rm.path.includes(language)
  );

  const route = language === 'it' ? '/it' : '/en/indexen';

  return (
    <header className={classNames('header', mobileMenuOpen && 'menu-is-open')}>
      <div className="header__top">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <Link to={route} title="PagoPA">
                <Logo title="PagoPA" menuOpen={mobileMenuOpen} />
              </Link>
            </div>
            <div className="col-auto d-block d-lg-none">
              <Hamburger handler={handleMobileMenu} />
            </div>

            <div className="col-auto d-none d-lg-block">
              <Menu reserved={reservedMenuByLang} />
            </div>
          </div>
        </div>
      </div>

      <div className="header__bottom">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <Menu main={mainMenuByLang} reserved={reservedMenuByLang} />
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
