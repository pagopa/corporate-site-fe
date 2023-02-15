import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { BlocksRenderer } from '../components/BlocksRenderer';
import { Layout } from '../partials/Layout';

export const query = graphql`
  query StrapiPage($id: String) {
    strapiPage(id: { eq: $id }) {
      title
      slug
      blocks {
        ...Blocks
      }
    }
  }
`;

export default function Component({
  data: { strapiPage },
}: PageProps<Queries.StrapiPageQuery>) {
  const { title, slug, blocks } = strapiPage || {};

  console.debug(blocks);
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
