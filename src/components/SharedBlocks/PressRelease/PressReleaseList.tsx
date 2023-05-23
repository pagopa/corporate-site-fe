import { graphql, useStaticQuery } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { useLocalizedQuery } from '../../../hooks';
import { Cta } from '../../../partials/Cta';
import { Pagination } from '../../Pagination';

const PressReleaseItem = ({
  pressRelease,
  isPreview,
}: {
  pressRelease: Queries.PressReleaseFragment;
  isPreview?: boolean;
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
    <article className="d-flex flex-column justify-content-between" key={id}>
      <div>
        <h4>{theDate}</h4>
        {isPreview ? (
          <h4 className="--primary --medium">{title}</h4>
        ) : (
          <h3 className="--light">{title}</h3>
        )}
        <div>
          <p>{abstract}...</p>
        </div>
      </div>

      {slug && (
        <div className="d-flex justify-content-start">
          <Cta href={slug} label="Leggi" />
        </div>
      )}
    </article>
  );
};

export const PressReleaseList = ({
  title,
  pageSlug,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_PRESS_RELEASE_Fragment & {
  pageSlug: string;
}) => {
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

  const isPreview = pageSlug === 'media';

  return (
    <section
      className={`${
        isPreview ? 'block' : ''
      } d-flex row justify-content-center`}
    >
      <div className="col-8">
        {title && <h1>{title}</h1>}
        <Pagination
          className={`container-fluid row m-0 p-0 justify-content-center ${
            isPreview ? 'flex-row' : ''
          }`}
          data={pressReleases}
          itemsPerPage={isPreview ? 2 : 12}
          keyExtractor={item => item.id}
          navHidden={isPreview}
          renderItem={(item: Queries.PressReleaseFragment) => (
            <div
              className={`${isPreview ? 'col-lg-6' : 'col-lg-9'} d-flex my-5`}
            >
              <PressReleaseItem pressRelease={item} isPreview={isPreview} />
            </div>
          )}
        />
        {isPreview && (
          <Cta
            label={'LEGGI TUTTI I COMUNICATI STAMPA'}
            href={'comunicati-stampa'}
            variant="link"
          />
        )}
      </div>
    </section>
  );
};
