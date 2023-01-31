import React, { useState } from 'react';

import { Link } from 'gatsby';

import { MenuReservedArea } from '../MenuReservedArea';

import './MenuMain.sass';

const MenuItem = ({ item, disabled }: any) => {
  const { label, path } = item;

  const newUrl = '#/';
  const isExternal = new RegExp('^(?:[a-z]+:)?//', 'i');

  const TheLink = () => {
    if (disabled) {
      return <span>{label}</span>;
    } else {
      if (isExternal.test(path)) {
        return (
          <a href={path} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      } else {
        return <Link to={newUrl}>{label}</Link>;
      }
    }
  };

  return <TheLink />;
};

const MenuItemTree = ({ item, location, locale }: any) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleSubmenu = () => {
    if (window.innerWidth < 1200) {
      setSubmenuOpen(prev => !prev);
    }
  };

  const { childItems, cssClasses, path } = item;
  const classes = [...cssClasses];

  const hasChilds = childItems.length ? true : false;
  const isDisabled = classes.includes('disabled');

  const getSlug = (path: any) => {
    const pathFragments = path.match(/[^/]+/g);
    return pathFragments.slice(-1)[0];
  };
  const slug = getSlug(path);

  // classes check

  if (location.pathname.split('/').find((f: any) => f === slug)) {
    classes.push('is-current');
  }

  if (hasChilds) {
    classes.push('w-sub');
    childItems.forEach((i: any) => {
      const { path } = i;
      const slug = getSlug(path);
      if (location.pathname.split('/').find((f: any) => f === slug)) {
        classes.push('is-current');
      }
    });
  }

  return (
    <li
      className={`menu-main__item ${classes.join(' ')}${
        hasChilds ? (submenuOpen ? ' is-sub-open' : '') : ''
      }`}
      onClick={handleSubmenu}
    >
      <MenuItem item={item} locale={locale} disabled={isDisabled} />
      {hasChilds && (
        <ul>
          {childItems.map((item: any, key: any) => {
            const { cssClasses } = item;
            return (
              <li key={key} className={cssClasses.join(' ')}>
                <MenuItem item={item} locale={locale} />
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export const MenuMain = () => {
  const menu: Array<any> = [];

  return (
    <nav className="menu-main">
      <ul>
        {menu?.map((item: any, key: any) => {
          return <MenuItemTree item={item} key={key} />;
        })}
      </ul>
      <MenuReservedArea />
    </nav>
  );
};
