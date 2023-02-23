import React from 'react';
import { graphql, Link } from 'gatsby';

import '../Menu.sass';

export const navigationItemFragment = graphql`
  fragment NavigationItem on StrapiNavigationItems {
    external
    id
    title
    uiRouterKey
    path
  }
`;

export const MenuItem = ({
  item,
  disabled,
}: {
  item: Queries.NavigationItemFragment | Queries.MainNavigationItemFragment;
  disabled?: boolean;
}) => {
  const { title, external, path } = item;

  if (disabled) {
    return <span>{title}</span>;
  } else if (external) {
    return (
      <a href={path || '#'} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    );
  } else {
    return <Link activeClassName='is-current' to={path || '#'}>{title}</Link>;
  }
};
