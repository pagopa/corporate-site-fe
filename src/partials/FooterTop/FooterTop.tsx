import React from 'react';
import { useCookiesDialog } from '../../hooks';
import { Cta } from '../Cta/';
import './FooterTop.sass';
import { useI18next } from 'gatsby-plugin-react-i18next';

type FooterTopProps = {
  menu: Queries.MainNavigationItemFragment[];
};

export const FooterTop = ({ menu }: FooterTopProps) => {
  useCookiesDialog({ selector: '.ot-preferences' });
  const { language } = useI18next();

  return (
    <nav className="footer-top">
      <ul>
        {menu?.map((item: Queries.MainNavigationItemFragment | null) => {
          return item?.title && item?.path ? (
            <li key={item.path}>
              {item.path && (
                <Cta
                  label={item.title || ''}
                  href={`${item?.path}`}
                  blank
                  variant="link-simple"
                />
              )}
            </li>
          ) : null;
        })}
        <li>
          <button id="ot-sdk-btn" className="cta --link-simple ot-preferences">
            <span>
              {language === 'it' ? 'Preferenze cookie' : 'Cookie preferences'}
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
