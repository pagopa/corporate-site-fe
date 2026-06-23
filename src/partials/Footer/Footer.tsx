import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocalizedQuery } from '../../hooks';
import { Logo } from '../Logo';
import { Socials } from '../Socials';
import './Footer.sass';
import { FooterBottom } from '../FooterBottom';
import { FooterTop } from '../FooterTop';
import { useTranslation } from 'gatsby-plugin-react-i18next';

type FooterProps = {
  footerTop: Queries.MainNavigationItemFragment[];
  footerBottom: Queries.MainNavigationItemFragment[];
};

export const Footer = ({ footerTop, footerBottom }: FooterProps) => {
  const query = useStaticQuery(graphql`
    fragment FooterLeft on FooterLeftJson {
      company
      locale
    }
    query FooterData {
      allFooterLeftJson {
        nodes {
          ...FooterLeft
        }
      }
    }
  `);

  const {
    localeNodes: [localeData],
  } = useLocalizedQuery<Queries.FooterLeftFragment, Queries.FooterDataQuery>({
    type: 'allFooterLeftJson',
    query,
  });

  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="footer__top">
          <div className="row">
            <div className="col-12 col-md-2">
              <Logo title="PagoPA" version="light" />
            </div>
            <div className="col-12 col-md-10 col-lg-8">
              <FooterTop menu={footerTop} />
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="row justify-content-between flex-row-reverse">
            <div className="col-12 col-md-auto">
              <FooterBottom menu={footerBottom} />
            </div>
            <div className="col-12 col-md-auto">
              <div className="d-flex mb-4">
                <div id="socialsLabelId" className="h5 mb-0 me-5">
                  {t('followUs')}
                </div>
                <Socials ariaLabelledBy="socialsLabelId" />
              </div>
            </div>
            <div className="col-12 col-md-6">{localeData?.company}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
