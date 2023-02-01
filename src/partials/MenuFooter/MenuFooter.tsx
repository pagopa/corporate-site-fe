import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useLocalizedQuery } from '../../hooks/useLocalizedQuery';

import { Cta } from '../Cta';

import './MenuFooter.sass';

export const MenuFooter = () => {
  const queryResult = useStaticQuery(graphql`
    fragment RightUsefulLink on FooterRightJsonUsefulLinks {
      label
      url
    }
    fragment RightMenu on FooterRightJson {
      locale
      usefulLinks {
        ...RightUsefulLink
      }
    }
    query RightMenuData {
      allFooterRightJson {
        nodes {
          ...RightMenu
        }
      }
    }
  `);

  const { localeData: menu } = useLocalizedQuery<
    Queries.RightMenuFragment,
    Queries.RightMenuDataQuery
  >({
    type: 'allFooterRightJson',
    query: queryResult,
  });

  return (
    <nav className="menu-footer">
      <ul>
        {menu?.usefulLinks?.map(item => {
          return item?.label && item?.url ? (
            <li key={item?.url}>
              <Cta
                href={item?.url as string}
                label={item?.label}
                variant="link-simple"
              />
            </li>
          ) : null;
        })}
      </ul>
    </nav>
  );
};
