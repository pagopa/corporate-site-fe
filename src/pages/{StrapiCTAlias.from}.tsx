import { graphql, HeadProps } from 'gatsby';
import React from 'react';

export const query = graphql`
  query StrapiCTAlias($id: String, $language: String) {
    allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          language
          data
          ns
        }
      }
    }
    strapiCtAlias(id: { eq: $id }) {
      to
      from
      slug
    }
  }
`;

export default function Component() {
  return <></>;
}

export const Head = ({ data }: HeadProps<Queries.StrapiCTAliasQuery>) => {
  return (
    <meta
      http-equiv="refresh"
      content={`0 url=${process.env.API_URL}/${
        data.strapiCtAlias?.to ? data.strapiCtAlias.to : ''
      }`}
    />
  );
};
