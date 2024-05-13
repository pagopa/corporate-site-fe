import React from 'react';
import { navigate } from '@reach/router';
import { graphql } from 'gatsby';
import { Layout } from '../partials/Layout';
import { SEO } from '../components/SEO';
import { useI18next } from 'gatsby-plugin-react-i18next';

export const query = graphql`
  query NotFound($language: String) {
    allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          language
          data
          ns
        }
      }
    }
  }
`;

export default function Component() {
  const { language } = useI18next();
  return (
    <Layout>
      <SEO title={`404 pagina non trovata`} />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="my-5 py-5 intro">
              <h1 className="py-5">
                {language === 'it'
                  ? '404, pagina non trovata'
                  : '404, page not found'}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
