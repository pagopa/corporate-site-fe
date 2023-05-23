import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { SEO } from '../components/SEO';
import { BlocksRenderer } from '../components/SharedBlocks/BlocksRenderer';
import { Layout } from '../partials/Layout';
import { NewsletterBanner } from '../components/NewsletterBanner';

export const query = graphql`
  query StrapiPage($id: String, $language: String) {
    allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          language
          data
          ns
        }
      }
    }
    strapiPage(id: { eq: $id }) {
      title
      slug
      bannerNewsletter
      featuredImage {
        ...Image
      }
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
  const { title, slug, blocks, bannerNewsletter } = strapiPage || {};
  if (title && slug) {
    return (
      <Layout>
        <SEO
          meta={strapiPage?.seo}
          title={strapiPage.title}
          featuredImage={strapiPage.featuredImage}
        />
        <BlocksRenderer
          pageSlug={slug}
          blocks={blocks as Queries.BlocksFragment[]}
        />
        {bannerNewsletter && <NewsletterBanner />}
      </Layout>
    );
  }
  return null;
}
