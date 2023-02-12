import { graphql, Link } from 'gatsby';
import React from 'react';
import { Layout } from '../../partials/Layout';

export const query = graphql`
  query AllProjects($language: String!) {
    allStrapiProject(filter: { locale: { eq: $language } }) {
      edges {
        node {
          bannerNewsletter
          title
          slug
        }
      }
    }
  }
`;

const Projects = ({ data }: { data: Queries.AllProjectsQuery }) => (
  <Layout>
    <ul>
      {data.allStrapiProject.edges.map(({ node: project }) => (
        <Link key={project?.slug} to={project?.slug || '/#'}>
          <div className="p-4">{project.title}</div>
        </Link>
      ))}
    </ul>
  </Layout>
);

export default Projects;
