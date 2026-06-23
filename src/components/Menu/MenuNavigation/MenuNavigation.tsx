import classNames from 'classnames';
import React, {
  useState,
  useRef,
  FocusEventHandler,
  useId,
  useEffect,
} from 'react';
import { MenuItem } from '../MenuItem';
import '../Menu.sass';
import { useLocation } from '@reach/router';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const MOBILE_BREAKPOINT = 992;

export const MenuNavigation = ({
  item,
  className,
}: {
  item: Queries.MainNavigationItemFragment;
  className: string;
}) => {
  const { t } = useTranslation();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const submenuId = useId();
  const menuRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const { items, highlight } = item;

  const isCurrent = pathname
    .split('/')
    .includes((item.uiRouterKey?.replace(/-\d+/, '') ?? '') as string);
  const hasChildren = !!items?.length;

  const handleSubmenu = () => {
    setSubmenuOpen(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const isMenuTrigger = target.classList.contains('menu-trigger');
    const isMenuExpandButton = target.classList.contains('menu-expand-button');

    if (
      target instanceof HTMLButtonElement &&
      (isMenuTrigger || isMenuExpandButton)
    ) {
      // Menu trigger management (first layer)
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSubmenu();
      } else if (e.key === 'ArrowDown' && hasChildren) {
        e.preventDefault();
        const wasOpen = submenuOpen;
        if (!wasOpen) handleSubmenu();
        setTimeout(
          () => {
            const firstSubItem = menuRef.current?.querySelector<HTMLElement>(
              'ul li:first-child a, ul li:first-child .menu-item'
            );
            firstSubItem?.focus();
          },
          wasOpen ? 0 : 150
        );
      } else if (e.key === 'ArrowUp' && submenuOpen && hasChildren) {
        // If submenu is open, keypress is arrow up and we are on the first layer entry, focus goes to the last entry.
        e.preventDefault();
        const subItems = Array.from(
          menuRef.current?.querySelectorAll('ul li a, ul li .menu-item') || []
        ) as HTMLElement[];

        if (subItems.length > 0) {
          const lastItem = subItems[subItems.length - 1];
          lastItem.focus();
        }
      } else if (e.key === 'Escape' && submenuOpen) {
        e.preventDefault();
        setSubmenuOpen(false);
        triggerRef.current?.focus();
      }
    } else if (target.closest('ul li') && submenuOpen) {
      // Focus management for the second layer
      const subItems = Array.from(
        menuRef.current?.querySelectorAll('ul li a, ul li .menu-item') || []
      ) as HTMLElement[];

      const currentIndex = subItems.indexOf(target);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentIndex === subItems.length - 1) {
          triggerRef.current?.focus();
        } else {
          subItems[currentIndex + 1]?.focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex === 0) {
          triggerRef.current?.focus();
        } else {
          subItems[currentIndex - 1]?.focus();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSubmenuOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        if (subItems.length > 0) {
          subItems[0].focus();
        }
      } else if (e.key === 'End') {
        e.preventDefault();
        if (subItems.length > 0) {
          subItems[subItems.length - 1].focus();
        }
      }
    } else if (e.key === 'Escape' && submenuOpen) {
      e.preventDefault();
      setSubmenuOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT && hasChildren) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT && hasChildren) {
      setSubmenuOpen(false);
    }
  };

  const handleFocusOut: FocusEventHandler<HTMLLIElement> = e => {
    // Screen readers (e.g. TalkBack on Android) may not provide relatedTarget
    // when swiping between elements. Use a timeout to check where focus
    // actually went, preventing the submenu from closing during navigation.
    if (!e.relatedTarget) {
      setTimeout(() => {
        const activeEl = document.activeElement;
        if (!menuRef.current || menuRef.current.contains(activeEl)) return;

        if (isMobile) {
          // On mobile, keep the submenu open when focus moves to a sibling
          // within the same <nav>. This prevents VoiceOver from announcing
          // "compresso" mid-navigation; the user closes the submenu explicitly.
          const parentNav = menuRef.current.closest('nav');
          if (parentNav?.contains(activeEl)) return;
        }

        setSubmenuOpen(false);
      }, 150);
      return;
    }

    if (!menuRef.current || menuRef.current.contains(e.relatedTarget)) return;

    if (isMobile) {
      // Same rationale: don't auto-close when focus stays within the nav.
      const parentNav = menuRef.current.closest('nav');
      if (parentNav?.contains(e.relatedTarget)) return;
    }

    setSubmenuOpen(false);
  };

  const isMediaItem = item.uiRouterKey?.includes('media') ?? false;

  return (
    <li
      ref={menuRef}
      onBlur={handleFocusOut}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      className={classNames(
        className,
        hasChildren && 'w-sub',
        highlight && 'highlight',
        isCurrent && 'is-current',
        hasChildren && submenuOpen && 'is-sub-open'
      )}
    >
      {hasChildren ? (
        <div className="menu-item-with-submenu">
          {isMediaItem && item.path ? (
            // Media item: separate link and expansion button
            <>
              <MenuItem
                item={item}
                aria-current={isCurrent ? 'page' : undefined}
              />
              <button
                ref={triggerRef}
                className="menu-expand-button"
                onClick={e => {
                  e.preventDefault();
                  handleSubmenu();
                }}
                onMouseDown={e => e.preventDefault()}
                aria-expanded={submenuOpen}
                aria-haspopup={!isMobile ? 'true' : undefined}
                aria-controls={submenuId}
                // aria-label={t('toggleSubmenuFor', { item: item.title })}
              >
                {/* Caret is created via CSS ::after pseudo-element */}
                <span className="sr-only">
                  {t('submenuLabel', { item: item.title })}
                </span>
              </button>
            </>
          ) : (
            // Regular item with submenu: combined button
            <button
              ref={triggerRef}
              className="menu-trigger"
              onClick={e => {
                e.preventDefault();
                if (window.innerWidth < MOBILE_BREAKPOINT) {
                  handleSubmenu();
                }
                // On desktop, regular items without special media handling
                // will just toggle the submenu on click
              }}
              onMouseDown={e => e.preventDefault()}
              aria-expanded={submenuOpen}
              aria-haspopup={!isMobile ? 'true' : undefined}
              aria-controls={submenuId}
            >
              <MenuItem item={item} disabled={true} />
            </button>
          )}
        </div>
      ) : (
        <MenuItem item={item} aria-current={isCurrent ? 'page' : undefined} />
      )}
      {hasChildren && (
        <ul id={submenuId} hidden={!submenuOpen}>
          {items?.map(item => {
            const isCurrentSubmenu = pathname
              .split('/')
              .includes(
                (item?.uiRouterKey?.replace(/-\d+/, '') ?? '') as string
              );
            return (
              item && (
                <li
                  key={item?.id}
                  className={classNames(
                    className,
                    item.highlight && 'alternative'
                  )}
                  aria-current={isCurrentSubmenu ? 'page' : undefined}
                >
                  <MenuItem item={item} />
                </li>
              )
            );
          })}
        </ul>
      )}
    </li>
  );
};
