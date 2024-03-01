import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { SEO } from '../../components/SEO';
import { useLocalizedQuery } from '../../hooks';
import '../../sass/app.sass';
import { PagoPA } from '../../types';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { HeadScripts } from './HeadScripts';
import './Layout.sass';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const query: Queries.MainNavigationQuery = useStaticQuery(graphql`
    query MainNavigation($locale: String) {
      allStrapiNavigation(filter: { locale: { eq: $locale } }) {
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
    Record<PagoPA.MENU, Queries.MainNavigationItemFragment[]>
  >(
    (acc, node) => {
      const key = node.key as PagoPA.MENU;
      return { ...acc, [key]: [...acc[key], node] };
    },
    {
      [PagoPA?.MENU.MAIN_MENU]: [],
      [PagoPA?.MENU.RESERVED_MENU]: [],
      [PagoPA?.MENU.FOOTER_TOP]: [],
      [PagoPA?.MENU.FOOTER_BOTTOM]: [],
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
