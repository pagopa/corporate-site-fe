import React from 'react';

import { Logo } from '../Logo/Logo';
import { Socials } from '../Socials/Socials';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { MenuFooter } from '../MenuFooter/MenuFooter';
import { MenuService } from '../MenuService/MenuService';

import './Footer.sass';
import { graphql, useStaticQuery } from 'gatsby';

export const Footer = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const {
    allFooterJson: { nodes: footerNodes },
  }: Queries.footerDataQuery = useStaticQuery(graphql`
    fragment Footer on FooterJson {
      company
      locale
    }
    query FooterData {
      allFooterJson {
        nodes {
          ...Footer
        }
      }
    }
  `);

  const localeData = footerNodes?.find(
    (node: Queries.FooterFragment) => node.locale === language
  );

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="footer__top">
          <div className="row">
            <div className="col-12 col-md-2">
              <Logo version="light" />
            </div>
            <div className="col-12 col-md-10 col-lg-8">
              <MenuService />
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          {/* <div className="row justify-content-between flex-row-reverse">
            <div className="col-12 col-md-auto">
              <Language currentLocale={locale} />
            </div>
            <div className="col">
            </div>
          </div> */}
          <div className="row justify-content-between flex-row-reverse">
            <div className="col-12 col-md-auto">
              <MenuFooter />
            </div>
            <div className="col-12 col-md-auto">
              <div className="d-flex mb-4">
                <h5 className="mb-0 me-5">SEGUICI SU:</h5>
                <Socials />
              </div>
            </div>
            <div className="col-12 col-md-6">{localeData?.company}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
