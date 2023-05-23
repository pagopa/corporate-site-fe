import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocalizedQuery } from '../../hooks';
import { Logo } from '../Logo';
import { Socials } from '../Socials';
import './Footer.sass';
import { FooterBottom } from '../FooterBottom';
import { FooterTop } from '../FooterTop';

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

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="footer__top">
          <div className="row">
            <div className="col-12 col-md-2">
              <Logo version="light" />
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
