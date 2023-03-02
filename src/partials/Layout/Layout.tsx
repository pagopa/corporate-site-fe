import React from 'react';
import { SEO } from '../../components/SEO';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { HeadScripts } from './HeadScripts';
import '../../sass/app.sass';
import './Layout.sass';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocalizedQuery } from '../../hooks';
import { PagoPA } from '../../types';

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

  const reservedMenu = menuNodes?.filter(
    node => node?.key === PagoPA.MENU.RESERVED_MENU
  );
  const mainMenu = menuNodes?.filter(
    node => node?.key === PagoPA.MENU.MAIN_MENU
  );

  return (
    <>
      <Header reservedMenu={reservedMenu} mainMenu={mainMenu} />
      <SEO />
      <HeadScripts />
      <main>{children}</main>
      <Footer />
    </>
  );
};
