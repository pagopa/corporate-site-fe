import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { SEO } from '../../components/SEO';
import { BlocksRenderer } from '../../components/SharedBlocks/BlocksRenderer';
import { Layout } from '../../partials/Layout';

export const query = graphql`
  query StrapiProject($id: String) {
    strapiProject(id: { eq: $id }) {
      title
      slug
      blocks {
        ...Blocks
      }
      featuredImage {
        ...Image
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
  data: { strapiProject },
}: PageProps<Queries.StrapiProjectQuery>) {
  const { title, slug, blocks } = strapiProject || {};

  if (title && slug) {
    return (
      <Layout>
        <SEO meta={strapiProject?.seo} title={strapiProject.title} featuredImage={strapiProject.featuredImage}/>
        <BlocksRenderer blocks={blocks as Queries.BlocksFragment[]} />
        {/* {bannerNewsletter && <NewsletterBanner />} */}
      </Layout>
    );
  }
  return null;
}
