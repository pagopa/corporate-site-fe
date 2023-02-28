import { graphql, HeadProps, PageProps } from 'gatsby';
import React from 'react';
import { SEO } from '../components/SEO';
import { BlocksRenderer } from '../components/SharedBlocks/BlocksRenderer';
import { Layout } from '../partials/Layout';

export const query = graphql`
  query StrapiPage($id: String) {
    strapiPage(id: { eq: $id }) {
      title
      slug
      blocks {
        ...Blocks
      }
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
  data: { strapiPage },
}: PageProps<Queries.StrapiPageQuery>) {
  const { title, slug, blocks } = strapiPage || {};

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

export const Head = ({
  data: { strapiPage },
}: HeadProps<Queries.StrapiPageQuery>) => <SEO meta={strapiPage?.seo} />;
