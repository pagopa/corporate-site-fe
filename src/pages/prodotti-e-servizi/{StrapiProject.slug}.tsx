import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { SEO } from '../../components/SEO';
import { BlocksRenderer } from '../../components/SharedBlocks/BlocksRenderer';
import { Layout } from '../../partials/Layout';

export const query = graphql`
  query StrapiProject($id: String, $language: String) {
    allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          language
          data
          ns
        }
      }
    }
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
  if (!strapiProject) return null;

  const { title, blocks, slug } = strapiProject;

  return title && slug ? (
    <Layout>
      <SEO
        meta={strapiProject.seo}
        title={title ?? undefined}
        featuredImage={strapiProject.featuredImage ?? undefined}
      />
      <BlocksRenderer blocks={blocks as Queries.BlocksFragment[]} />
      {/* {bannerNewsletter && <NewsletterBanner />} */}
    </Layout>
  ) : null;
}
