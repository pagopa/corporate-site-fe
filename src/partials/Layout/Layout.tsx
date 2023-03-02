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
  const footerMain = menuNodes?.filter(
    node => node?.key === PagoPA.MENU.FOOTER_MAIN
  );
  const footerBottom = menuNodes?.filter(
    node => node?.key === PagoPA.MENU.FOOTER_BOTTOM
  );

  return (
    <>
      <Header {...{ reservedMenu, mainMenu }} />
      <SEO />
      <HeadScripts />
      <main>{children}</main>
      <Footer {...{ footerMain, footerBottom }} />
    </>
  );
};
