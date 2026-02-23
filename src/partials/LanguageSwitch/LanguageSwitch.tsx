import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  useId,
} from 'react';
import ita from '../../images/ita.svg';
import eng from '../../images/eng.svg';
import { navigate } from 'gatsby';

export const LanguageSwitch = () => {
  const { languages, changeLanguage, language } = useI18next();
  const { t } = useTranslation();
  const uniqueId = useId();
  const menuId = `language-menu-${uniqueId}`;

  const [isOpen, setIsOpen] = useState(false);
  const [liveText, setLiveText] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Array of refs to manage focus on each individual menu option
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const getLanguageName = (lang: string) => {
    return lang === 'it' ? 'Italiano' : 'English';
  };

  const handleChangeLanguage = async (selectedLanguage: string) => {
    // If clicking the currently active language, just close the menu and do nothing
    if (selectedLanguage === language) {
      setIsOpen(false);
      return;
    }

    const langName = getLanguageName(selectedLanguage);
    setLiveText(t('languageChangedFeedback', { language: langName }));
    setIsOpen(false);
    await changeLanguage(selectedLanguage);

    navigate(
      `/${selectedLanguage}${selectedLanguage === 'it' ? '/' : '/homepage/'}`
    );
  };

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  // Helper function to find the next focusable element on the mobile menu
  const findNextFocusableInMobileMenu = (
    currentElement: HTMLElement | null
  ): HTMLElement | null => {
    if (!currentElement) return null;

    // Find the closest mobile menu
    const mobileMenu = currentElement.closest(
      '.header__mobile-menu, .menu-header'
    );
    if (!mobileMenu) return null;

    const focusableElements = mobileMenu.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return null;

    const currentIndex = Array.from(focusableElements).indexOf(currentElement);

    if (currentIndex === -1) {
      return focusableElements[0] as HTMLElement;
    }

    if (currentIndex === focusableElements.length - 1) {
      return focusableElements[0] as HTMLElement;
    }

    return focusableElements[currentIndex + 1] as HTMLElement;
  };

  // --- FOCUS MANAGEMENT ---
  useEffect(() => {
    if (isOpen) {
      // When the menu opens, move focus to the FIRST menu item
      // setTimeout ensures the DOM is rendered before focusing
      const timer = setTimeout(() => {
        const firstItem = itemsRef.current[0];
        if (firstItem) firstItem.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
    // When menu has been closed, the focus management is handled by handleMenuKeyDown for Escape, Tab/Shift+Tab
  }, [isOpen]);

  // --- KEYBOARD NAVIGATION ---

  // 1. On the main button (Trigger)
  const handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent page scroll
      setIsOpen(true);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'Tab' && isOpen) {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab: go to next option on the menu
        if (itemsRef.current[languages.length - 1]) {
          itemsRef.current[languages.length - 1].focus();
        }
      } else {
        // Tab: go to first option on the menu
        if (itemsRef.current[0]) {
          itemsRef.current[0].focus();
        }
      }
    }
  };

  // 2. On menu options
  const handleMenuKeyDown = (e: KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        // Move focus to next element (cyclic)
        const nextIndex = (index + 1) % languages.length;
        itemsRef.current[nextIndex]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        // Move focus to previous element (cyclic)
        const prevIndex = (index - 1 + languages.length) % languages.length;
        itemsRef.current[prevIndex]?.focus();
        break;
      }
      case 'Home': {
        e.preventDefault();
        itemsRef.current[0]?.focus();
        break;
      }
      case 'End': {
        e.preventDefault();
        itemsRef.current[languages.length - 1]?.focus();
        break;
      }
      case 'Escape': {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        // Focus on trigger
        setTimeout(() => {
          triggerRef.current?.focus();
        }, 0);
        break;
      }
      case 'Tab': {
        if (e.shiftKey) {
          // Shift+Tab: go to previous element
          if (index === 0) {
            // If on the first option, close the menu. Let the browser handle focus
            setIsOpen(false);
          } else {
            // Go to previous option
            e.preventDefault();
            const prevIndex = index - 1;
            itemsRef.current[prevIndex]?.focus();
          }
        } else {
          // Tab: go to next element
          if (index === languages.length - 1) {
            // Tab on the next element: close the menu and go to next element on mobile menu
            e.preventDefault();
            setIsOpen(false);

            setTimeout(() => {
              // After the menu has been closed, find the next focusable element on the mobile menu
              const nextElement = findNextFocusableInMobileMenu(
                triggerRef.current
              );
              if (nextElement) {
                nextElement.focus();
              } else {
                // Fallback: focus on trigger
                triggerRef.current?.focus();
              }
            }, 0);
          } else {
            // Go to next option
            e.preventDefault();
            const nextIndex = index + 1;
            itemsRef.current[nextIndex]?.focus();
          }
        }
        break;
      }
      default:
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!menuRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  const currentLanguageName = getLanguageName(language);
  const currentLanguageCode = language.toUpperCase();

  return (
    <div ref={menuRef} onBlur={handleBlur} style={{ position: 'relative' }}>
      <div
        aria-live="polite"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {liveText}
      </div>

      <button
        ref={triggerRef}
        className="current-language"
        onClick={toggleMenu}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={`${t('languageSwitchLabel')}. ${t('currentLanguage', {
          language: `${currentLanguageCode} - ${currentLanguageName}`,
        })}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #7C8395',
          borderBottom: '1px solid #7C8395',
          padding: '6px',
          height: '28px',
          width: '60px',
          justifyContent: language === 'en' ? 'space-between' : undefined,
          cursor: 'pointer',
        }}
      >
        <img
          src={language === 'it' ? ita : eng}
          alt=""
          style={{
            width: '20px',
            height: '20px',
            marginRight: language === 'it' ? '6px' : '5px',
            verticalAlign: 'middle',
          }}
        />
        <span style={{ verticalAlign: 'middle' }}>{currentLanguageCode}</span>
      </button>

      <div
        id={menuId}
        role="menu"
        hidden={!isOpen}
        style={{
          position: 'absolute',
          width: '100%',
          backgroundColor: 'white',
          zIndex: 1000,
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          display: isOpen ? 'block' : 'none',
        }}
      >
        <ul
          style={{
            padding: 0,
            listStyle: 'none',
            margin: 0,
            width: '60px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
          }}
        >
          {languages.map((lng, index) => {
            const lngName = getLanguageName(lng);
            const lngCode = lng.toUpperCase();
            const isCurrent = lng === language;

            return (
              <li key={lng} role="none" style={{ margin: 0, padding: 0 }}>
                <button
                  ref={el => (itemsRef.current[index] = el)}
                  role="menuitem"
                  lang={lng}
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={() => handleChangeLanguage(lng)}
                  onKeyDown={e => handleMenuKeyDown(e, index)}
                  aria-label={`${
                    lngCode === 'IT'
                      ? 'Cambia lingua in:'
                      : 'Change language to:'
                  } ${lngCode} - ${lngName}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: lng === 'en' ? 'space-between' : undefined,
                    padding: '6px',
                    height: '28px',
                    width: '100%',
                    cursor: 'pointer',
                    border: '1px solid #7C8395',
                    borderTop: 'none',
                    backgroundColor: isCurrent ? '#dfe3eb' : 'white',
                    font: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <img
                    src={lng === 'it' ? ita : eng}
                    alt=""
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '5px',
                      verticalAlign: 'middle',
                    }}
                  />
                  <span style={{ verticalAlign: 'middle' }}>{lngCode}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
