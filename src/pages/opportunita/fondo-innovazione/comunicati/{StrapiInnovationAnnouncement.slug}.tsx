import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { BlocksRenderer } from '../../../../components/SharedBlocks/BlocksRenderer';
import { Layout } from '../../../../partials/Layout';
import { useTranslation } from 'gatsby-plugin-react-i18next/dist';
import { Body } from '../../../../components/Remark/Body';
import { NewsletterBanner } from '../../../../components/NewsletterBanner';

export const query = graphql`
  fragment InnovIntro on STRAPI_INNOVATION_ANNOUNCEMENT {
    title
    eyelet
  }
  query StrapiInnovationAnnouncement($id: String, $language: String) {
    allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          language
          data
          ns
        }
      }
    }
    strapiInnovationAnnouncement(id: { eq: $id }) {
      ...InnovIntro
      slug
      bannerNewsletter
      updatedAt
      publishedAt
      body {
        data {
          id
          childMarkdownRemark {
            html
          }
        }
      }
      featuredImage {
        url
        alternativeText
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;

const InnovIntro = ({ eyelet, title }: Queries.InnovIntroFragment) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <header className="block --block-intro intro --event">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="intro__heading">
              {eyelet && <h4>{eyelet}</h4>}
              {title && <h1>{title}</h1>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function Component({
  data: { strapiInnovationAnnouncement },
}: PageProps<Queries.StrapiInnovationAnnouncementQuery>) {
  const {
    i18n: { language },
  } = useTranslation();

  const { body, eyelet, title, slug } = strapiInnovationAnnouncement || {};

  return title && slug ? (
    <Layout>
      <article className="post-article">
        <InnovIntro
          {...{
            body,
            eyelet,
            title,
          }}
        />
        <div className="post-article__body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <Body data={body} />
              </div>
            </div>
          </div>
        </div>
      </article>
      {true && <NewsletterBanner />}
    </Layout>
  ) : null;
}
