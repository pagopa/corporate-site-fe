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

export const LanguageSwitch = () => {
  const { languages, changeLanguage, language } = useI18next();
  const { t } = useTranslation();
  const uniqueId = useId();
  const menuId = `language-menu-${uniqueId}`;

  const [isOpen, setIsOpen] = useState(false);
  const [liveText, setLiveText] = useState('');

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Protection flag: prevents any closing mechanism for a short time after opening.
  // This fixes iOS double-tap where rapid events (touchstart, blur, click)
  // would immediately close the dropdown after it opens.
  const justOpenedRef = useRef(false);

  const getLanguageName = (lang: string) => {
    return lang === 'it' ? 'Italiano' : 'English';
  };

  const handleChangeLanguage = async (selectedLanguage: string) => {
    // Block accidental clicks from iOS double-tap landing on menu items
    if (justOpenedRef.current) return;

    const langName = getLanguageName(selectedLanguage);
    const langCode = selectedLanguage.toUpperCase();

    if (selectedLanguage === language) {
      const activeFeedbackMsg =
        selectedLanguage === 'it'
          ? `Lingua impostata: ${langCode} - ${langName}`
          : `Language set: ${langCode} - ${langName}`;

      setLiveText(activeFeedbackMsg);
      setIsOpen(false);
      setTimeout(() => triggerRef.current?.focus(), 0);
      return;
    }

    setLiveText(t('languageChangedFeedback', { language: langName }) ?? '');
    setIsOpen(false);
    const targetPath = selectedLanguage === 'it' ? '/' : '/en/homepage/';
    await changeLanguage(selectedLanguage, targetPath);
  };

  const toggleMenu = () => {
    if (justOpenedRef.current) return;
    setIsOpen(prev => {
      if (!prev) {
        // Opening: set protection flag
        justOpenedRef.current = true;
        setTimeout(() => {
          justOpenedRef.current = false;
        }, 400);
      }
      return !prev;
    });
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const firstItem = itemsRef.current[0];
        // tabIndex is already 0 via the isOpen prop, so .focus() works on iOS
        if (firstItem) firstItem.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Skip if dropdown was just opened (iOS double-tap protection)
      if (justOpenedRef.current) return;

      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Only use mousedown (not touchstart) to detect clicks outside.
    // On mobile, a real tap still fires mousedown after touch events.
    // Screen reader swipe gestures (TalkBack, VoiceOver) fire touchstart
    // but NOT mousedown, so removing touchstart prevents the dropdown
    // from closing when the user swipes to navigate between options.
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'Tab' && isOpen) {
      // Close dropdown and let the browser handle Tab navigation naturally
      setIsOpen(false);
    }
  };

  const handleMenuKeyDown = (e: KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = (index + 1) % languages.length;
        itemsRef.current[nextIndex]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
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
        setTimeout(() => {
          triggerRef.current?.focus();
        }, 0);
        break;
      }
      case 'Tab': {
        if (e.shiftKey) {
          if (index === 0) {
            e.preventDefault();
            setIsOpen(false);
            setTimeout(() => {
              triggerRef.current?.focus();
            }, 0);
          } else {
            e.preventDefault();
            const prevIndex = index - 1;
            itemsRef.current[prevIndex]?.focus();
          }
        } else {
          if (index === languages.length - 1) {
            e.preventDefault();
            setIsOpen(false);
            // Return focus to trigger; the Header focus trap handles cycling
            // to the next element when the user presses Tab again
            setTimeout(() => triggerRef.current?.focus(), 0);
          } else {
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
    // Skip if dropdown was just opened (iOS double-tap protection)
    if (justOpenedRef.current) return;

    // On iOS, relatedTarget may be null for programmatic focus changes.
    // In that case, don't close - let handleClickOutside handle it instead.
    if (!e.relatedTarget) return;

    // Don't close if focus is moving to another element within the language switcher
    if (
      !menuRef.current?.contains(e.relatedTarget as Node) &&
      e.relatedTarget !== triggerRef.current
    ) {
      // Use timeout to allow screen reader users to swipe to next item
      setTimeout(() => {
        if (justOpenedRef.current) return;
        if (
          document.activeElement &&
          !menuRef.current?.contains(document.activeElement)
        ) {
          setIsOpen(false);
        }
      }, 100);
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
        hidden={!isOpen}
        style={{
          position: 'absolute',
          width: '100%',
          backgroundColor: 'white',
          zIndex: 1000,
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <ul
          id={menuId}
          role="menu"
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

            const ariaLabelText = isCurrent
              ? `${lngCode} - ${lngName}`
              : `${
                  lngCode === 'IT' ? 'Cambia lingua in:' : 'Change language to:'
                } ${lngCode} - ${lngName}`;

            return (
              <li key={lng} role="none" style={{ margin: 0, padding: 0 }}>
                <button
                  ref={el => (itemsRef.current[index] = el)}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  lang={lng}
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={() => handleChangeLanguage(lng)}
                  onKeyDown={e => handleMenuKeyDown(e, index)}
                  aria-label={ariaLabelText}
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
