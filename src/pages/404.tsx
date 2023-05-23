import { useEffect } from 'react';
import { navigate } from '@reach/router';
import { graphql } from 'gatsby';

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

export default () => {
  useEffect(() => {
    navigate('/', { replace: true });
  }, []);
  return null;
};
