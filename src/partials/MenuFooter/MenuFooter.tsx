import React from 'react';
import { Cta } from '../Cta';
import './MenuFooter.sass';

type MenuFooterProps = {
  menu: Queries.MainNavigationItemFragment[];
};

export const MenuFooter = ({ menu }: MenuFooterProps) => (
  <nav className="menu-footer">
    <ul>
      {menu?.map(item => {
        return item?.title && item?.path ? (
          <li key={item?.path}>
            <Cta
              href={`${process.env.API_URL}${item?.path}`}
              label={item?.title}
              variant="link-simple"
            />
          </li>
        ) : null;
      })}
    </ul>
  </nav>
);
