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
import { SEO } from '../../../components/SEO';
import { Layout } from '../../../partials/Layout';

export const query = graphql`
  fragment PostIntro on STRAPI_POST {
    title
    eyelet
  }
  query StrapiPost($id: String, $language: String) {
    allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          language
          data
          ns
        }
      }
    }
    strapiPost(id: { eq: $id }) {
      ...PostIntro
      slug
      bannerNewsletter
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
  const {
    body,
    eyelet,
    publishedAt,
    featuredImage,
    title,
    bannerNewsletter,
    slug,
  } = strapiPost || {};

  const {
    i18n: { language },
  } = useTranslation();

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const theDate = new Date(publishedAt).toLocaleDateString(language, dateOptions);

  return title && slug ? (
    <Layout>
      <SEO
        meta={strapiPost?.seo}
        title={strapiPost.title}
        featuredImage={strapiPost.featuredImage}
      />
      ;
      <article className="post-article">
        <Intro eyelet={eyelet} title={title} />

        <div className="post-article__body">
          <div className="container-fluid">
            {featuredImage?.localFile?.childImageSharp?.gatsbyImageData && (
              <figure className="post-article__visual">
                <div className="row">
                  <div className="col-12 col-lg-10 offset-lg-1 d-flex align-items-center justify-content-center">
                    <GatsbyImage
                      image={
                        getImage(
                          featuredImage.localFile as ImageDataLike
                        ) as IGatsbyImageData
                      }
                      alt={featuredImage?.alternativeText}
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
  ) : null;
}
