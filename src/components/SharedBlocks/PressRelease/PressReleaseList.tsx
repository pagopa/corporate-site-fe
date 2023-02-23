import { graphql, useStaticQuery } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { useLocalizedQuery } from '../../../hooks';
import { Cta } from '../../../partials/Cta';

const PressReleaseItem = ({
  pressRelease,
}: {
  pressRelease: Queries.PressReleaseFragment;
}) => {
  const {
    i18n: { language },
  } = useTranslation();

  const { body, slug, title, updatedAt, id } = pressRelease || {};

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const theDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString(language, dateOptions)
    : '';

  const text = body?.data?.body?.replace(/(<([^>]+)>)/gi, '');
  const abstract = text?.split(' ').splice(0, 36).join(' ');

  return (
    <article className="press-release" key={id}>
      <div>
        <h4>{theDate}</h4>
        <h3 className="--light">{title}</h3>
        <div className="wysiwyg">
          <p>{abstract}...</p>
        </div>
      </div>

      {slug && <Cta href={slug} label="Leggi" />}
    </article>
  );
};

export const PressReleaseList = () => {
  const queryResult = useStaticQuery(graphql`
    fragment PressRelease on STRAPI_PRESS_RELEASE {
      locale
      id
      slug
      updatedAt
      bannerNewsletter
      eyelet
      title
      url_path
      body {
        data {
          body
        }
      }
    }
    query AllPressReleases {
      allStrapiPressRelease {
        nodes {
          ...PressRelease
        }
      }
    }
  `);

  const { localeNodes: pressReleases } = useLocalizedQuery<
    Queries.PressReleaseFragment,
    Queries.AllPressReleasesQuery
  >({
    type: 'allStrapiPressRelease',
    query: queryResult,
  });

  return (
    <section className="press-release-list">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {pressReleases?.map(pressRelease => (
              <PressReleaseItem pressRelease={pressRelease} />
            ))}
            {/* <Pagination */}
            {/*   context={pageContext} */}
            {/*   baseUri={uri.replace(/\/$/, '')} */}
            {/* /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
