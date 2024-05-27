import React from 'react';
import { graphql } from 'gatsby';

import { MenuNavigation } from './MenuNavigation';
import './Menu.sass';
import { LanguageSwitch } from '../../partials/LanguageSwitch/LanguageSwitch';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';

export const mainNavigationItemFragment = graphql`
  fragment MainNavigationItem on StrapiNavigation {
    type
    external
    highlight
    id
    order
    key
    title
    uiRouterKey
    locale
    path
    items {
      ...NavigationItem
    }
  }
`;

export const Menu = ({
  main,
  reserved,
}: {
  main?: Queries.MainNavigationItemFragment[];
  reserved?: Queries.MainNavigationItemFragment[];
}) => {
  const { t } = useTranslation();

  const sortMenuByOrder = (
    menu: Queries.MainNavigationItemFragment[] | undefined
  ) =>
    menu?.sort((item, nextItem) =>
      item?.order && nextItem?.order ? item.order - nextItem.order : 0
    );

  const sortedMain = sortMenuByOrder(main);
  const sortedReserved = sortMenuByOrder(reserved);

  return (
    <div className="menu-header">
      <nav className="menu-main">
        <ul>
          {sortedMain?.map((item: Queries.MainNavigationItemFragment) => {
            return (
              <MenuNavigation
                className="main-navigation"
                item={item}
                key={item.id}
              />
            );
          })}
        </ul>
      </nav>
      <nav className="menu-reserved">
        <ul>
          {sortedReserved?.map((item: Queries.MainNavigationItemFragment) => {
            return (
              <MenuNavigation
                className="reserved-navigation menu-reserved__item "
                item={item}
                key={item.id}
              />
            );
          })}
        </ul>
        <div className="language-switch-container">
          <span style={{ marginBottom: '8px' }}>{t('siteLanguage')}</span>
          <LanguageSwitch />
        </div>
      </nav>
    </div>
  );
};
