import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import { Cta } from '../Cta/';

import './MenuService.sass';

export const MenuService = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const {
    allFooterJson: { nodes: menuNodes },
  }: Queries.footerDataQuery = useStaticQuery(graphql`
    fragment UsefulLink on FooterJsonUsefulLinks {
      label
      url
    }
    fragment Menu on FooterJson {
      locale
      usefulLinks {
        ...UsefulLink
      }
    }
    query menuData {
      allFooterJson {
        nodes {
          ...Menu
        }
      }
    }
  `);

  const { usefulLinks } = menuNodes.find(
    (node: Queries.MenuFragment) => node.locale === language
  );
  useEffect(() => {
    const openOTPreferences = () => {
      // @ts-ignore
      window?.OneTrust && window.OneTrust.ToggleInfoDisplay();
    };
    const otButton = document.querySelector('.ot-preferences');
    otButton?.addEventListener('click', openOTPreferences);
    return () => otButton?.removeEventListener('click', openOTPreferences);
  }, []);

  return (
    <nav className="menu-service">
      <ul>
        {usefulLinks?.map((item: Queries.UsefulLinkFragment) => {
          const { label, url } = item;

          return (
            <li key={url}>
              {url && (
                <Cta
                  label={label || ''}
                  url={url || ''}
                  blank
                  variant="link-simple"
                  href="#"
                />
              )}
            </li>
          );
        })}
        <li>
          <button id="ot-sdk-btn" className="cta --link-simple ot-preferences">
            <span>Preferenze cookie</span>
          </button>
          {/* ot-sdk-show-settings */}
        </li>
      </ul>
    </nav>
  );
};
