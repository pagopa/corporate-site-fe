import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { BlocksRenderer } from '../../components/BlocksRenderer';
import { Layout } from '../../partials/Layout';

export const query = graphql`
  query StrapiProject($id: String) {
    strapiProject(id: { eq: $id }) {
      title
      slug
      blocks {
        ...Blocks
      }
    }
  }
`;

export default function Component({
  data: { strapiProject },
}: PageProps<Queries.StrapiProjectQuery>) {
  const { title, slug, blocks } = strapiProject || {};

  if (title && slug) {
    return (
      <Layout>
        <BlocksRenderer blocks={blocks as Queries.BlocksFragment[]} />

        {/* {bannerNewsletter && <NewsletterBanner />} */}
      </Layout>
    );
  }
  return null;
}
