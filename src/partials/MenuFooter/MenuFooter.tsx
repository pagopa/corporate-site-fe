import { graphql, useStaticQuery } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';

import { Cta } from '../Cta';

import './MenuFooter.sass';

export const MenuFooter = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const {
    allFooterRightJson: { nodes: footerRightNodes },
  }: Queries.RightMenuDataQuery = useStaticQuery(graphql`
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

  const menu = footerRightNodes.find(node => node.locale === language);

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
