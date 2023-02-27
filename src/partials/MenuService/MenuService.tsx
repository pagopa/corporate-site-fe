import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';

import { Cta } from '../Cta/';

import './MenuService.sass';
import { useLocalizedQuery } from '../../hooks/useLocalizedQuery';

export const MenuService = () => {
  const query = useStaticQuery(graphql`
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

  const {
    localeNodes: [menuData],
  } = useLocalizedQuery<Queries.LeftMenuFragment, Queries.LeftMenuDataQuery>({
    type: 'allFooterLeftJson',
    query,
  });

  useEffect(() => {
    const openOTPreferences = () => {
      if ('OneTrust' in window && window?.OneTrust)
        (window?.OneTrust as any)?.ToggleInfoDisplay();
    };
    const otButton = document.querySelector('.ot-preferences');
    otButton?.addEventListener('click', openOTPreferences);
    return () => otButton?.removeEventListener('click', openOTPreferences);
  }, []);

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
