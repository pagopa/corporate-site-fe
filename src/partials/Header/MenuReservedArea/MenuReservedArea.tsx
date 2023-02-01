import React, { useState } from 'react';
import { Link } from 'gatsby';

import '../MenuMain/MenuMain.sass';

const MenuItem = ({ item, disabled }: any) => {
  const { label, path } = item;

  const TheLink = () => {
    if (disabled) {
      return <span>{label}</span>;
    } else {
      if (true) {
        return (
          <a href={path} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      } else {
        return <Link to={'#/'}>{label}</Link>;
      }
    }
  };

  return <TheLink />;
};

const MenuItemTree = ({ item, locale }: any) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleSubmenu = () => {
    if (window.innerWidth < 1200) {
      setSubmenuOpen(prev => !prev);
    }
  };

  const { childItems, cssClasses } = item;
  const classes = [...cssClasses];

  const hasChilds = childItems.length ? true : false;
  const isDisabled = classes.includes('disabled');

  if (hasChilds) {
    classes.push('w-sub');
  }

  return (
    <li
      className={`menu-reserved__item ${classes.join(' ')}${
        hasChilds ? (submenuOpen ? ' is-sub-open' : '') : ''
      }`}
      onClick={handleSubmenu}
    >
      <MenuItem item={item} disabled={isDisabled} />
      {hasChilds && (
        <ul>
          {childItems.map((item: any, key: any) => {
            return (
              <li key={key}>
                <MenuItem item={item} />
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export const MenuReservedArea = () => {

  if (true) {
    const menu: any[] = [];

    return (
      <nav className="menu-reserved">
        <ul>
          {menu.map((item, key) => {
            return <MenuItemTree item={item} key={key} />;
          })}
        </ul>
      </nav>
    );
  }
  return <></>;
};
