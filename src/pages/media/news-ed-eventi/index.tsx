import { graphql, Link } from 'gatsby';
import React from 'react';
import { Layout } from '../../../partials/Layout';

export const query = graphql`
  query AllStrapiEvent($language: String!) {
    allStrapiEvent(filter: { locale: { eq: $language } }) {
      edges {
        node {
          id
          slug
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

const NewsEdEventi = ({
  data,
}: {
  data: Queries.AllStrapiEventQuery;
}) => (
  <Layout>
    <ul>
      {data.allStrapiEvent.edges.map(({ node: event }) => (
        <Link key={event?.id} to={event?.slug || '/#'}>
          <div className="p-4">{event.title}</div>
        </Link>
      ))}
    </ul>
  </Layout>
);

export default NewsEdEventi;
