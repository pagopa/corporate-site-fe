import { graphql, PageProps } from 'gatsby';
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next/dist';
import React from 'react';
import { NewsletterBanner } from '../../../components/NewsletterBanner';
import { Body } from '../../../components/Remark/Body';
import { Layout } from '../../../partials/Layout';

export const query = graphql`
  fragment PostIntro on STRAPI_POST {
    title
    eyelet
  }
  query StrapiPost($id: String) {
    strapiPost(id: { eq: $id }) {
      ...PostIntro
      bannerNewsletter
      updatedAt
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

const Intro = ({ eyelet, title }: Queries.PostIntroFragment) => {
  return (
    <header className="block --block-intro intro">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="intro__heading">
              <h4>{eyelet}</h4>
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function Component({
  data: { strapiPost },
}: PageProps<Queries.StrapiPostQuery>) {
  const { body, eyelet, updatedAt, featuredImage, title, bannerNewsletter } =
    strapiPost || {};

  const {
    i18n: { language },
  } = useTranslation();

  if (body && eyelet && updatedAt && featuredImage && title) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const theDate = new Date(updatedAt).toLocaleDateString(
      language,
      dateOptions
    );

    return (
      <Layout>
        <article className="post-article">
          <Intro eyelet={eyelet} title={title} />

          <div className="post-article__body">
            <div className="container-fluid">
              {featuredImage?.localFile?.childImageSharp?.gatsbyImageData &&
                featuredImage?.alternativeText && (
                  <figure className="post-article__visual">
                    <div className="row">
                      <div className="col-12 col-lg-10 offset-lg-1 d-flex align-items-center justify-content-center">
                        <GatsbyImage
                          image={
                            getImage(
                              featuredImage.localFile as ImageDataLike
                            ) as IGatsbyImageData
                          }
                          alt={featuredImage.alternativeText}
                        />
                      </div>
                    </div>
                  </figure>
                )}

              <div className="row">
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                  <h4>{theDate}</h4>
                  <Body data={body} />
                </div>
              </div>
            </div>
          </div>
        </article>

        {bannerNewsletter && <NewsletterBanner />}
      </Layout>
    );
  }
}
