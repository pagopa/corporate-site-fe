import { graphql, useStaticQuery } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { useLocalizedQuery } from '../../../hooks';
import { Cta } from '../../../partials/Cta';
import { Pagination } from '../../Pagination';

const InnovItem = ({
  innovAnnoun,
  isPreview,
}: {
  innovAnnoun: Queries.InnovationAnnouncementFragment;
  isPreview?: boolean;
}) => {
  const {
    i18n: { language },
  } = useTranslation();

  const { body, slug, title, publishedAt, id } = innovAnnoun || {};

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

export const InnovationAnnounList = ({
  title,
  pageSlug,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_INNOVATION_ANNOUNCEMENTS_Fragment & {
  pageSlug: string;
}) => {
  const queryResult = useStaticQuery(graphql`
    fragment InnovationAnnouncement on STRAPI_INNOVATION_ANNOUNCEMENT {
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
    query AllInnovationAnnouncements {
      allStrapiInnovationAnnouncement(sort: { publishedAt: DESC }) {
        nodes {
          ...InnovationAnnouncement
        }
      }
    }
  `);

  const { localeNodes: innovationAnnouncements } = useLocalizedQuery<
    Queries.InnovationAnnouncementFragment,
    Queries.AllInnovationAnnouncementsQuery
  >({
    type: 'allStrapiInnovationAnnouncement',
    query: queryResult,
  });

  return (
    <section className={`d-flex row justify-content-center`}>
      <div className="col-8">
        {title && <h1>{title}</h1>}
        <Pagination
          className={`container-fluid row m-0 p-0 justify-content-center`}
          data={innovationAnnouncements}
          itemsPerPage={12}
          keyExtractor={item => item.id}
          navHidden={false}
          renderItem={(item: Queries.InnovationAnnouncementFragment) => (
            <div className={`col-lg-9 d-flex my-5`}>
              <InnovItem innovAnnoun={item} isPreview={false} />
            </div>
          )}
        />
      </div>
    </section>
  );
};
