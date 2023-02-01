import React, { useState } from 'react';

import { graphql, Link, useStaticQuery } from 'gatsby';

import { MenuReservedArea } from '../MenuReservedArea';

import './MenuMain.sass';
import { useTranslation } from 'gatsby-plugin-react-i18next/dist';
import classNames from 'classnames';

export const navigationItemFragment = graphql`
  fragment NavigationItem on StrapiNavigationItems {
    external
    id
    slug
    title
    uiRouterKey
  }
`;

const MenuItem = ({
  item,
  disabled,
}: {
  item: Queries.NavigationItemFragment | Queries.MainNavigationItemFragment;
  disabled?: boolean;
}) => {
  const { title, slug, external, uiRouterKey } = item;

  const TheLink = () => {
    if (disabled) {
      return <span>{title}</span>;
    } else {
      if (external) {
        return (
          <a href={slug || '#'} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        );
      } else {
        return <Link to={uiRouterKey || '#'}>{title}</Link>;
      }
    }
  };

  return <TheLink />;
};

export const mainNavigationItemFragment = graphql`
  fragment MainNavigationItem on StrapiNavigation {
    external
    highlight
    id
    key
    slug
    title
    uiRouterKey
    items {
      ...NavigationItem
    }
  }
`;

const MenuItemTree = ({
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
          {items?.map((item) => {
            // const { cssClasses } = item;
            return item && (
              <li key={item?.id}>
                <MenuItem item={item} />
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export const MenuMain = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const {
    allStrapiNavigation: { nodes: navigationNodes },
  }: Queries.MainNavigationQuery = useStaticQuery(graphql`
    query MainNavigation {
      allStrapiNavigation {
        nodes {
          ...MainNavigationItem
        }
      }
    }
  `);

  const menu = navigationNodes.filter(node => node.key === language);

  return (
    <nav className="menu-main">
      <ul>
        {menu?.map((item: any, key: any) => {
          return <MenuItemTree item={item} key={key} />;
        })}
      </ul>
      <MenuReservedArea />
    </nav>
  );
};
