import React from 'react';
import { useCookiesDialog } from '../../hooks';
import { Cta } from '../Cta/';
import './FooterTop.sass';
import { useTranslation } from 'gatsby-plugin-react-i18next';

type FooterTopProps = {
  menu: Queries.MainNavigationItemFragment[];
};

export const FooterTop = ({ menu }: FooterTopProps) => {
  useCookiesDialog({ selector: '.ot-preferences' });
  const { t } = useTranslation();

  return (
    <nav className="footer-top" aria-label={t('navigationFooterTop')}>
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
          <button
            id="ot-sdk-btn"
            className="cta cta--link-simple ot-preferences"
          >
            <span>{t('cookiePreferences')}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
