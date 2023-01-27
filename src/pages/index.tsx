import React from 'react';

import { graphql, Link } from 'gatsby';
import { JobEntry } from '../components/Jobposition/JobEntry';

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

const IndexPage = ({ data }: { data: Queries.AllJobsQuery }) => (
  <ul>
    {data.allStrapiJobposition.edges.map(({ node: jobposition }) => (
      <Link key={jobposition?.id} to={jobposition?.slug || '/#'}>
        <div className="p-4">
          <JobEntry jobposition={jobposition} />
        </div>
      </Link>
    ))}
  </ul>
);

export default IndexPage;
