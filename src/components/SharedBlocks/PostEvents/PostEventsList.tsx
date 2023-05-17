import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocalizedQuery } from '../../../hooks';
import { Article } from '../../Article';
import { Pagination } from '../../Pagination';
import { Cta } from '../../../partials/Cta';

export const PostEventsList = ({
  pageSlug,
  title,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_NEWS_AND_EVENTS_Fragment & {
  pageSlug: string;
}) => {
  const eventQuery = useStaticQuery(graphql`
    fragment Post on STRAPI_POST {
      __typename
      id
      slug
      eyelet
      locale
      title
      updatedAt
      publishedAt
      body {
        data {
          body
        }
      }
      featuredImage {
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 460
              height: 346
              transformOptions: { cropFocus: ATTENTION }
            )
          }
        }
      }
    }
    fragment Event on STRAPI_EVENT {
      __typename
      id
      slug
      eyelet
      locale
      title
      publishedAt
      startDate
      startTime
      endTime
      body {
        data {
          body
        }
      }
      featuredImage {
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 460
              height: 346
              transformOptions: { cropFocus: ATTENTION }
            )
          }
        }
      }
    }
    query AllStrapiPostsEvents {
      allStrapiPost(sort: { publishedAt: DESC }) {
        nodes {
          ...Post
        }
      }
      allStrapiEvent(sort: { publishedAt: DESC }) {
        nodes {
          ...Event
        }
      }
    }
  `);

  const { localeNodes: events } = useLocalizedQuery<
    Queries.EventFragment | Queries.PostFragment,
    Queries.AllStrapiPostsEventsQuery
  >({
    type: 'allStrapiEvent',
    query: eventQuery,
  });

  const { localeNodes: posts } = useLocalizedQuery<
    Queries.EventFragment | Queries.PostFragment,
    Queries.AllStrapiPostsEventsQuery
  >({
    type: 'allStrapiPost',
    query: eventQuery,
  });

  const postEventsCollection = [...posts, ...events];
  const postEventsCollectionSorted = postEventsCollection.sort((a, b) =>
    a.publishedAt > b.publishedAt ? -1 : a.publishedAt < b.publishedAt ? 1 : 0
  );

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
          className={`container-fluid row justify-content-evenly m-0 p-0`}
          data={postEventsCollectionSorted}
          itemsPerPage={isPreview ? 2 : 12}
          keyExtractor={item => item.id}
          navHidden={isPreview}
          renderItem={item => (
            <div className="col-lg-6 d-flex my-1">
              <Article article={item} />
            </div>
          )}
        />
        {isPreview && (
          <Cta
            label={'SCOPRI TUTTE LE NEWS E GLI EVENTI'}
            href={'news-ed-eventi'}
            variant="link"
          />
        )}
      </div>
    </section>
  );
};
