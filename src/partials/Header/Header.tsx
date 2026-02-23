import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState<boolean>(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current) return;

    const focusableElements = mobileMenuRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Focus on the first element when menu has been opened
    setTimeout(() => {
      firstElement.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleMobileMenu = () => {
    setMobileMenuOpen(prev => {
      const newState = !prev;
      if (!newState) {
        // When menu closes, focus on hamburger button
        setTimeout(() => {
          hamburgerRef.current?.focus();
        }, 100);
      }
      return newState;
    });
  };
  const { language, navigate } = useI18next();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape': {
        e.preventDefault();
        if (!mobileMenuOpen) return;
        const isAnySubmenuOpen =
          document.querySelector('.is-sub-open') !== null;

        if (!isAnySubmenuOpen) {
          setMobileMenuOpen(false);
          hamburgerRef.current?.focus();
        }
        break;
      }
      default:
        return;
    }
  };

  const route = language === 'it' ? '/' : '/en/homepage';

  const handleLogoClick = () => {
    navigate(route);
  };

  return (
    <header
      onKeyDown={handleKeyDown}
      className={classNames(
        'header',
        mobileMenuOpen && 'menu-is-open',
        scrolled && 'header--scrolled'
      )}
    >
      <div className="header__single">
        <div className="header__left">
          <Logo
            title="PagoPA"
            menuOpen={mobileMenuOpen}
            onClick={handleLogoClick}
            version="default"
          />
          <div className="header__main-menu d-none d-xl-block">
            <Menu main={mainMenu} />
          </div>
          <div className="header__right d-none d-xl-flex">
            {language === 'it' && (
              <div className="header__right-top">
                <Menu reserved={reservedMenu} />
              </div>
            )}
            <div className="header__right-bottom">
              <div className="header__socials">
                <Socials header />
              </div>
              <div className="divider" />
              <div className="header-language-switch">
                <LanguageSwitch />
              </div>
            </div>
          </div>
        </div>

        <div className="header__mobile d-block d-xl-none">
          <Hamburger
            ref={hamburgerRef}
            handler={handleMobileMenu}
            isOpen={mobileMenuOpen}
          />
        </div>
      </div>

      <div ref={mobileMenuRef} className="header__mobile-menu d-xl-none">
        <Menu main={mainMenu} reserved={reservedMenu} />
      </div>
    </header>
  );
};
