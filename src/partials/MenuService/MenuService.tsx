import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import { Cta } from '../Cta/';

import './MenuService.sass';

export const MenuService = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const {
    allFooterLeftJson: { nodes: menuNodes },
  }: Queries.LeftMenuDataQuery = useStaticQuery(graphql`
    fragment LeftUsefulLink on FooterLeftJsonUsefulLinks {
      label
      url
    }
    fragment LeftMenu on FooterLeftJson {
      locale
      usefulLinks {
        ...LeftUsefulLink
      }
    }
      query LeftMenuData {
      allFooterLeftJson {
        nodes {
          ...LeftMenu
        }
      }
    }
  `);

  const menuData = menuNodes.find(node => node.locale === language);

  return (
    <nav className="menu-service">
      <ul>
        {menuData?.usefulLinks?.map(
          (item: Queries.LeftUsefulLinkFragment | null) => {
            return item?.label && item?.url ? (
              <li key={item.url}>
                {item.url && (
                  <Cta
                    label={item.label || ''}
                    href={item.url || ''}
                    blank
                    variant="link-simple"
                  />
                )}
              </li>
            ) : null;
          }
        )}
        <li>
          <button id="ot-sdk-btn" className="cta --link-simple ot-preferences">
            <span>Preferenze cookie MOCK</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
