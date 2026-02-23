import React from 'react';
import { Cta } from '../Cta';
import './FooterBottom.sass';
import { useTranslation } from 'gatsby-plugin-react-i18next';

type MenuFooterProps = {
  menu: Queries.MainNavigationItemFragment[];
};

export const FooterBottom = ({ menu }: MenuFooterProps) => {
  const { t } = useTranslation();

  return (
    <nav className="footer-bottom" aria-label={t('navigationFooterBottom')}>
      <ul>
        {menu?.map(item => {
          return item?.title && item?.path ? (
            <li key={item?.path}>
              <Cta
                href={`${item?.path}`}
                label={item?.title}
                variant="link-simple"
              />
            </li>
          ) : null;
        })}
      </ul>
    </nav>
  );
};
