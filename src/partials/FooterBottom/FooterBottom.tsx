import React from 'react';
import { Cta } from '../Cta';
import './FooterBottom.sass';

type MenuFooterProps = {
  menu: Queries.MainNavigationItemFragment[];
};

export const FooterBottom = ({ menu }: MenuFooterProps) => (
  <nav className="footer-bottom">
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
