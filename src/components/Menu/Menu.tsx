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

  return (
    <div className="menu-header">
      <nav className="menu-main">
        <ul>
          {main?.map((item: Queries.MainNavigationItemFragment) => {
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
          {reserved?.map((item: Queries.MainNavigationItemFragment) => {
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
