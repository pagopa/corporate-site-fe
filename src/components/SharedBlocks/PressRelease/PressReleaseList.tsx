import { graphql, useStaticQuery } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { useLocalizedQuery } from '../../../hooks';
import { Cta } from '../../../partials/Cta';
import { Pagination } from '../../Pagination';

const PressReleaseItem = ({
  pressRelease,
}: {
  pressRelease: Queries.PressReleaseFragment;
}) => {
  const {
    i18n: { language },
  } = useTranslation();

  const { body, slug, title, publishedAt, id } = pressRelease || {};

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const theDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString(language, dateOptions)
    : '';

  const text = body?.data?.body?.replace(/(<([^>]+)>)/gi, '');
  const abstract = text?.split(' ').splice(0, 36).join(' ');

  return (
    <article className="press-release py-5" key={id}>
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
      publishedAt
      bannerNewsletter
      eyelet
      title
      body {
        data {
          body
        }
      }
    }
    query AllPressReleases {
      allStrapiPressRelease(sort: { publishedAt: DESC }) {
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
            <Pagination
              itemsPerPage={12}
              data={pressReleases}
              renderItem={(item: Queries.PressReleaseFragment) => (
                <PressReleaseItem pressRelease={item} />
              )}
              keyExtractor={item => item.id}
            />
          </div>
        </div>
      </div>
    </section>
  );
};