import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { JobPage } from '../../components/Jobposition/JobPage';
import { Layout } from '../../partials/Layout';
import { SEO } from '../../components/SEO';

export const query = graphql`
  fragment JobIntro on STRAPI_JOBPOSITION {
    closeDate
    hiredPositions
    openDate
    openPositions
    selectedPeople
    title
    eyelet
  }
  fragment JobPage on STRAPI_JOBPOSITION {
    applicationLink
    embedIdentifier
    title
    ...JobIntro
    blocks {
      ...Blocks
    }
  }
  query StrapiJobposition($id: String) {
    strapiJobposition(id: { eq: $id }) {
      ...JobPage
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
  data: { strapiJobposition },
}: PageProps<Queries.StrapiJobpositionQuery>) {
  return (
    <Layout>
      <SEO
        meta={strapiJobposition?.seo}
        title={strapiJobposition.title}
        featuredImage={strapiJobposition.featuredImage}
      />
      ;
      <JobPage data={strapiJobposition as Queries.JobPageFragment} />
    </Layout>
  );
}
