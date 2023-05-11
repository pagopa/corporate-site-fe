import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../../../partials/Layout';
import { useTranslation } from 'gatsby-plugin-react-i18next/dist';
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from 'gatsby-plugin-image';
import { NewsletterBanner } from '../../../components/NewsletterBanner';
import { Body } from '../../../components/Remark/Body';
import { SEO } from '../../../components/SEO';

export const query = graphql`
  fragment EventIntro on STRAPI_EVENT {
    title
    eyelet
    endDate
    endTime
    startDate
    startTime
    eventVenue
  }
  query StrapiEvent($id: String, $language: String) {
    allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          language
          data
          ns
        }
      }
    }
    strapiEvent(id: { eq: $id }) {
      ...EventIntro
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

const EventIntro = ({
  eyelet,
  title,
  endTime,
  startDate,
  startTime,
  eventVenue,
}: Queries.EventIntroFragment) => {
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
        <div className="row">
          <div className="col-12 d-inline-flex justify-content-center text-left">
            <div className="intro__data flex-wrap flex-md-nowrap">
              {startDate && (
                <div>
                  <p className="--label">DATA</p>
                  <p>
                    {new Date(startDate).toLocaleDateString(language, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </p>
                </div>
              )}
              {startTime && (
                <div>
                  <p className="--label">ORA</p>
                  <p>
                    dalle {startTime}
                    {`${endTime ? ` alle ${endTime}` : ''}`}
                  </p>
                </div>
              )}
              {eventVenue && (
                <div>
                  <p className="--label">LUOGO</p>
                  <p>{eventVenue}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function Component({
  data: { strapiEvent },
}: PageProps<Queries.StrapiEventQuery>) {
  const {
    i18n: { language },
  } = useTranslation();

  const {
    body,
    endDate,
    endTime,
    eyelet,
    featuredImage,
    startDate,
    startTime,
    title,
    eventVenue,
  } = strapiEvent || {};

  if (
    body &&
    endDate &&
    endTime &&
    eyelet &&
    featuredImage &&
    startDate &&
    startTime &&
    title &&
    eventVenue
  ) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const theDate = new Date(startDate).toLocaleDateString(
      language,
      dateOptions
    );

    return (
      <Layout>
        <SEO
          meta={strapiEvent?.seo}
          title={strapiEvent.title}
          featuredImage={strapiEvent.featuredImage}
        />
        ;
        <article className="post-article">
          <EventIntro
            {...{
              body,
              endDate,
              endTime,
              eyelet,
              startDate,
              startTime,
              title,
              eventVenue,
            }}
          />
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
        {true && <NewsletterBanner />}
      </Layout>
    );
  }
  return null;
}
