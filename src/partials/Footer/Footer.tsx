import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocalizedQuery } from '../../hooks';
import { Logo } from '../Logo';
import { Socials } from '../Socials';
import './Footer.sass';
import { FooterBottom } from '../FooterBottom';
import { FooterTop } from '../FooterTop';
import { useI18next } from 'gatsby-plugin-react-i18next';

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

  const { i18n, t, languages, changeLanguage, originalPath } = useI18next();

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
                <h5 className="mb-0 me-5">{t('followUs')}</h5>
                <Socials />
              </div>
            </div>
            <div className="col-12 col-md-6">{localeData?.company}</div>
          </div>
        </div>
        <div className="row justify-content-between flex-row-reverse">
          {/* TODO This code is temporary and will certainly be re-edited and/or moved: it is to have the language switch */}
          <ul>
            {languages.map(lng => (
              <li key={lng}>
                <a
                  onClick={e => {
                    window.location.assign(
                      `/${lng}/${lng === 'it' ? 'it/' : 'it/en/indexen/'}`
                    );
                  }}
                  style={{
                    cursor: 'pointer',
                    textDecoration:
                      i18n.resolvedLanguage === lng ? 'underline' : 'none',
                  }}
                >
                  {lng}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
