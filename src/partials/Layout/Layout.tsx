import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { SEO } from '../../components/SEO';
import { useLocalizedQuery } from '../../hooks';
import '../../sass/app.sass';
import { PAGOPA_MENU } from '../../types';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { HeadScripts } from './HeadScripts';
import './Layout.sass';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const query: Queries.MainNavigationQuery = useStaticQuery(graphql`
    query MainNavigation {
      allStrapiNavigation {
        nodes {
          ...MainNavigationItem
        }
      }
    }
  `);

  const { localeNodes: menuNodes } = useLocalizedQuery<
    Queries.MainNavigationItemFragment,
    Queries.MainNavigationQuery
  >({
    query,
    type: 'allStrapiNavigation',
  });

  const { ReservedMenu, MainMenu, FooterTop, FooterBottom } = menuNodes.reduce<
    Record<PAGOPA_MENU, Queries.MainNavigationItemFragment[]>
  >(
    (acc, node) => {
      const key = node.key as PAGOPA_MENU;
      return { ...acc, [key]: [...acc[key], node] };
    },
    {
      [PAGOPA_MENU.MAIN_MENU]: [],
      [PAGOPA_MENU.RESERVED_MENU]: [],
      [PAGOPA_MENU.FOOTER_TOP]: [],
      [PAGOPA_MENU.FOOTER_BOTTOM]: [],
    }
  );

  return (
    <>
      <Header reservedMenu={ReservedMenu} mainMenu={MainMenu} />
      <SEO />
      <HeadScripts />
      <main>{children}</main>
      <Footer footerBottom={FooterBottom} footerTop={FooterTop} />
    </>
  );
};
