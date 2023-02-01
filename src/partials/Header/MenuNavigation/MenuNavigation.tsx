import classNames from 'classnames';
import { graphql } from 'gatsby';
import React, { useState } from 'react';

import { MenuItem } from '../MenuItem';

import '../Menu.sass';

export const mainNavigationItemFragment = graphql`
  fragment MainNavigationItem on StrapiNavigation {
    external
    highlight
    id
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

export const MenuNavigation = ({
  item,
}: {
  item: Queries.MainNavigationItemFragment;
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleSubmenu = () => {
    if (window.innerWidth < 1200) {
      setSubmenuOpen(prev => !prev);
    }
  };

  const { items, highlight } = item;

  const hasChilds = !!items?.length;

  return (
    <li
      className={classNames(
        'menu-main__item',
        hasChilds && 'w-sub',
        hasChilds && submenuOpen && 'is-sub-open',
        highlight && 'highlight',
        false && 'is-current'
      )}
      onClick={handleSubmenu}
    >
      <MenuItem item={item} disabled={hasChilds} />
      {hasChilds && (
        <ul>
          {items?.map(item => {
            return (
              item && (
                <li key={item?.id}>
                  <MenuItem item={item} />
                </li>
              )
            );
          })}
        </ul>
      )}
    </li>
  );
};
