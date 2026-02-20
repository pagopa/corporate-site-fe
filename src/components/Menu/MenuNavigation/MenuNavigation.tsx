import classNames from 'classnames';
import React, { useState, useRef, FocusEventHandler, useId } from 'react';
import { MenuItem } from '../MenuItem';
import '../Menu.sass';
import { useLocation } from '@reach/router';
import { navigate } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';

export const MenuNavigation = ({
  item,
  className,
}: {
  item: Queries.MainNavigationItemFragment;
  className: string;
}) => {
  const { t } = useTranslation();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const { pathname } = useLocation();
  const submenuId = useId();
  const menuRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { items, highlight } = item;

  const isCurrent = pathname
    .split('/')
    .includes(item.uiRouterKey.replace(/-\d+/, '') as string);
  const hasChildren = !!items?.length;

  const handleSubmenu = () => {
    setSubmenuOpen(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;

    if (
      target instanceof HTMLButtonElement &&
      target.classList.contains('menu-trigger')
    ) {
      // Menu triger management (first layer)
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSubmenu();
      } else if (e.key === 'ArrowDown' && submenuOpen && hasChildren) {
        // If submenu is open, focus on the first entry of the second layer
        e.preventDefault();
        const firstSubItem = menuRef.current?.querySelector(
          'ul li:first-child a, ul li:first-child .menu-item'
        );
        if (firstSubItem instanceof HTMLElement) {
          firstSubItem.focus();
        }
      } else if (e.key === 'ArrowDown' && !submenuOpen && hasChildren) {
        // If submenu is closed, open it
        e.preventDefault();
        handleSubmenu();

        // After the submenu has been opened, focus goes to the first entry
        setTimeout(() => {
          const firstSubItem = menuRef.current?.querySelector(
            'ul li:first-child a, ul li:first-child .menu-item'
          );
          if (firstSubItem instanceof HTMLElement) {
            firstSubItem.focus();
          }
        }, 150);
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
        const nextIndex =
          currentIndex < subItems.length - 1 ? currentIndex + 1 : 0;
        subItems[nextIndex]?.focus();

        // If we are on the last entry and keypress is arrow down, go back to trigger
        if (currentIndex === subItems.length - 1) {
          triggerRef.current?.focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : subItems.length - 1;
        subItems[prevIndex]?.focus();

        // If we are in the first entry and keypress is arrow up, go back to trigger
        if (currentIndex === 0) {
          triggerRef.current?.focus();
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
    if (window.innerWidth >= 992 && hasChildren) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 992 && hasChildren) {
      setSubmenuOpen(false);
    }
  };

  const handleFocusOut: FocusEventHandler<HTMLLIElement> = e => {
    if (menuRef.current && !menuRef.current.contains(e.relatedTarget)) {
      setSubmenuOpen(false);
    }
  };

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
        <button
          ref={triggerRef}
          className="menu-trigger"
          onClick={e => {
            e.preventDefault();
            if (window.innerWidth < 992) {
              handleSubmenu();
            } else {
              if (item.uiRouterKey.includes('media') && item.path) {
                navigate(item.path);
              }
            }
          }}
          onMouseDown={e => e.preventDefault()}
          aria-expanded={submenuOpen}
          aria-haspopup="true"
          aria-controls={submenuId}
        >
          <MenuItem item={item} disabled={true} />
          {item.uiRouterKey.includes('media') && (
            <span className="sr-only">{t('menuNavigationInstructions')}</span>
          )}
        </button>
      ) : (
        <MenuItem item={item} aria-current={isCurrent ? 'page' : undefined} />
      )}
      {hasChildren && (
        <ul id={submenuId}>
          {items?.map(item => {
            const isCurrentSubmenu = pathname
              .split('/')
              .includes(item.uiRouterKey.replace(/-\d+/, '') as string);
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
