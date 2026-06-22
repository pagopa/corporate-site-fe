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

  // Screen-reader focus trap: hide non-menu content from SR when mobile menu is open
  useEffect(() => {
    const mainEl = document.querySelector('main');
    const footerEl = document.querySelector('footer');

    if (mobileMenuOpen) {
      mainEl?.setAttribute('aria-hidden', 'true');
      mainEl?.setAttribute('inert', '');
      footerEl?.setAttribute('aria-hidden', 'true');
      footerEl?.setAttribute('inert', '');
    } else {
      mainEl?.removeAttribute('aria-hidden');
      mainEl?.removeAttribute('inert');
      footerEl?.removeAttribute('aria-hidden');
      footerEl?.removeAttribute('inert');
    }

    return () => {
      mainEl?.removeAttribute('aria-hidden');
      mainEl?.removeAttribute('inert');
      footerEl?.removeAttribute('aria-hidden');
      footerEl?.removeAttribute('inert');
    };
  }, [mobileMenuOpen]);

  // Keyboard focus trap for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const mobileMenuContainer = mobileMenuRef.current;
    const hamburgerButton = hamburgerRef.current;

    const isInTrap = (el: Element | null) =>
      (mobileMenuContainer && mobileMenuContainer.contains(el)) ||
      el === hamburgerButton;

    const getFocusableElements = (): HTMLElement[] => {
      const selector =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const candidates = [
        hamburgerButton,
        ...(mobileMenuContainer
          ? Array.from(
              mobileMenuContainer.querySelectorAll<HTMLElement>(selector)
            )
          : []),
      ].filter(Boolean) as HTMLElement[];

      return candidates.filter(el => {
        if (el.hidden || el.getAttribute('aria-hidden') === 'true')
          return false;
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && !el.hasAttribute('disabled');
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!isInTrap(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target === document.body) return;

      if (!isInTrap(target)) {
        e.stopImmediatePropagation();
        setTimeout(() => {
          if (!isInTrap(document.activeElement)) {
            getFocusableElements()[0]?.focus();
          }
        }, 0);
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('focusin', handleFocusIn, { capture: true });

    setTimeout(() => getFocusableElements()[0]?.focus(), 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('focusin', handleFocusIn, { capture: true });
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
        <div className="header__left" aria-hidden={mobileMenuOpen || undefined}>
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
