import React from 'react';
import { graphql, Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import '../Menu.sass';

export const navigationItemFragment = graphql`
  fragment NavigationItem on StrapiNavigationItems {
    external
    highlight
    type
    id
    title
    uiRouterKey
    path
  }
`;
const handleSubmenuItemKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case ' ':
    case 'ArrowUp':
    case 'ArrowDown':
    case 'Home':
    case 'End':
      e.preventDefault();
      break;
  }
};

export const MenuItem = ({
  item,
  disabled,
  'aria-current': ariaCurrent,
}: {
  item: Queries.NavigationItemFragment | Queries.MainNavigationItemFragment;
  disabled?: boolean;
  'aria-current'?: 'page' | undefined;
}) => {
  const { t } = useTranslation();
  const { title, external, path, type } = item;

  const commonProps = {
    'aria-current': ariaCurrent,
    onKeyDown: handleSubmenuItemKeyDown,
  };

  const screenReaderOpenText = (
    <span className="sr-only">{t('menuItem.screenReaderExternal')}</span>
  );

  if (disabled) {
    return <span {...commonProps}>{title}</span>;
  } else if (external) {
    return (
      <>
        <a
          {...commonProps}
          className="external-link"
          href={path || '#'}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
        {screenReaderOpenText}
      </>
    );
  } else if (type == 'INTERNAL') {
    return (
      <a {...commonProps} href={path || '#'}>
        {title}
      </a>
    );
  } else {
    return (
      <Link {...commonProps} activeClassName="is-current" to={path || '#'}>
        {title}
      </Link>
    );
  }
};
