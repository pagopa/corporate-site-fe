import { graphql, HeadProps } from 'gatsby';
import React from 'react';

export const query = graphql`
  query StrapiCTAlias($id: String) {
    strapiCtAlias(id: { eq: $id }) {
      to
      slug
    }
  }
`;

export default function Component() {
  return <></>;
}

export const Head = (props: HeadProps<Queries.StrapiCTAliasQuery>) => {
  return (
    <meta
      http-equiv="refresh"
      content={`0 url=${process.env.API_URL}/${
        props.data.strapiCtAlias?.to ? props.data.strapiCtAlias.to : ''
      }`}
    />
  );
};
