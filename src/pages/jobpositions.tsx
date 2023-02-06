import React from 'react';

import { graphql, Link } from 'gatsby';
import { JobEntry } from '../components/Jobposition/JobEntry';
import { Layout } from '../partials/Layout';

export const query = graphql`
  query AllJobs($language: String!) {
    allStrapiJobposition(filter: { locale: { eq: $language } }) {
      edges {
        node {
          id
          slug
          url_path
          title
          isNew
          openDate
          closeDate
        }
      }
    }
  }
`;

const Jobpositions = ({ data }: { data: Queries.AllJobsQuery }) => (
  <Layout>
    <ul>
      {data.allStrapiJobposition.edges.map(({ node: jobposition }) => (
        <Link key={jobposition?.id} to={jobposition?.slug || '/#'}>
          <div className="p-4">
            <JobEntry jobposition={jobposition} />
          </div>
        </Link>
      ))}
    </ul>
  </Layout>
);

export default Jobpositions;
