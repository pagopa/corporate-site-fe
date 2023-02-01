import React from "react";
import {graphql, Link} from "gatsby";

export const navigationItemFragment = graphql`
  fragment NavigationItem on StrapiNavigationItems {
    external
    id
    slug
    title
    uiRouterKey
  }
`;

export const MenuItem = ({
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
