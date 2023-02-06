import React from 'react';
import { graphql } from 'gatsby';

import { MenuNavigation } from './MenuNavigation';

import './Menu.sass';

export const mainNavigationItemFragment = graphql`
  fragment MainNavigationItem on StrapiNavigation {
    external
    highlight
    id
    order
    key
    slug
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
                className="reserved-navigation"
                item={item}
                key={item.id}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
