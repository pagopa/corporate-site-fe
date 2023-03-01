import { graphql, PageProps } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next/dist';
import React from 'react';
import { Body } from '../../../components/Remark/Body';
import { SEO } from '../../../components/SEO';
import { Layout } from '../../../partials/Layout';

export const query = graphql`
  fragment PressReleaseIntro on STRAPI_PRESS_RELEASE {
    eyelet
    title
  }
  query StrapiPressRelease($id: String) {
    strapiPressRelease(id: { eq: $id }) {
      id
      slug
      bannerNewsletter
      url_path
      publishedAt
      ...PressReleaseIntro
      body {
        data {
          id
          childMarkdownRemark {
            html
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

const Intro = ({ eyelet, title }: Queries.PressReleaseIntroFragment) => {
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
  data: { strapiPressRelease },
}: PageProps<Queries.StrapiPressReleaseQuery>) {
  const { publishedAt, eyelet, title, body } = strapiPressRelease || {};

  const {
    i18n: { language },
  } = useTranslation();

  if (publishedAt && eyelet && title && body) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const theDate = new Date(publishedAt).toLocaleDateString(
      language,
      dateOptions
    );

    return (
      <Layout>
        <SEO meta={strapiPressRelease?.seo} />;
        <article className="post-article">
          <Intro eyelet={eyelet} title={title} />

          <div className="post-article__body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                  <h4>{theDate}</h4>
                  {body && <Body data={body} />}
                </div>
              </div>
            </div>
          </div>
        </article>
        {/* {bannerNewsletter && <NewsletterBanner />} */}
      </Layout>
    );
  }

  return null;
}
