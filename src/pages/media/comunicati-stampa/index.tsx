import { graphql, Link } from 'gatsby';
import React from 'react';
import { Layout } from '../../../partials/Layout';

export const query = graphql`
  query AllPressReleases($language: String!) {
    allStrapiPressRelease(filter: { locale: { eq: $language } }) {
      edges {
        node {
          id
          slug
          bannerNewsletter
          eyelet
          title
          url_path
          body {
            data {
              body
            }
          }
        }
      }
    }
  }
`;

const ComunicatiStampa = ({
  data,
}: {
  data: Queries.AllPressReleasesQuery;
}) => (
  <Layout>
    <ul>
      {data.allStrapiPressRelease.edges.map(({ node: pressRelease }) => (
        <Link key={pressRelease?.id} to={pressRelease?.slug || '/#'}>
          <div className="p-4">{pressRelease.title}</div>
        </Link>
      ))}
    </ul>
  </Layout>
);

export default ComunicatiStampa;
