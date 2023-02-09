import { graphql, Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next/dist';
import React from 'react';
import { Layout } from '../../../partials/Layout';

export const query = graphql`
  query AllNewsletter($language: String!) {
    allStrapiNewsletter(filter: { locale: { eq: $language } }) {
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

const Newsletter = ({ data }: { data: Queries.AllNewsletterQuery }) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Layout>
      <ul>
        {data.allStrapiNewsletter.edges.map(({ node: pressRelease }) => (
          <Link
            key={pressRelease?.id}
            to={
              `${process.env.API_URL}/media/newsletter-outer-space/${pressRelease?.slug}` ||
              '/#'
            }
          >
            <div className="p-4">{pressRelease.title}</div>
          </Link>
        ))}
      </ul>
    </Layout>
  );
};

export default Newsletter;
