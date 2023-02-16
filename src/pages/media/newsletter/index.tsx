import { graphql, Link } from 'gatsby';
import React from 'react';
import { Layout } from '../../../partials/Layout';

// This query is used to fetch all newsletters in the current language
// It is used in the NewsletterList component
export const query = graphql`
  query AllNewsletter($language: String!) {
    allStrapiNewsletter(filter: { locale: { eq: $language } }) {
      edges {
        node {
          ...Newsletter
        }
      }
    }
  }
  fragment Newsletter on STRAPI_NEWSLETTER {
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
`;

const Newsletter = ({ data }: { data: Queries.AllNewsletterQuery }) => (
  <Layout>
    <ul>
      {data.allStrapiNewsletter.edges.map(({ node: newsletter }) => (
        <Link
          key={newsletter?.id}
          to={`${process.env.API_URL}/media/newsletter-outer-space/${newsletter?.slug}`}
        >
          <div className="p-4">{newsletter.title}</div>
        </Link>
      ))}
    </ul>
  </Layout>
);

export default Newsletter;
