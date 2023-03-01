import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { JobPage } from '../../components/Jobposition/JobPage';
import { Layout } from '../../partials/Layout';
import { SEO } from '../../components/SEO';

export const query = graphql`
  query StrapiJobposition($id: String) {
    strapiJobposition(id: { eq: $id }) {
      ...JobPage
      seo {
        metaImage {
          localFile {
            publicURL
          }
        }
        metaTitle
        metaDescription
        metaSocial {
          description
          title
          socialNetwork
        }
      }
    }
  }
`;

export default function Component({
  data: { strapiJobposition },
}: PageProps<Queries.StrapiJobpositionQuery>) {
  return (
    <Layout>
      <SEO meta={strapiJobposition?.seo} />;
      <JobPage data={strapiJobposition as Queries.JobPageFragment} />
    </Layout>
  );
}
