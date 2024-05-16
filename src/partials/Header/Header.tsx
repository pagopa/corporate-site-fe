import classNames from 'classnames';
import { Link } from 'gatsby';
import React, { useState } from 'react';
import { Menu } from '../../components/Menu';
import { Hamburger } from '../Hamburger';
import { Logo } from '../Logo';
import { Socials } from '../Socials';
import './Header.sass';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';

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

  const route = language === 'it' ? '/it' : '/en/homepage';

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
              <Menu reserved={reservedMenu} />
            </div>
          </div>
        </div>
      </div>

      <div className="header__bottom">
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-auto">
              <Menu main={mainMenu} reserved={reservedMenu} />
            </div>
            <div className="col-auto d-none d-lg-flex">
              <div>
                <Socials header />
              </div>
              <div className="divider" />
              <div className="language-switch-container">
                <LanguageSwitch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
