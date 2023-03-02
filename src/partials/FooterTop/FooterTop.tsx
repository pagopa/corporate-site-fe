import React from 'react';
import { useCookiesDialog } from '../../hooks';
import { Cta } from '../Cta/';
import './FooterTop.sass';

type FooterTopProps = {
  menu: Queries.MainNavigationItemFragment[];
};

export const FooterTop = ({ menu }: FooterTopProps) => {

  useCookiesDialog({ selector: '.ot-preferences' });

  return (
    <nav className="footer-top">
      <ul>
        {menu?.map((item: Queries.MainNavigationItemFragment | null) => {
          return item?.title && item?.path ? (
            <li key={item.path}>
              {item.path && (
                <Cta
                  label={item.title || ''}
                  href={`${process.env.API_URL}${item?.path}`}
                  blank
                  variant="link-simple"
                />
              )}
            </li>
          ) : null;
        })}
        <li>
          <button id="ot-sdk-btn" className="cta --link-simple ot-preferences">
            <span>Preferenze cookie MOCK</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
