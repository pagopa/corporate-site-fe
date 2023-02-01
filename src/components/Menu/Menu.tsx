import React from 'react';

import { MenuNavigation } from './MenuNavigation';

import './Menu.sass';

export const Menu = ({ menu }: { menu: any }) => {
  return (
    <nav className="menu-main">
      <ul>
        {menu?.map((item: any, key: any) => {
          return <MenuNavigation item={item} key={key} />;
        })}
      </ul>
    </nav>
  );
};
